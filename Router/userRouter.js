const express = require('express')

const {createUser,getOneUser,update, deleteUser} = require('../Controllers/userController');

const upload = require('../utils/multer');

const router = express.Router();

router.post('/user',upload.single('image'),createUser)

router.get('/user/:id',getOneUser)

router.patch('/user/:id',upload.single('image'),update)


router.delete('/user/:id',upload.single('image'),deleteUser)

module.exports = router;