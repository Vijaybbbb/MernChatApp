const Chat = require('../Model/chatModel');
const User = require('../Model/userModel')


const accessChat = async(req,res,next) =>{
       try {
              const {userId} = req.body
              if(!userId){
                     console.log("Userid is not avilable in params");
                     return res.status(400).json('Failed')
              }

              var isChat = await Chat.findOne({
                     isGroupChat:false,
                     $and:[
                            {users:{$elementMatch:{$eq:req.user}}},
                            {users:{$elementMatch:{$eq:userId}}},

                     ]
              }).populate('users','-password').populate('latestMessage')

              isChat = await User.populate(isChat, {
                     path:'latestMessage.sender',
                     select:'name pic email'
              })

              if(isChat.length > 0){
                     res.send(isChat[0]);
              }else{
                     var chatData={
                            chatName : 'sender',
                            isGroupChat : false,
                            users : [req.user,userId]
                     }

                     try {
                            const createdChat = await Chat.create(chatData)
                            const fullChat = await Chat.findOne({_id:createdChat._id}).populate('users','-password')
                            res.status(200).json(fullChat)
                     } catch (error) {
                            
                     }


              }

       } catch (error) {
              
       }
}

const fetchChat = async(req,res,next) =>{
try {
        Chat.find({users:
              {$elementMatch:
                     {
                            $eq:req.user
                     }

              }})
              .populate('users','-password')
              .populate('groupAdmin','-password')
              .populate('latestMessage')
              .sort({updated:-1})
              .then(async(results)=>{
                     results = await User.populate(results,{
                            path:'latestMessage.sender',
                            select:'name pic email'
                     })
                    res.status(200).json(results)

              })
              


} catch (error) {
       console.log(error);
}
}


const createGroup = async(req,res,next) =>{
       try {
            
              if(!req.body.users || !req.body.name){
                     return res.status(400).json('please fill all Fields')
              }


              var users = JSON.parse(req.body.users);
                         
       
       } catch (error) {
              console.log(error);
       }
       }

module.exports = {
       accessChat,
       fetchChat,
       createGroup
}