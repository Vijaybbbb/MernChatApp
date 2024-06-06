const express = require('express')
const { register } = require('../Controller/user')
const router = express.Router()


router.post('/register',register)



module.exports = router