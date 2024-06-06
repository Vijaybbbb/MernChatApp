import React, { useState } from 'react'
import useFetch from '../../utils/axiosRequest'

const ChatPage = () => {


const data = useFetch('/api/chats')

const [chats,setChats] = useState(data)





  return (
    <div>
      
    </div>
  )
}

export default ChatPage
