const express = require('express')
const cors = require('cors')
const app = express()
const dotenv = require('dotenv')
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser');

const { connect, createError } = require('../Common Microservice')
dotenv.config()
const PORT = process.env.USER_PORT || 3001
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

app.use('/user', userRouter)

app.use((err, req, res, next) => {
    const errorStatus = err.status || 500
    const errorMessage = err.message || 'Something Went Wrong'

    return res.status(errorStatus).json({
        success: false,
        status: errorStatus,
        message: errorMessage,
        stack: err.stack
    })
})

app.listen(PORT, () => { console.log(`USER SERVICE RUNNING : ${PORT}`) })
