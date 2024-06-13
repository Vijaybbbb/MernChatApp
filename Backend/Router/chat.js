const express = require('express')
const { verifyTocken } = require('../Utils/verifyTocken')
const { accessChat, fetchChat, createGroup, renameGroup, addToGroup, removeFromGroup } = require('../Controller/chat')
const router = express.Router()


router.post('/:userId', verifyTocken, accessChat)

router.get('/', verifyTocken, fetchChat)
 
router.post('/create/group',verifyTocken, createGroup)

router.put('/rename', verifyTocken, renameGroup)

router.put('/addToGroup', verifyTocken, addToGroup)

router.put('/removeGroup', verifyTocken, removeFromGroup)



module.exports = router