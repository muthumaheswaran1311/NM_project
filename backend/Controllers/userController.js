
import userModel from "../Models/userModel.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const Register = async(req,res) => {
    const {username,email,password} = req.body
    const hashedPassword = await bcrypt.hash(password,10)
    if(!email || !username || !password ){
        res.json({success:false,message:"Fill out all the field"})
    }
    const userData = await userModel.findOne({email});
    if(userData){
        res.json({success:false,message:"User Already exists"})
    }
    try{
        const user = new userModel({
        username : username,
        email: email,
        password: hashedPassword
        })
        const userId = await user.save();
        const token = jwt.sign({id: userId._id},process.env.JWT_SECRET_KEY)
        res.json({success:true,token})
    }
    catch (err){
        console.log(err);
        res.json({success:false,message:"Error"})
    }  
}

const Login = async(req,res) => {
    try{
        const {email,password} = req.body;
        const user = await userModel.findOne({email})
        if(!user){
            return res.json({success:false,message:"User doesn't exist"})
        }
        const match = await bcrypt.compare(password,user.password);
        if(!match){
            return res.json({success:false,message:"Invalid credentials"})
        }
        const token = jwt.sign({id:user._id},process.env.JWT_SECRET_KEY);
        res.json({success:true,token})
    }
    catch(err){
        console.log(err);
        res.json({success:false,message:"Error"})
    }
    
}



export {Register,Login};