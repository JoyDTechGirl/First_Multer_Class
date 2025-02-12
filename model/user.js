const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
  fullName: {
    type: String,
  },
  email: {
    type: String,
    unique: true,
    require: [true,'Email is required']
  },
  image: {
    type: String,
    require: true
  },
},{
  timestamps: true
});

const userModel = mongoose.model('users',userSchema)

module.exports = userModel;