import React, { useState } from 'react'
import {
       Modal,
       ModalOverlay,
       ModalContent,
       ModalHeader,
       ModalFooter,
       ModalBody,
       ModalCloseButton,
       IconButton,
       useDisclosure,
       Button,
       useToast,
       Box,
       FormControl,
       Input,
     } from '@chakra-ui/react'
import { ViewIcon } from '@chakra-ui/icons'
import { useSelector } from 'react-redux'
import UserBadgeItem from '../UserBadgeItem/UserBadgeItem'
import { axiosRequest } from '../../utils/axiosRequest'
import { setSelectedChat } from '../../Redux/selectedChatSlice'
import UserListItem from '../UserlistItem/UserListItem'


const UpdateGroupChat = ({fetchAgain,setFetchAgain,fetchMessages}) => {


       const [groupChatName,setGroupChatName]  = useState()
       const [search,setSearch]  = useState('')
       const [searchResult,setSearchResult]  = useState([])
       const [loading,setLoading]  = useState(false)
       const [renameLoading,setRenameLoading]  = useState(false)

       const {selectedChat}  = useSelector(state=>state.selectedChatDetails)
       const {chats}  = useSelector(state=>state.chatDetails)
       const {userId}  = useSelector(state=>state.userDetails)
       const { isOpen, onOpen, onClose } = useDisclosure() 
       const toast = useToast()


            

       
       function toastMessage(message,status){
              toast({ 
                     title:message,
                     status: status,
                     duration: 5000,
                     isClosable: true,
                     position:'bottom'
                   })
              }

       async function handleSearch(query) {
              console.log(query);
              setSearch(query)
              if (!query) {
                     return
              }

              try {
                     setLoading(true)
                     const { data } = await axiosRequest.get(`/user/allUsers?search=${search}`, { withCredentials: true })
                     setLoading(false)
                     setSearchResult(data)   
              } catch (error) {
                     toastMessage('Failed', 'error')
              }
       }

       async function handleRemove(userToRemove) {

              if(selectedChat.groupAdmin._id !== userId){  
                     toastMessage('Only admin can remove users','error')
                     return
              }

              try {
                     setLoading(true)
                     const {data} = await axiosRequest.put(`/chat/removeGroup`,{
                            chatId:selectedChat._id,
                            userId:userToRemove._id ? userToRemove._id : userId
                     },{withCredentials:true})

                     userId._id == userToRemove._id ? setSelectedChat(null) : setSelectedChat(data)
                     setFetchAgain(!fetchAgain)
                     fetchMessages()
                     setLoading(true)
                     toastMessage('User Removed Successfully','success')


              } catch (error) {
                     console.log(error);
                     toastMessage('Something went wrong','error')
                     
              }

       }

       async function handleAddUser(userToAdd) {
              if(selectedChat.users.find((u)=> u._id === userToAdd._id )){  
                     toastMessage('User already Exists','error')
                     return
              }
             

              if(selectedChat.groupAdmin._id !== userId){  
                     toastMessage('Only admin can add users','error')
                     return
              }

              try {
                     setLoading(true)
                     const {data} = await axiosRequest.put(`/chat/addToGroup`,{
                            chatId:selectedChat._id,
                            userId:userToAdd._id
                     },{withCredentials:true})

                     setSelectedChat(data)
                     setFetchAgain(!fetchAgain)
                     setLoading(true)
                     toastMessage('User Added Successfully','success')


              } catch (error) {
                     toastMessage('Something went wrong','error')
                     
              }
                 
       }

       async function handleRename(){
              if(!groupChatName) return

              try {
                     setRenameLoading(true)
                    const {data} = await axiosRequest.put(`/chat/api/rename`,
                            {chatId:selectedChat._id,
                             chatName:groupChatName,

                            },
                            
                            {withCredentials:true})

                            setSelectedChat(data)
                            setFetchAgain(!fetchAgain)
                            setRenameLoading(false)
                            toastMessage('Updated Name Successfully','success')

              } catch (error) {
                     toastMessage('Failed to Rename','error')
                     setRenameLoading(false)
                     setGroupChatName(null)
                           
              }
       }

       

    

  return (
      <>
      <IconButton onClick={onOpen} icon={<ViewIcon/>} />

      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
              {selectedChat?.chatName}
          </ModalHeader>
          <ModalCloseButton />

          <ModalBody>
                     <Box w={'100%'} display={'flex'} flexWrap={'wrap'} pb={3}>
                         {
                            selectedChat.users.map((user)=>(
                                   <UserBadgeItem
                                   key={user._id}
                                   user={user}
                                   handleFunction={()=>{handleRemove(user)}}
                                   />
                            ))
                         }   
                     </Box>  

                     <FormControl display={'flex'}>

                            <Input
                            placeholder='Chat Name'
                            mb={3}
                            value={groupChatName}
                            onChange={(e)=>{setGroupChatName(e.target.value)}} 
                            />

                            <Button
                            varient='solid'
                            colorScheme='teal'
                            ml={1}
                            isLoading={renameLoading}
                            onClick={handleRename}
                            
                            >
                                   Update
                            </Button>

                     </FormControl>
                     <FormControl >

                            <Input
                            placeholder='Add User to group'
                            mb={1}
                            onChange={(e)=>{handleSearch(e.target.value)}}
                            />

                     </FormControl>


                     {
                loading ? (
                  <div>Loading</div>
                ):(
                  searchResult?.slice(0,4).map((user)=>(
                    <UserListItem key={user._id} user={user} handleFunction={()=>handleAddUser(user)}/>
                  ))
                )    
              }
          </ModalBody> 

          <ModalFooter>
            <Button colorScheme='red' mr={3} onClick={()=>
              {
                     handleRemove(userId)
                     
                     }}> 
              Leave Group
            </Button>
          
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}

export default UpdateGroupChat
