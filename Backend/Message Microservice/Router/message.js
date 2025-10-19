const express = require('express')
const { verifyTocken } = require('../../Common Microservice')
const { sendMessage, allMessages } = require('../Controller/message')
const router = express.Router()


router.post('/', verifyTocken,sendMessage)

router.get('/:chatId', verifyTocken,allMessages)



 
module.exports = router