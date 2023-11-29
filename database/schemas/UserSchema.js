import mongoose from 'mongoose'

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minLength:3
  },
  email:  {
    type: String,
    trim: true,
    lowercase: true,
    unique: true,
    required: true,
    match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
},
  phone: {
    type: String,
    trim: true,
    required: true,
    match: [/^(\+\d{1,3}[- ]?)?\d{10}$/, 'Please fill a valid phone number']
  },
  password:{
    type:String,
    required:true
  },
  workFormHome:{
    type:String,
    required:true
  },
  address:{
    type:String,
  },
  city:{
    type:String,
  },
  state:{
    type:String,
  },
  pin:{
    type:String,
  }
})

module.exports = mongoose.models.User || mongoose.model('User', UserSchema)