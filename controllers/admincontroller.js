const Admins = require("../models/Admins");
const Loans = require("../models/Loans");
const LoanType = require("../models/LoanType");
const Users = require("../models/Users");
const bcrypt = require('bcrypt')
var jwt = require('jsonwebtoken')

exports.addLoanType = async (req, res) => {
    try {
        const loantype = new LoanType(req.body)
        await loantype.save();
        res.send({ success: true, message: `Created ${loantype.loanname}` })
    } catch (error) {
        res.send({ success: false, message: error.message })
    }
}

exports.getLoanType = async (req, res) => {
    try {
        const loantypes = await LoanType.find()
        res.send({ success: true, loantypes: loantypes })
    } catch (error) {
        res.send({ success: false, message: error.message })
    }
}

exports.deleteLoanType = async (req, res) => {
    try {
        await LoanType.deleteOne({ _id: req.params.id })
        res.send({ success: true, message: 'Deleted' })
    } catch (error) {
        res.send({ success: false, message: error.message })
    }
}

exports.addUser = async (req, res) => {
    try {
        const newUser = req.body
        let saltround = 10
        let salt = await bcrypt.genSalt(saltround)
        const randompassword = Math.random().toString(36).substring(7) + Math.random().toString(36).substring(7)
        console.log(randompassword)
        const hashedPassword = await bcrypt.hash(randompassword, salt)
        newUser.password = hashedPassword
        const user = new Users(newUser)
        await user.save()
        res.send({ success: true, message: `Created ${user.fullname}` })
    } catch (error) {
        res.send({ success: false, message: error.message })
    }
}

exports.getUsers = async (req, res) => {
    try {
        const users = await Users.find()
        res.send({ success: true, users: users })
    } catch (error) {
        res.send({ success: false, message: error.message })
    }
}

exports.getUser = async (req, res) => {
    try {
        const user = await Users.findOne({ _id: req.params.id })
        res.send({ success: true, user: user })
    } catch (error) {
        res.send({ success: false, message: error.message })
    }
}


exports.deleteUser = async (req, res) => {
    try {
        await Users.deleteOne({ _id: req.params.id })
        res.send({ success: true, message: 'Deleted' })
    } catch (error) {
        res.send({ success: false, message: error.message })
    }
}

exports.addLoan = async (req, res) => {
    try {
        await Users.updateOne({ _id: req.params.id }, { $push: { loans: req.body } })
        res.send({ success: true, message: `Successfully added ${req.body.loanname}` })
    } catch (error) {
        res.send({ success: false, message: error.message })
    }
}

exports.getLoans = async (req, res) => {
    try {
        const loans = await Loans.find()
        res.send({ success: true, loans: loans })
    } catch (error) {
        res.send({ success: false, message: error.message })
    }
}

exports.getLoan = async (req, res) => {
    try {
        const loan = await Loans.findOne({ _id: req.params.id })
        res.send({ success: true, loan: loan })
    } catch (error) {
        res.send({ success: false, message: error.message })
    }
}

exports.deleteLoan = async (req, res) => {
    try {
        await Loans.deleteOne({ _id: req.params.id })
        res.send({ success: true, message: 'Deleted' })
    } catch (error) {
        res.send({ success: false, message: error.message })
    }
}

exports.userdata = async (req, res) => {
    try {
        const allusers = await Users.find();
        let users = []
        const countloan = await Promise.all(

            allusers.map(async (user, id) => {
                await Loans.find({ loanuser: user._id }, (err, userloans) => {
                    let userObj = { id: id + 1, fullname: user.fullname, phone: user.phone, email: user.email, position: user.position, designation: user.designation, loanno: userloans.length }
                    users.push(userObj)
                })
            })
        )

        res.send({ success: true, users: users })
    } catch (error) {
        res.send({ success: false, message: error.message })
    }
}

