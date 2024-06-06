const express = require('express') 
const app  = express()
const dotenv = require('dotenv')
dotenv.config()
const PORT =  process.env.PORT || 3000










app.listen(PORT,()=>{`Server Started On Port 3000`})