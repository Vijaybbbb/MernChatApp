import axios from 'axios'

const sampleUrl="http://localhost:3000"

export const axiosRequest=axios.create({
       baseURL:sampleUrl,  
})