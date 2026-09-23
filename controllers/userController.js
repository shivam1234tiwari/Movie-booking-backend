import User from '../models/user.model.js';
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'


export const addUser=async(req,res)=>{
    try{
        const {name,email,password, phone,role,address}=req.body;
        if (!name ||!email || !password ||!phone ||!role || !address){
            return res.status(403).json({
                success:false,
                message:"All Fields are required"
            })
        }
        const existsUser=await User.findOne({email})
        if(existsUser){
            return res.status(201).json({
                success:true,
                message:"Email Already Exists Please Login !"
            })
        }
        const newUser=await User.create({
            name,
            email,
            password,
            phone,
            role,
            address
        })
        await newUser.save();
        return res.status(200).json({
            success:true,
            message:"Registered SuccessFully !"
        })
    }catch(error){
        return res.status(500).json({
            success:false,
            message:"Internal Server Error !"
        })
    }
}

export const allUser=async(req,res)=>{
    try{
        return res.status(201).json({
            success:true,
            message:"All Users"
        })
    }catch(error){
        return res.status(500).json({
            success:false,
            message:"Internal Server Error"
        })
    }
}