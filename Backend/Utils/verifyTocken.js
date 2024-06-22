const jwt  = require('jsonwebtoken');
const mongoose  = require('mongoose');
const { createError } = require('./error.js');
const User = require('../Model/userModel.js');

const verifyTocken = async(req,res,next) =>{
       
       req.user = req.cookies.user_id
       //take value from cookie
       try {

              const tocken = await req.cookies.access_tocken;
              const userId = JSON.parse(req.cookies.user_id).j
              const user = await User.findById(new mongoose.Types.ObjectId(userId))

              if(!tocken || !userId){
                    return next(createError(401,'Invalid Creadentials'))
              }
              if(user.isBlocked == true){
                     return next(createError(401,'User Blocked'))
               }

              jwt.verify(tocken,process.env.JWT_SECRET_KEY,(err,user)=>{
             
                     if(err){
                            console.log(err);
                            return next(createError(401,'Invalid Tocken'))                      
                     }
                     if(userId == user.id){   
                           next()
                     }else{
                            return next(createError(401,'Authentication failed'))                   
                     }
       
                    
              }) 
       } catch (error) {
              console.log(error);
       }

}



module.exports = { 
       verifyTocken                       
}