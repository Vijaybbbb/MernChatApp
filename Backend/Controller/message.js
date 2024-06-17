
const Chat = require('../Model/chatModel');
const User = require('../Model/userModel')
const Message = require('../Model/messageModel')


const sendMessage  = async (req,res,next) =>{


       const {content,chatId}  = req.body


       if(!content || !chatId){
              console.log('Invalid data passed into request');
              return res.status(400)
       }
       var newMessage = {
              sender:req.user,
              content:content,
              chat:chatId
       }

       try {
              var message = await Message.create(newMessage)

              message = await message.populate('sender','name pic')
              message = await message.populate('chat')
              message = await User.populate(message,{
                     path:'chat.users',
                     select:'name pic email'
              })
       

              await Chat.findByIdAndUpdate(req.body.chatId,{
                     latestMessage:message,
              })

             return  res.status(200).json(message)

       } catch (error) {
              console.log(error);
              res.status(500).json('Internal Server Error');
              
       }

}


const allMessages  = async (req,res,next) =>{

              try {
                     const messages  = await Message.find({chatId:req.params.chatId})
                                          .populate('sender','name pic email')
                                          .populate('chat')
                                          
                     res.status(200).json(messages);
                                   

              } catch (error) {
                     console.log(error);
                     res.status(500).json('Internal Server Error');
             
              }

}


 module.exports ={
       sendMessage,
       allMessages

 }