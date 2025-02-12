require('dotenv').config();

const mongoose = require('mongoose');
const DB = process.env.MONGODB_URI;

mongoose.connect(DB).then(() => {
  console.log('Connection To Database Has Been Established Successfull')
})
.catch((err) => {
  console.error('Connection To Database Failed',err.message)
})