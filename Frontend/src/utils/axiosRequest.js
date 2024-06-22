import axios from 'axios'

const sampleUrl="https://mernchatapp-pnx4.onrender.com"

export const axiosRequest=axios.create({
       baseURL:sampleUrl,  
})