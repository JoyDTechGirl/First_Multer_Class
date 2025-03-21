// Import Multer
const multer = require('multer');

// Configure the storage
const storage = multer.diskStorage({
  // The destination to store file
  destination: (req,file,cb) => {
    cb(null,'./uploads')
  },
  filename: (req,file,cb) => {
    cb(null,file.originalname)
  }

});

const filefilter = (req,file,cb) => {
  if(file.mimetype.startsWith('image/')){
    cb(null,true)
  }else{
    cb(new Error('Invalid file type, Please upload only Image'))
  }
};

const limits = {
  limits: 1024 * 1024 * 10
};

const upload = multer({
  storage,
  filefilter,
  limits: {
    fileSize: 1024 * 1024 * 10
  }

});

module.exports = upload;