const express = require('express')
const { register } = require('../Controller/user')
const router = express.Router()
const multer  = require('multer')


const storage = multer.diskStorage({
       destination:function(req,file,cb){
              cb(null,'./images')
       }, 
       filename:function (req,file,cb){
              const uniqueSuffix = Date.now()
              cb(null,uniqueSuffix+file.originalname)
       }
})
const upload = multer({storage:storage})


router.post('/register',upload.single('images'),register)



module.exports = router