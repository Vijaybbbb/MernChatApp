import { Box, Button, FormControl, FormLabel, Input, InputGroup, InputRightElement, Show, Toast, VStack, position } from '@chakra-ui/react'
import React, { useState } from 'react'
import { useToast } from '@chakra-ui/react'
import {axiosRequest} from '../../utils/axiosRequest'

const Signup = () => {

       const [userData,setUserData] = useState({
             name:null,
             email:null, 
             password:null, 
             confirmPassword:null, 
            

       })
       const [show,setShow]  = useState(false)
       const [loading,setLoading]  = useState(false)
       const [images,setImages]  = useState(undefined)
       const toast = useToast()

       function getData (e){
              e.preventDefault()
              setUserData({
                     ...userData,
                     [ e.target.name]: e.target.value,
       
              })
       }

       function handleShowHide(){
              setShow(!show)
       }


       async function handleSubmit(e){
       console.log(images);

              e.preventDefault()
              setLoading(true)
              if (images ==undefined) {
                     toast({
                            title: 'Select an image',
                            status: 'warning',
                            duration: 5000,
                            isClosable: true,
                            position:'bottom'
                          })
              }



            
              try {
                     const formData = new FormData();

              
                     formData.append('images', images);
              
              for (const key in userData) {
                     formData.append(key, userData[key]);
              }

                  axiosRequest.post(`/user/register`, formData,

                     {
                            withCredentials: true,
                            headers: {
                                   'Content-Type': 'multipart/form-data'
                            }
                     }).then((res) => {
       

                     }).catch((error) => {
                            console.log(error);
                     })
              } catch (error) {
                     
              }

       
       }


       function onInputChange(e){ 
              

              setImages(e.target.files[0]); 
       }


  return (
  <VStack 
    
       spacing={4}
       align='stretch'
     >
     <FormControl id='firstname' isRequired>
              <FormLabel>Name</FormLabel>
              <Input 
              placeholder='Enter Username'
              name='name'
              onChange={getData}

              />
     </FormControl>

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
     <FormControl id='confirmPassword' isRequired>
              <FormLabel>Confirm Password</FormLabel>
              <InputGroup>
              <Input 
              placeholder='Re-Type Password'
              name='confirmPassword'
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

     <FormControl id='pic' isRequired>
              <FormLabel>Choose a file</FormLabel>
              
              <Input 
              accept='image/*'
              name='pic'
              type='file'
              onChange={onInputChange}

              />
              

             
     </FormControl>

     <Button
     colorScheme='blue'
     width={'100%'}
     mt={15}
     onClick={handleSubmit}
     >
       Signup
     </Button>


     </VStack>
  )
}

export default Signup
