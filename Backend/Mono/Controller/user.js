const User = require('../Model/userModel');
const { createError } = require('../Utils/error');
const bcrypt = require('bcrypt')
const jwt  = require('jsonwebtoken');

const register = async (req, res, next) => {
       try {
              const existingUser = await User.findOne({ email: req.body.userData.email });
              if (existingUser) {
                     return next(createError(401, 'User already Exist'))
              }

              const { name, email, password } = req.body.userData
              const hashedPassword = await bcrypt.hash(password, 10)
              const newUser = {
                     name,
                     email,
                     password: hashedPassword,
                     pic: req.body.images
              };

              const user = await User.create(newUser)
              const tocken = jwt.sign({ id: user._id, isAdmin: user.isAdmin }, process.env.JWT_SECRET_KEY)
              const { password: userPassword, isAdmin, ...otherDetails } = user._doc
              res.cookie('access_tocken', tocken, {
                     httpOnly: true,
                     path: '/',
                     secure: process.env.NODE_ENV === 'production', // Ensure this is set for production

              }
              ).cookie('user_id', user._id, {
                     httpOnly: true,
                     secure: process.env.NODE_ENV === 'production',
                     path: '/', // Restrict access to the root path (adjust as needed)
                    // expires: new Date(Date.now() + 60 * 60 * 1000), // Set a shorter expiration for token (e.g., 1 hour)
                   }).status(200).json({ ...otherDetails });
       } catch (error) {
              console.log(error);
              return next(createError(401,'Failed'))   

}
}



const login = async (req, res, next) => {
       try {
              const {email,password} = req.body               
              const existingUser = await User.findOne({ email });                                                      
              if (!existingUser) {
                     return next(createError(401, 'User not Found'))
              }
              const checkPassword = await bcrypt.compare(password,existingUser.password)
              if(checkPassword){
                     const tocken  = jwt.sign({id:existingUser._id,isAdmin:existingUser.isAdmin},process.env.JWT_SECRET_KEY)
                     const {password,isAdmin,...otherDetails} = existingUser._doc
                     res.cookie('access_tocken',tocken,{
                            httpOnly:true,
                            path:'/'
                            }
                            ).cookie('user_id', existingUser._id, {
                                   httpOnly: true,
                                  // secure: process.env.NODE_ENV === 'production',
                                   path: '/', // Restrict access to the root path (adjust as needed)
                                  // expires: new Date(Date.now() + 60 * 60 * 1000), // Set a shorter expiration for token (e.g., 1 hour)
                                 }).status(200).json({...otherDetails});
              }
              else{
                     return next(createError(401,'Invalid Credentials'))
               }
              
       } catch (error) {
              console.log(error);
              return next(createError(401,'Failed'))


}
}


const allUsers = async (req, res, next) => {
       try {
              const keyword = req.query.search ? {
                     $or:[
                            {name:{$regex:req.query.search,$options:'i'}},
                            {email:{$regex:req.query.search,$options:'i'}}

                     ]
              }:{}

              const users = await User.find(keyword).find({_id:{$ne:req.user}})
              return res.status(200).json(users)

       } catch (error) {
              return next(createError(401,'Some thing went Wrong'))

       }
}





module.exports = {
       register,
       login,
       allUsers
}