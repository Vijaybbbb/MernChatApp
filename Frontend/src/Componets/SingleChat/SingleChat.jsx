import { ArrowBackIcon } from '@chakra-ui/icons'
import { Box, FormControl, IconButton, Input, Spinner, Text, useToast } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setSelectedChat } from '../../Redux/selectedChatSlice'
import { setNotification } from '../../Redux/notificationSlice'
import { getSender,getSenderFull } from '../../utils/chatLogic'
import Profile from '../Profile/Profile'
import UpdateGroupChat from '../UpdateGroupChat/UpdateGroupChat'
import { axiosRequest } from '../../utils/axiosRequest'
import '../../utils/styles.css'
import ScrollableChat from '../ScrollableChat/ScrollableChat'
import { io } from 'socket.io-client'


const ENDPOINT = 'https://mernchatapp-txca.onrender.com';
var socket , selectedChatCompare;


const SingleChat = ({fetchAgain,setFetchAgain}) => {

  const [messages,setMessages]  = useState([])
  const [loading,setLoading]  = useState(false)
  const [newMessage,setNewMessage]  = useState()
  const [socketConnected,setSocketConnected]  = useState(false)
  const [typing,setTyping]  = useState(false)
  const [isTyping,setIsTyping]  = useState(false)


  const {selectedChat}  = useSelector(state=>state.selectedChatDetails)
  const {notification}  = useSelector(state=>state.notificationDetails)
  const {userId}  = useSelector(state=>state.userDetails)
  const dispatch = useDispatch()
  const toast = useToast()

  useEffect(()=>{
    fetchMessages()
    selectedChatCompare = selectedChat;
  },[selectedChat])

  useEffect(()=>{
    
     socket = io(ENDPOINT, {
      withCredentials: true,
    });
      socket.emit('setup',userId)
      socket.on('connected',()=>{
        setSocketConnected(true)
      })
      socket.on('typing',()=>{
        setIsTyping(true)
      })
      socket.on('stop typing',()=>{
        setIsTyping(false)
      })
  },[])


  useEffect(()=>{
    socket.on('message recieved',(newMessageRecived)=>{
        if(!selectedChatCompare || selectedChatCompare._id !== newMessageRecived.chat._id){
              if(!notification.includes(newMessageRecived)){
        
                  dispatch(setNotification([newMessageRecived]))
                  setFetchAgain(!fetchAgain)
              }
        }
        else{
          setMessages([...messages,newMessageRecived])
        }
    })
  })

  function toastMessage(message,status){
    toast({ 
           title:message,
           status: status,
           duration: 5000,
           isClosable: true,
           position:'bottom'
         })
    }



 async  function sendMessage(e){
    if(e.key === 'Enter'  && newMessage){
          socket.emit('stop typing',selectedChat._id)
          try {
             setNewMessage('')
             const {data}  = await axiosRequest.post(`/message`,{
                content:newMessage,
                chatId:selectedChat._id

             },{withCredentials:true})
             socket.emit('new message',data)
             setMessages([...messages,data])

          } catch (error) {
                 console.log(error);
                toastMessage('Sending failed','error')   
          }
    }
  }

  function typingHandler(e){
    setNewMessage(e.target.value)

    if(!socketConnected) return

    if(!typing){
      setTyping(true)
      socket.emit('typing',selectedChat._id)
    }

    let lastTypingTime =  new Date().getTime()

    var timerLength = 3000

    setTimeout(()=>{
        var timeNow  = new Date().getTime()
        var timeDiff = timeNow - lastTypingTime

        if(timeDiff >= timerLength && typing){
              socket.emit('stop typing',selectedChat._id)
              setTyping(false)
        }
    },timerLength)
  }


  async function fetchMessages() {
    console.log('fetching again');
    if (!selectedChat) return
    try {
      setLoading(true)
      const { data } = await axiosRequest.get(`/message/${selectedChat?._id}`, { withCredentials: true })
      setMessages(data)
      setLoading(false)
   
      socket.emit('join chat',selectedChat._id)

    } catch (error) {
      console.log(error);
      toastMessage('Something went wrong', 'error')
    }

  }

 

  return ( 
    <>
      {
        selectedChat ? (
          <>
              <Text
              fontSize={{base:"20px" , md:"30px"}}
              pb={3}
              px={2}
              w={'100%'}
              fontFamily={'Work sans'}
              display={'flex'}
              justifyContent={{base:"space-between"}}
              alignItems={'center'}

              >
                  <IconButton
                  display={{base:"flex"  , md:'none'}}
                  icon={<ArrowBackIcon/>}
                  onClick={()=>dispatch(setSelectedChat(null))}
                  />

                  {
                      !selectedChat.isGroupChat ? (
                          <>
                          {
                            getSender(userId,selectedChat?.users)
                          }
                            <Profile user={ getSenderFull(userId,selectedChat?.users)}/>
                          </>
                      ) : (
                          <>
                          {
                            selectedChat?.chatName.toUpperCase()
                          }
                            <UpdateGroupChat 
                             fetchAgain={fetchAgain} 
                             setFetchAgain={setFetchAgain}
                             fetchMessages={fetchMessages}
                             />

                          </>
                      )

                  }

              </Text>

              <Box
              display={'flex'}
              flexDir={'column'}
              justifyContent={'flex-end'}
              p={3}
              bg={'#E8E8E8'}
              w={'100%'}
              h={'100%'}
              borderRadius={'lg'}
              overflowY={'hidden'}
              >

                    {
                      loading ? (
                        <Spinner
                        size={'xl'}
                        w={20}
                        h={20}
                        alignSelf={'center'}
                        margin={'auto'}
                        />
                      ):(
                        <div className='messages'>
                            <ScrollableChat messages={messages}/> 
                        </div>
                      )
                    }

                    <FormControl onKeyDown={sendMessage} isRequired mt={3}>
                        {isTyping?<div>
                          <Text style={{color:'grey',marginBottom:"5px"}}>Typing...</Text>   
                        </div>:<></>}

                        
                          <Input
                         variant={'filled'}
                         bg={'#E0E0E0'}
                         placeholder='Enter a message...' 
                         onChange={typingHandler}
                         value={newMessage}
                        />
                       
                        
                    </FormControl>

              </Box>
          
          </>
        ):(
          <Box display='flex' alignItems={'center'} justifyContent={'center'} height='100%'>
            <Text fontSize='3xl' pb={3} fontFamily='Works sans'> 
                    Click on a user to start chatting 
            </Text>
          </Box>
        )
      } 
    </>
  )
}

export default SingleChat
