const express = require('express') 
const cors = require('cors') 
const app  = express()
const dotenv = require('dotenv')
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser');   

const { connect } = require('./Utils/databaseConnection')
dotenv.config()
const PORT =  process.env.PORT || 3000
connect()
const userRouter = require('./Router/user') 


//middlewares 
app.use(express.json()) 
app.use(cookieParser())
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());



app.use(cors({
       origin: 'http://localhost:5173',
       credentials: true 
       }))



app.use('/user',userRouter)



app.listen(PORT,()=>{`Server Started On Port 3000`})