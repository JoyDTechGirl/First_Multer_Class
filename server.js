const express = require('express');
require('dotenv').config();
require('./Config/database');

const userRouter = require('./Router/userRouter')

const PORT = process.env.PORT

const app = express()
app.use(express.json());

app.use(userRouter)
app.use((err,req,res,next) => {
  console.log(err.code)
  if(err.code === "LIMIT_FILE_SIZE"){
    return res.status(400).json({message: "Image Size Too Large"})
  }else if(err){
    console.log(err.message)
    return res.status(400).json({message: err.message})
  }
  next()
})

app.listen(PORT,() => {
  console.log(`My Server is Listening To Port ${PORT}`);
})