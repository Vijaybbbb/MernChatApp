import React, { useState } from 'react'
import { useSelector } from 'react-redux'

const MyChats = () => {

  const {selectedChat}  = useSelector(state=>state.selectedChatDetails)
  const {chats}  = useSelector(state=>state.chatDetails)
  const [loggedUser,setLoggedUser]  = useState()

  

  return (
    <div>
      deededed
    </div>
  )
}

export default MyChats
