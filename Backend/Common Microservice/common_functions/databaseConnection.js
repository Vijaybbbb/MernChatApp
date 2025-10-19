const mongoose = require('mongoose')
const dotenv = require('dotenv');
const path = require('path');
dotenv.config({ path: path.resolve(__dirname, '../../.env') });


//const {}  = require('../../')
// specify path if needed


const connect =async () =>{
       //mongoDB connection function
 try {
       await mongoose.connect(process.env.MONGO)
       console.log("DataBase connected");
} catch (error) {
       console.log(error)
       console.log('Connection Failed');
 }
}

module.exports = {
       connect
}