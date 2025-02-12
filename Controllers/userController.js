const userModel = require("../model/user");
const fs = require("fs");

exports.createUser = async (req, res) => {
  try {
    const { fullName, email } = req.body;

    const file = req.file;

    const user = await userModel.create({
      fullName,
      email,
      image: file.originalname,
    });

    res.status(201).json({ message: "User Created Successfully", data: user });
  } catch (err) {
    console.log(err.message);
    res.status(500).json({ message: "Error Creating User" });
  }
};

exports.getOneUser = async (req, res) => {
  try {
    const { id } = req.params;

    const user = userModel.findById(id);

    if (!user) {
      return res.status(404).json({ message: "User Not Found" });
    }

    res.status(200).json({ message: "User Found", data: user });
  } catch (err) {
    console.log(err.message);
    res.status(500).json({ message: "Error Creating User" });
  }
};

exports.update = async (req, res) => {
  try {
    const { id } = req.params;

    const { fullName, email } = req.body;

    const user = await userModel.findById(id);

    if (!user) {
      return res.status(404).json({ message: "User Not Found" });
    }
    const data = {
      fullName,
      email,
      image: user.image,
    };

    const oldFilePath = `./uploads/${user.image}`;
    console.log(oldFilePath);

    if (req.file && req.file.filename) {
      console.log("If file exists", fs.existsSync(oldFilePath));
      if (fs.existsSync(oldFilePath)) {
        fs.unlinkSync(oldFilePath);

        data.image = req.file.originalname;
      }
    }

    const updatedUser = await userModel.findByIdAndUpdate(id, data, {
      new: true,
    });

    res
      .status(200)
      .json({ message: "User Updated Successfully", data: updatedUser });
  } catch (err) {
    console.log(err.message);
    res.status(500).json({ message: "Error Creating User" });
  }
};



exports.deleteUser = async(req,res) => {
  try{
    const {id} = req.params;

    const user = await userModel.findById(id)
    if(!user){
      return res.status(404).json({message: 'User Not Found'})
    }

    const oldFilePath = `./uploads/${user.image}`;

    const deletedUser = await userModel.findByIdAndDelete(id)

    if(deletedUser){
      fs.unlinkSync(oldFilePath)
    }

    
    res.status(200).json({message: 'User Found And Has Been Deleted Successfully',data:deletedUser})
  }catch(err){
    console.log(err.message)
    res.status(500).json({message: 'Error Deleting Users'})
  }
};