import axios from 'axios'

const sampleUrl="https://mernchatapp-5ev3.onrender.com"

export const axiosRequest=axios.create({
       baseURL:sampleUrl,  
})