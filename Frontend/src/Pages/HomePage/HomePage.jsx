import { Box, Container,Text,TabList, Tab, TabPanels, TabPanel, Tabs } from '@chakra-ui/react'
import React from 'react'
import Login from '../../Componets/Login/Login'
import Signup from '../../Componets/Signup/Signup'

const HomePage = () => {
  return (

    <Container maxWidth={'xl'} centerContent>

      <Box
        d='flex'
        justifyContent='center'
        textAlign={'center'}
        p={3} 
        bg={'white'}
        w={'100%'}
        m={'40px 0 15px 0 '}
        borderRadius={'lg'}
        borderWidth={'1px'}
        >

        <Text fontSize={'4xl'} fontStyle={'Work sans'} color={'black'}>Talk-A-Tive</Text>
      </Box>

      <Box bg={'white'} p={4} borderRadius={'lg'} borderWidth={'1px'} w={'100%'}>
        <Tabs variant='soft-rounded' >
          <TabList>
            <Tab width={'50%'}>Login</Tab>
            <Tab width={'50%'}>Sign up</Tab>
          </TabList>
          <TabPanels>

            <TabPanel>
                      <Login/>
            </TabPanel>


            <TabPanel>
                       <Signup/>
            </TabPanel>


          </TabPanels>
        </Tabs>

      </Box>

    </Container>

  )
}

export default HomePage
