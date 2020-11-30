const express = require('express');
const router = express.Router();

const { checkemail, register, login, getUser } = require('../controllers/usercontroller')

router.post('/checkemail', checkemail)

router.post('/register', register)

router.post('/login', login)

router.get('/getuser/:id', getUser)

module.exports = router;