import axios from 'axios'

const sampleUrl="https://mernchatapp-txca.onrender.com"

export const axiosRequest=axios.create({
       baseURL:sampleUrl,  
})