exports.loandata = async (req, res) => {
    try {
        const allloans = await Loans.find();
        let loans = []
        const allloandata = await Promise.all(

            allloans.map(async (loan, id) => {
                await Users.findOne({ _id: loan.loanuser }, (err, loanuser) => {
                    let loanObj = {
                        id: id + 1, loanid: loan._id, title: loan.title, type: loan.type, loanuser: loanuser.fullname, guarantor: (loan.type === "House Loan" ? async () => {
                            await Users.findOne({ _id: loan.guarantor }, (err, data) => {
                                console.log(data.fullname)
                                return data.fullname

                            })

                        } : "n/a"), amount: loan.amount, paidback: loan.paidback, issued: loan.issued, deadline: loan.deadline
                    }
                    loans.push(loanObj)
                    /*if (loan.type === "House Loan") {
                                await Users.findOne({ _id: loan.guarantor }, (err, grtr) => {
                        })
                    } else {
                        let loanObj = { id: id + 1, title: loan.title, type: loan.type, loanuser: loanuser.fullname, guarantor: "n/a", issued: loan.issued, deadline: loan.deadline }
                        loans.push(loanObj)
                    }*/
                })
            })
        )
        //console.log(loans)
        res.send({ success: true, loans: loans })
    } catch (error) {
        res.send({ success: false, message: error.message })
    }
}

exports.auditloan = async (req, res) => {
    try {
        const prevloan = await Users.findOne({ _id: req.params.id })
        await Users.updateOne({ _id: req.params.id, 'loans._id': req.params.lid }, {
            "$push": {
                'loans.$.audits': req.body
            }
        })
        res.send({ success: true, message: `Successfully audited ${req.body.amount}` })
    } catch (error) {
        res.send({ success: false, message: error.message })
    }
}

exports.getaudits = async (req, res) => {
    try {
        const { loans } = await Users.findOne({ _id: req.params.id, 'loans._id': req.params.lid })
        //const audits = user.loans.find({ _id: req.params.id, 'loans._id': req.params.lid })
        const targetloans = await loans.filter(ln => {
            return req.params.lid === ln._id
        })
        console.log(loans)
        console.log(targetloans)
        res.send({ success: true })
    } catch (error) {
        res.send({ success: false, message: error.message })
    }
}

exports.loanstatus = async (req, res) => {
    try {
        const loans = await Loans.find()
        const users = await Users.find()
        res.send({ success: true, status: { loan: loans.length, user: users.length } })
    } catch (error) {
        res.send({ success: false, message: error.message })
    }
}

exports.addAdmin = async (req, res) => {
    try {
        const newadmin = req.body;
        //console.log(usr)
        let saltround = 10
        let salt = await bcrypt.genSalt(saltround)
        //const randompassword = Math.random().toString().slice(-8)
        //console.log(randompassword)
        const hashedPassword = await bcrypt.hash(newadmin.password, salt)
        newadmin.password = hashedPassword
        const admin = new Admins(newadmin)
        await admin.save()
        res.send({ success: true, message: `Successfully added admin ${req.body.name}` })
    } catch (error) {
        res.send({ success: false, message: error.message })
    }
}

exports.getAdmins = async (req, res) => {
    try {
        const admins = await Admins.find()
        res.send({ success: true, admins: admins })
    } catch (error) {
        res.send({ success: false, message: error.message })
    }
}

exports.loginAdmin = async (req, res) => {
    try {
        const adminFound = await Admins.exists({ email: req.body.email })
        if (adminFound) {
            const admin = await Admins.findOne({ email: req.body.email })
            const passwordMatched = await bcrypt.compare(req.body.password, admin.password)
            if (passwordMatched) {
                const adminToken = jwt.sign({
                    id: admin._id,
                    fullname: admin.name,
                    email: admin.email,
                    role: "admin"
                },
                    process.env.JWTSECRET,
                    {
                        expiresIn: 2678400
                    }
                )
                res.send({ success: true, message: `Successfully logged in as ${admin.fullname}`, token: adminToken })
            } else {
                res.send({ success: false, message: "Password doesn't match!" })
            }
        } else {
            res.send({ success: false, message: `No user found with email ${req.body.email}` })
        }
    } catch (error) {
        res.send({ success: false, message: error.message })
    }
}

exports.changePassword = async (req, res) => {
    try {
        const newPassword = req.body.newPassword;
        //console.log(usr)
        let saltround = 10
        let salt = await bcrypt.genSalt(saltround)
        //const randompassword = Math.random().toString().slice(-8)
        //console.log(randompassword)
        const hashedPassword = await bcrypt.hash(newPassword, salt)
        await Admins.updateOne({ _id: req.params.id }, { $set: { password: hashedPassword } })
        res.send({ success: true, message: `Successfully updated password for admin` })
    } catch (error) {
        res.send({ success: false, message: error.message })
    }
}