const express = require('express');
const {
    addLoanType,
    getLoanType,
    deleteLoanType,
    addUser,
    getUser,
    getUsers,
    deleteUser,
    addLoan,
    getLoan,
    getLoans,
    deleteLoan,
    addAdmin,
    getAdmins,
    loginAdmin,
    userdata,
    loandata,
    auditloan,
    loanstatus,
    getaudits,
    changePassword
} = require('../controllers/admincontroller.js')
const router = express.Router()

router.post("/add/loantype", addLoanType);
router.get('/get/loantype', getLoanType)
router.delete('/delete/loantype/:id', deleteLoanType)

router.post("/add/user", addUser);
router.get('/get/users', getUsers)
router.get('/get/user/:id', getUser)
router.delete('/delete/user/:id', deleteUser)

router.put("/add/loan/:id", addLoan);
router.get('/get/loans', getLoans)
router.get('/get/loan/:id', getLoan)
router.delete('/delete/loan/:id', deleteLoan)

router.post('/addadmin', addAdmin)
router.get('/getadmins', getAdmins)
router.post('/loginadmin', loginAdmin)
router.post('/changepassword/:id', changePassword)

router.get('/get/audits/:id/:lid', getaudits)
router.get('/get/loadstate', loanstatus)
router.get('/get/userdata', userdata)
router.get('/get/loandata', loandata)
router.put('/audit/loan/:id/:lid', auditloan)
module.exports = router;