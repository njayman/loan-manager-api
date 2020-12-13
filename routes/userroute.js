const express = require('express');
const router = express.Router();

const { checkemail, register, login, getUser, getLoanType, getLoanInfo } = require('../controllers/usercontroller')

router.post('/checkemail', checkemail)

router.post('/register', register)

router.post('/login', login)

router.get('/getuser/:id', getUser)

router.get('/get/loantype', getLoanType)

router.get('/get/loaninfo/:id/:loanid', getLoanInfo)


module.exports = router;