const express = require('express');
require('dotenv').config();
require('./Config/database');

const userRouter = require('./Router/userRouter')

const PORT = process.env.PORT

const app = express()
app.use(express.json());

app.use(userRouter)

app.listen(PORT,() => {
  console.log(`My Server is Listening To Port ${PORT}`);
})