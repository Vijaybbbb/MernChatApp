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
const chatRouter = require('./Router/chat')
const messageRouter = require('./Router/message')

const { verifyTocken } = require('./Utils/verifyTocken')


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
app.use('/chat',chatRouter)
app.use('/message',messageRouter)

app.use((err,req,res,next)=>{
       const errorStatus  = err.status || 500
       const errorMessage  = err.message || 'Something Went Wrong'

       return res.status(errorStatus).json({
              success:false,
              status:errorStatus,
              message:errorMessage,
              stack:err.stack
       })
})

app.post('/clearCookie', (req, res) => {
       // Set the cookie's expiration date to a past time
       try {
              res.cookie('access_tocken', '', { expires: new Date(0) });
              // Send a response
              res.status(200).json('Cookie cleared'); 
       } catch (error) {
              console.log(error);
       }
   });

app.listen(PORT,()=>{`Server Started On Port 3000`})