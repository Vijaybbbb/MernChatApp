import axios from 'axios'

const sampleUrl="http://localhost"

export const axiosRequest=axios.create({
       baseURL:sampleUrl,  
})