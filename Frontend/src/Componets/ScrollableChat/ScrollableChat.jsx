import React from 'react'
import ScrollableFeed from 'react-scrollable-feed'
import { isLastMessage, isSameSender } from '../../utils/chatLogic'
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
                     </div>
              ))
       }
    </ScrollableFeed>
  )
}

export default ScrollableChat
