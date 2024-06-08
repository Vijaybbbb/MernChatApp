const express = require('express')
const { verifyTocken } = require('../Utils/verifyTocken')
const { accessChat, fetchChat, createGroup } = require('../Controller/chat')
const router = express.Router()


router.post('/',verifyTocken,accessChat)

 router.get('/',verifyTocken,fetchChat)

 router.post('/group',verifyTocken,createGroup)

// router.put('/rename',verifyTocken,renameGroup)

// router.put('/removeGroup',verifyTocken,removeGroup)

// router.put('/addToGroup',verifyTocken,addToGroup)


module.exports = router