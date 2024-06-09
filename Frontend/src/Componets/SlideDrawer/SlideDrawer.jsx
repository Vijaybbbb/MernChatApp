import React, { useState } from 'react'
import './SlideDrawer.css'
import { Box, Button, ChakraBaseProvider, Menu, MenuButton, Text, Tooltip } from '@chakra-ui/react'
import { BellIcon } from '@chakra-ui/icons'

const SlideDrawer = () => {

  const [search,setSearch]  = useState('')
  const [searchResult,setSearchResult]  = useState([])
  const [loading,setLoading]  = useState(false)
  const [loadingChat,setLoadingChat]  = useState()




  return (
    <div>
       <Box
   
       justifyContent={'space-between'}
       alignItems={'center'}
       bg={'white'}
       w='100%'
       p={'5px 10px 5px 10px'}
       borderWidth={'5px'}

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
                            <MenuButton>
                                   <BellIcon/>
                            </MenuButton>
                     </Menu>
              </div>
       </Box>
    </div>
  )
}

export default SlideDrawer
