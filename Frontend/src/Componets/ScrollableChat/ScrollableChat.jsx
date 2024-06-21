import React, { useEffect } from 'react'
import ScrollableFeed from 'react-scrollable-feed'
import { isLastMessage, isSameSender, isSameSenderMargin, isSameUser } from '../../utils/chatLogic'
import { useSelector } from 'react-redux'
import { Avatar, Tooltip } from '@chakra-ui/react'

const ScrollableChat = ({messages}) => {

  const {userId}  = useSelector(state=>state.userDetails)

  return (
    <ScrollableFeed>
       {
              messages && messages.map((m,i)=>(
                     <div style={{display:'flex'}} key={m._id}>
                                   {
                                          (isSameSender(messages,m,i,userId)) || 
                                          (isLastMessage(messages,i,userId)) &&
                                          (
                                          <Tooltip
                                                 label={m.sender.name}
                                                 placement='bottom-start'
                                                 hasArrow
                                          >
                                                        <Avatar
                                                        mt={'7px'}
                                                        mr={1}
                                                        size={'sm'}
                                                        cursor={'pointer'}
                                                        name={m.sender.name}
                                                        src={m.sender.pic}
                                                        />

                                          </Tooltip>
                                          )
                                   }
                                   <div style={{
                                          background: `${m.sender._id === userId ? '#BEE3F8' : '#9ad99f' }`
                                          //  background: '#BEE3F8' 
                                   ,
                                   borderRadius:'20px',
                                   padding:'5px 15px',
                                   maxWidth:'75%',
                                   marginLeft:isSameSenderMargin(messages,m,i,userId),
                                   marginTop:isSameUser(messages,m,i,userId) ? 3 : 10

                                   }}>
                                                 {m.content}  

                                   </div>
                     </div>
              ))
       }
    </ScrollableFeed>
  )
}

export default ScrollableChat
