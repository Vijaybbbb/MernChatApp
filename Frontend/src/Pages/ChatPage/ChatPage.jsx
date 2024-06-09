import React, { useEffect, useState } from 'react'
import {axiosRequest} from '../../utils/axiosRequest'
import { useSelector } from 'react-redux'
import SlideDrawer from '../../Componets/SlideDrawer/SlideDrawer'
import { Box } from '@chakra-ui/react'
import ChatBox from '../../Componets/ChatBox/ChatBox'
import MyChats from '../../Componets/MyChats/MyChats'

const ChatPage = () => {
  
  const {userId}  = useSelector(state=>state.userDetails)

  return (
    <div style={{width:'100%'}}>
      {userId && <SlideDrawer/>}
      <Box
      d='flex'
      justifyContent={'space-between'}
      w='100%'
      h='91.5vh'
      p='10px'
      >
        {userId && <MyChats/>}
        {userId && <ChatBox/>}
      </Box>
    </div>
  )
}

export default ChatPage
