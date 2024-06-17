const express = require('express')
const { verifyTocken } = require('../Utils/verifyTocken')
const { sendMessage, allMessages } = require('../Controller/message')
const router = express.Router()


router.post('/', verifyTocken,sendMessage)

router.get('/:chatId', verifyTocken,allMessages)



 
module.exports = router