import { ArrowBackIcon } from '@chakra-ui/icons'
import { Box, IconButton, Text } from '@chakra-ui/react'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setSelectedChat } from '../../Redux/selectedChatSlice'
import { getSender,getSenderFull } from '../../utils/chatLogic'
import Profile from '../Profile/Profile'

const SingleChat = ({fetchAgain,setFetchAgain}) => {

  const {selectedChat}  = useSelector(state=>state.selectedChatDetails)
  const {chats}  = useSelector(state=>state.chatDetails)
  const {userId}  = useSelector(state=>state.userDetails)
 console.log(selectedChat);
  const dispatch = useDispatch()

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
                            selectedChat?.chatName
                          }
                          </>
                      )

                  }

              </Text>
          
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
