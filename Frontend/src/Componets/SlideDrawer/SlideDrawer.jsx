import React, { Profiler, useState } from 'react'
import './SlideDrawer.css'
import { Avatar, Box, Button, ChakraBaseProvider, Menu, MenuButton, MenuItem, MenuList, Text, Tooltip } from '@chakra-ui/react'
import { BellIcon, ChevronDownIcon } from '@chakra-ui/icons'
import { useDispatch, useSelector } from 'react-redux'
import Profile from '../Profile/Profile'
import { axiosRequest } from '../../utils/axiosRequest'
import { useNavigate } from 'react-router-dom'
import {storeUser} from '../../Redux/userSlice'

const SlideDrawer = () => {
 const {userName,pic,_id} = useSelector(state => state.userDetails)
 const user = useSelector(state => state.userDetails)


  const [search,setSearch]  = useState('')
  const [searchResult,setSearchResult]  = useState([])
  const [loading,setLoading]  = useState(false)
  const [loadingChat,setLoadingChat]  = useState()
  const navigate  = useNavigate()
  const dispatch = useDispatch()

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
                     <Button variant={'ghost'}>
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
    </div>
  )
}

export default SlideDrawer
