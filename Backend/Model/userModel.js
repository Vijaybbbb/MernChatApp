
const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({

       name: {
              type: String,
              required: true
       },
       email: {
              type: String,
              unique: true,
              required: true
       },
       password: {
              type: String,
              required: true
       },
       pic: {
              type: String,
       },
       isAdmin: {
              type: Boolean,
              default: false
       }

}, { timestamps: true })

const User = mongoose.model('user', userSchema)

module.exports = User;