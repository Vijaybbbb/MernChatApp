import React, { useEffect, useState } from 'react'
import {axiosRequest} from '../../utils/axiosRequest'

const ChatPage = () => {

  useEffect(()=>{
    fetchHome()
  })
async function fetchHome(){
  try {
   const res = await axiosRequest.get('user/allUsers',{withCredentials: true})
      console.log(res);
  } catch (error) {
    console.log(error);
  }
}

  return (
    <div>
      Chats
    </div>
  )
}

export default ChatPage
