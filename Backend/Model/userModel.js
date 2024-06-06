
const  mongoose  = require('mongoose')

const userSchema  =  mongoose.Schema({

name:{
       type:String,
       required:true
},
email:{
       type:String,
       unique:true,
       required:true
},
password:{
       type:String,
       required:true
},
pic:{
       type:String,
}

},{timestamps:true})

const User  = mongoose.model('user',userSchema)

module.exports = User;