import User from "../models/user.model.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

export const allUser = async (req, res) => {
  try {
    const getUser = await User.find();
    if (!getUser) {
      return res.status(402).json({
        success: false,
        message: "User Not Found",
      });
    }
    return res.status(200).json({
      success: true,
      message: "All Users",
      getUser,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

export const SingleUser = async (req, res) => {
  try {
    const { id } = req.params;

    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User Not Found",
      });
    }
    return res.status(200).json({
      success: true,
      user,
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      success: false,
      message: "Internal Server Error!",
    });
  }
};
export const addUser = async (req, res) => {
  try {
    const { name, email, password, phone, role, address } = req.body;

    if (!name || !email || !password || !phone || !role || !address) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    const existsUser = await User.findOne({ email });

    if (existsUser) {
      return res.status(409).json({
        success: false,
        message: "Email already exists. Please login!",
      });
    }

    const salt = await bcrypt.genSalt(12);
    const hashpassword = await bcrypt.hash(password, salt);

    const newUser = await User.create({
      name,
      email,
      password: hashpassword,
      phone,
      role,
      address,
    });

    return res.status(201).json({
      success: true,
      message: "Registered successfully!",
      user: {
        id: newUser._id,
        name: newUser.name,
        email: newUser.email,
        role: newUser.role,
      },
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      success: false,
      message: "Internal Server Error!",
    });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "All Fields are required",
      });
    }

    const existUser = await User.findOne({ email });

    if (!existUser) {
      return res.status(404).json({
        success: false,
        message: "User Not Found. Please Register",
      });
    }

    const isMatchPassword = await bcrypt.compare(
      password,
      existUser.password
    );

    if (!isMatchPassword) {
      return res.status(401).json({
        success: false,
        message: "Password or email not matched",
      });
    }

    const token = jwt.sign(
      {
        id: existUser._id,
        role: existUser.role,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "7d",
      }
    );

    return res.status(200).json({
      success: true,
      message: "Login Successfully",
      token,
      user: {
        id: existUser._id,
        name: existUser.name,
        email: existUser.email,
        role: existUser.role,
      },
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};
export const updateUser = async (req, res) => {
  try {
    const { id } = req.params;

    const user = await User.findById(id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User Not Found",
      });
    }

    const editUser = await User.findByIdAndUpdate(
      id,
      req.body,
      { new: true }
    );

    return res.status(200).json({
      success: true,
      message: "Updated Successfully",
      user: editUser,
    });

  } catch (error) {
    console.log(error);

    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};
export const DeleteUser=async(req,res)=>{
  try{
    const { id } = req.params;

    const user = await User.findById(id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User Not Found",
      });
    }
    const removeUser=await User.findByIdAndDelete(id);
    return res.status(200).json({
      success:true,
      message:"User Account Deleted Successfully"
    })
  }catch(error){
    return res.status(500).json({
      message:"Internal Server Error"
    })
  }
}
export const profile=async(req,res)=>{
  try{
    const user=await User.findById(req.user.id).select("-password");
    if(!user){
      return res.status(404).json({
        success:false,
        message:"User Not Found"
      })
    }
    return res.status(200).json({
      success:true,
      message:"User Successfully Fetched",
      user
    })
  }catch(error){
    return res.status(500).json({
      success:false,
      message:"Internal Server Error"
    })
  }
}
