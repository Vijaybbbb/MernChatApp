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
              if(users.length < 2){
                     return res
                     .status(400)
                     .json('More than 2 users required')
              } 
              users.push(req.user)       
              
              try {
                     const groupChat  = await Chat.create({
                            chatName:req.body.name,
                            users:users,
                            isGroupChat:true,
                            groupAdmin:req.user,

                     })

                     const fullGroupChat  = await Chat.findOne({_id:groupChat._id})
                            .populate('users','-password')
                            .populate('groupAdmin','-password')


                            res.status(200).json(fullGroupChat)


              } catch (error) {
                     console.log(error);
              }

       } catch (error) {
              console.log(error);
       }

 }



const renameGroup  = async(req,res,next) =>{
       try {
              const {chatId,chatName } = req.body

              const updatedChat = await Chat.findByIdAndUpdate(chatId,
                     {
                            chatName
                     },{new:true}
              )
              .populate('users','-password')
              .populate('groupAdmin','-password')

              if(!updatedChat){
                     res.status(404)
                     throw new Error('Chat not found')
              }else{
                     res.status(200).json(updatedChat)
              }

       } catch (error) {
              
       }
}

const addToGroup = async(req,res,next) =>{
       try {
              const {chatId,userId}  = req.body

              const added  = await Chat.findByIdAndUpdate(chatId,{

                     $push : {users:userId},
                    
              }, {new:true})
              .populate('users','-password')
              .populate('groupAdmin','-password')

              if(!added){
                     res.status(404)
                     throw new Error('Chat not Found')
              }else{
                     res.status(200).json(added)
              }

       } catch (error) {
              console.log(error);
       }
}


const removeFromGroup = async(req,res,next) =>{
       try {
              const {chatId,userId}  = req.body

              const removed  = await Chat.findByIdAndUpdate(chatId,{

                     $pull : {users:userId},
                    
              }, {new:true})
              .populate('users','-password')
              .populate('groupAdmin','-password')

              if(!removed){
                     res.status(404)
                     throw new Error('Chat not Found')
              }else{
                     res.status(200).json(removed)
              }

       } catch (error) {
              console.log(error);
       }
}





module.exports = {
       accessChat,
       fetchChat,
       createGroup,
       renameGroup,
       addToGroup,
       removeFromGroup
}