import { Box, Button, FormControl, FormLabel, Input, InputGroup, InputRightElement, Show, Toast, VStack, position } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import {axiosRequest} from '../../utils/axiosRequest'
import ToastMessage from '../Toast/ToastMessage'
import { useToast } from '@chakra-ui/react'

const Signup = () => {

       const [userData,setUserData] = useState({
             name:'',
             email:'', 
             password:'', 
             confirmPassword:'', 
            

       })
       const [show,setShow]  = useState(false)
       const [showToast,setShowToast]  = useState(false)
       const toast = useToast()
       const [loading,setLoading]  = useState(false)
       const [images,setImages]  = useState(undefined)
       function getData (e){
              e.preventDefault()
              setUserData({
                     ...userData,
                     [ e.target.name]: e.target.value,
       
              })
       }

       function checkEmptyField(){
              if (userData.name == '' || userData.email == '' || userData.password == '' || userData.confirmPassword == '' ) {                
                     return true
              }else{
                     return false 
              } 
       }


       function handleShowHide(){
              setShow(!show)
       }

       function toastMessage(message,status){
              toast({
                     title:message,
                     status: status,
                     duration: 5000,
                     isClosable: true,
                     position:'bottom'
                   })
       }


       async function handleSubmit(e){
              e.preventDefault()

              if (checkEmptyField()) {
                     toastMessage('All field are required','error')                   
                     return
              }      
              if (images==undefined ) {
                     toast({
                            title: 'Select an image',
                            status: 'error',
                            duration: 5000,
                            isClosable: true,
                            position:'bottom'
                          })
                    
                     return
              }
              if (userData.password !== userData.confirmPassword ) {
                     toastMessage('Password do not match','error')                   
                     return
              }
            
              try {
                    
                  axiosRequest.post(`/user/register`, {images,userData},
                     {
                            withCredentials: true,
                            headers: {
                                   'Content-Type': 'application/json'
                            }
                     }).then((res) => {
                            toastMessage('Registration Success','success')
                     }).catch((error) => {
                            console.log(error);
                           toastMessage(error.response.data.message,'error')

                     })
              } catch (error) {
                     
              }

       
       }


       function onInputChange(e){ 
              setLoading(true)
              setImages(e.target.files[0])
              if (!e.target.files[0]) {
                     toastMessage('Select an image','error')
                     return
              }
              try {
                     const formData = new FormData();
              formData.append('file', e.target.files[0]);
              formData.append('upload_preset','Chat-App')
              formData.append('cloud_name','dfozstttc')
              fetch('https://api.cloudinary.com/v1_1/dfozstttc/image/upload',{
                     method:'post',
                     body:formData
              }).then((res)=>res.json())
                     .then((data)=>{
                            setImages(data.url.toString())
                            setLoading(false)
                     }).catch(err=>console.log(err))
              } catch (error) {
                     toastMessage('Select an image','error')
                     return
                    
              }


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
     isLoading={loading}
     >
       Signup
     </Button>


     </VStack>
  )
}

export default Signup
