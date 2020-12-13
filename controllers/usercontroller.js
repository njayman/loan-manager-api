const User = require('../models/Users')
const bcrypt = require('bcrypt')
var jwt = require('jsonwebtoken');
const LoanType = require('../models/LoanType');

exports.checkemail = async (req, res) => {
    try {
        const user = await User.exists({ email: req.body.email })
        res.send({ success: true, found: user })
    } catch (error) {
        res.send({ success: false, message: error.message })
    }
}

exports.register = async (req, res) => {
    try {
        const usr = req.body;
        //console.log(usr)
        let saltround = 10
        let salt = await bcrypt.genSalt(saltround)
        //const randompassword = Math.random().toString().slice(-8)
        //console.log(randompassword)
        const hashedPassword = await bcrypt.hash(usr.password, salt)
        usr.password = hashedPassword;
        const user = new User(usr)
        //console.log(user)
        await user.save()
        res.send({ success: true, message: `Successfully registered as ${usr.fullname}` })
    } catch (error) {
        res.send({ success: false, message: error.message })
    }
}

exports.login = async (req, res) => {
    try {
        const userFound = await User.exists({ email: req.body.email })
        if (userFound) {
            const user = await User.findOne({ email: req.body.email })
            const passwordMatched = await bcrypt.compare(req.body.password, user.password)
            if (passwordMatched) {
                const userToken = jwt.sign({
                    id: user._id,
                    fullname: user.fullname,
                    email: user.email,
                    phone: user.phone,
                    position: user.position,
                    designation: user.designation || null,
                    role: "user"
                },
                    process.env.JWTSECRET,
                    {
                        expiresIn: 2678400
                    }
                )
                res.send({ success: true, message: `Successfully logged in as ${user.fullname}`, token: userToken })
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

exports.getUser = async (req, res) => {
    try {
        const user = await User.findOne({ _id: req.params.id })
        res.send({ success: true, user: user })
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

exports.getLoanInfo = async (req, res) => {
    try {
        const { loans } = await User.findOne({ _id: req.params.id })
        res.send({ success: true, loaninfo: loans })
    } catch (error) {
        res.send({ success: false, message: error.message })
    }
}


exports.requestLoan = async (req, res) => {
    try {
        await User.findOneAndUpdate({ _id: req.params.id })
    } catch (error) {
        res.send({ success: false, message: error.message })
    }
}