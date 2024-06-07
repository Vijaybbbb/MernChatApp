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
                     path: '/'
              }
              ).status(200).json({ ...otherDetails });
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
                            ).status(200).json({...otherDetails});
              }
              else{
                     return next(createError(401,'Invalid Credentials'))
               }
              
       } catch (error) {
              console.log(error);
              return next(createError(401,'Failed'))


}
}








module.exports = {
       register,
       login
}