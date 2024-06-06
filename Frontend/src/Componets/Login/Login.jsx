import React, { useState } from 'react'
import { Box, Button, FormControl, FormLabel, Input, InputGroup, InputRightElement, Show, VStack } from '@chakra-ui/react'

const Login = () => {


  const [userData, setUserData] = useState({
    email: null,
    password: null,
  })

  const [show, setShow] = useState(false)


  function getData (e){
    e.preventDefault()
    console.log( e.target?.files);
    setUserData({
           ...userData,
           [ e.target.name]: e.target.value,
           pic: e.target.files ?   e.target?.files : null
    })
}


function handleShowHide(){
    setShow(!show)
}

console.log(userData);


function handleSubmit(e){
    e.preventDefault()


}


  return (
    <VStack

      spacing={4} 
      align='stretch'
    >


      <FormControl id='email' isRequired>
        <FormLabel>Email</FormLabel>
        <Input
          placeholder='Enter Email ID'
          name='email'
          onChange={getData}

        />
      </FormControl>

      <FormControl id='password' isRequired>
        <FormLabel>Password</FormLabel>
        <InputGroup>
          <Input
            placeholder='Enter Password'
            name='password'
            type={show ? 'text' : 'password'}
            onChange={getData}

          />
          <InputRightElement w={'4.5rem'}>
            <Button h={'1.75rem'} size={'sm'} onClick={handleShowHide}>
              {show ? "Hide" : "Show"}
            </Button>
          </InputRightElement>

        </InputGroup>
      </FormControl>



      <Button
        colorScheme='blue'
        width={'100%'}
        mt={15}
        onClick={handleSubmit}
      >
        Login
      </Button>
      <Button
        variant={'solid'}
        colorScheme='red'
        width={'100%'}
        mt={15}
        onClick={()=>{
          setUserData({email:'guest@example.com',password:'123'})
        }}
      >
        Get Guest User Credentials
      </Button>


    </VStack>
  )
}

export default Login
