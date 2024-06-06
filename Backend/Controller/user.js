





const register = async(req,res,next) =>{
       console.log(req.body);
     res.status(200).json('success')

}

module.exports = {
       register
}