import React, { Profiler, useState } from 'react'
import './SlideDrawer.css'
import { Avatar, Box, Button, ChakraBaseProvider, Input, Menu, MenuButton, MenuItem, MenuList, Text, Tooltip, useDisclosure, useToast } from '@chakra-ui/react'
import { BellIcon, ChevronDownIcon } from '@chakra-ui/icons'
import { useDispatch, useSelector } from 'react-redux'
import Profile from '../Profile/Profile'
import { axiosRequest } from '../../utils/axiosRequest'
import { useNavigate } from 'react-router-dom'
import {storeUser} from '../../Redux/userSlice'
import {setSelectedChat} from '../../Redux/selectedChatSlice'

import {
       Drawer,
       DrawerBody,
       DrawerFooter,
       DrawerHeader,
       DrawerOverlay,
       DrawerContent,
       DrawerCloseButton,
     } from '@chakra-ui/react'
import Chatloading from '../Chatloading/Chatloading'
import UserListItem from '../UserlistItem/UserListItem'





const SlideDrawer = () => {
 const {userName,pic,_id:userId} = useSelector(state => state.userDetails)
 const user = useSelector(state => state.userDetails)


  const [search,setSearch]  = useState('')
  const [searchResult,setSearchResult]  = useState([])
  const [loading,setLoading]  = useState(false)
  const [loadingChat,setLoadingChat]  = useState()
  const [selectedChat,setSelectedChat]  = useState()

  const navigate  = useNavigate()
  const dispatch = useDispatch()
  const { isOpen, onOpen, onClose } = useDisclosure()
  const toast = useToast()


  function handleLogout(e){
       e.preventDefault()
       axiosRequest.post(`/clearCookie`,{withCredentials:true}).then(()=>{
              localStorage.clear()
              dispatch(storeUser({
                     userId:null,
                     userName:null,
                     pic:null
              }))
              navigate('/')
             }).catch(err=>console.log(err))
}


async function handleSearch(e){
       e.preventDefault()
       if(search==''){
              toast({
                     title:'Search is empty',
                     status: 'error',
                     duration: 1000,
                     isClosable: true, 
                     position:'top-left'
                   })
       }

       try {
              setLoading(true)
              const {data}  =await axiosRequest.get(`/user/allUsers?search=${search}`,{withCredentials:true})
              setLoading(false)
              setSearchResult(data)

       } catch (error) {
              toast({
                     title:'Something went wrong',
                     status: 'error',
                     duration: 1000,
                     isClosable: true, 
                     position:'top-left'
                   })
       }
}

async function accessChat(userid){

       try {
             setLoadingChat(true)
             const {data}  = await axiosRequest.post(`/chat`,{userId},{withCredentials:true})
             dispatch(setSelectedChat(data))
             setLoadingChat(false)
             onclose() 
       
       } catch (error) {
             console.log(error); 
       }
}



  return (
    <div>
       <Box
   
   display="flex"
   justifyContent="space-between"
   alignItems="center"
   bg="white"
   w="100%"
   p="5px 10px"
   borderWidth="5px"

       >
              <Tooltip label='Search Users to Chat ' hasArrow placement='bottom-end'>
                     <Button variant={'ghost'} onClick={onOpen}>
                         <i class="fa-solid fa-magnifying-glass"></i>
                         <Text d={{base:'none',md:'flex'}} px='4'>
                            Search User
                         </Text>
                     </Button>
              </Tooltip>

              <Text fontSize={'2xl'} fontFamily={'works sans'}>
                     Chat-Line
              </Text>

              <div>
                     <Menu>
                            <MenuButton p={1}>
                                   <BellIcon fontSize={'2xl'} m={1} />
                            </MenuButton>
                            {/* <MenuList></MenuList> */}
                     </Menu>
                     <Menu>
                            <MenuButton as={Button} rightIcon={<ChevronDownIcon/>}>
                                   <Avatar size={'sm'} cursor={'pointer'} name={userName} src={pic}/>
                            </MenuButton>
                            <MenuList>
                                            <Profile user={user}>
                                                   <MenuItem>
                                                          My Profile
                                                   </MenuItem>
                                            </Profile>

                                   <MenuItem onClick={handleLogout}>
                                             Log out
                                   </MenuItem>
                            </MenuList>
                     </Menu>
              </div>
       </Box>

       <Drawer
        isOpen={isOpen}
        placement='left'
        onClose={onClose}
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>Search User</DrawerHeader>

          <DrawerBody>
               <Box display={'flex'} pb={2}>
                            <Input
                            placeholder='Search by name or email'
                            mr={2}
                            value={search}
                            onChange={(e)=>{setSearch(e.target.value)}}
                            />
                            <Button onClick={handleSearch}>Go</Button>
               </Box>
               {loading?(
                     <Chatloading/>  
               ):(
                searchResult?.map((user)=>(
                     <UserListItem
                     key={user._id}
                     user={user}
                     handleFunction={()=>accessChat(user._id)}
                     >
                            
                     </UserListItem>
                ))
               )}
          </DrawerBody>

       
        </DrawerContent>
      </Drawer>
    </div>
  )
}

export default SlideDrawer
