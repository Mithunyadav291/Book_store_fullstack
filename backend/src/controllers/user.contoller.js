import generateToken from "../lib/utils.js";
import User from "../models/user.js";
import bcrypt from 'bcryptjs'


export const signup=async (req,res)=>{
   
  try {
    const {username,email,password,address}=req.body;
    if(!username || !email || !password || !address){
        return res.status(400).json({message:"All the field are required"})
    }
    if(username.length <4){
        return res.status(400).json({message:"Username lenght should be grether than 3"})
    }
    if(password.length<6){
        return res.status(400).json({message:"Password must be atleast 6 characters"})
    }

    const user= await User.findOne({email})
    if(user) return res.status(400).json({message:"Email already exists"})

    const salt= await bcrypt.genSalt(10);
    const hashedPassword=await bcrypt.hash(password,salt)

    const newUser=new User({
        username,
        email,
        password:hashedPassword,
        address,
    })


   
    if(newUser){
        const token=generateToken(newUser._id,res)
        await newUser.save();
        res.status(201).json({
            _id:newUser._id,
            username:newUser.username,
            email:newUser.email,
            // password:newUser.password,
            message:"successfully signup!",
            token:token
        })
    }else{
        res.status(400).json({message:"Invalid user data"})
    }

  } catch (error) {
    res.status(500).json({message:"Internal server error ",error})
  }
}

export const signIn=async (req,res)=>{
   
  try {
    const {email,password}=req.body;
    if(!email || !password){
        return res.status(400).json({message:"All the field are required"})
    }
   
    const user= await User.findOne({email})
    if(!user) return res.status(400).json({message:"Invalid credentials"})

    const isPasswordCorrect=await bcrypt.compare(password,user.password);
    if(!isPasswordCorrect){
        return res.status(400).json({message:"Wrong Password."})
    }
    
    
    const token=generateToken(user._id,res)
    // console.log(token)
    res.status(200).json({
        _id:user._id,
        username:user.username,
        email:user.email,
        role:user.role,
        message:"successfully login!",
        token:token

      })


  } catch (error) {
    res.status(500).json({message:"Internal server error ",error})
  }
}

export const checkAuth=async (req,res)=>{
    try {
        res.status(200).json(req.user)
    } catch (error) {
        res.status(500).json({message:"Internal server error in checkauth"})
    }
}

export const logout=(req,res)=>{
    try {
     res.cookie("jwt","",{maxAge:0})
     res.status(200).json({message:"Logged out successfully."})
    } catch (error) {
    //  console.log("Error in logout controller",error.message)
     res.status(500).json({message:"Internal server error"})
    }
 }

export const updateAddress=async (req,res)=>{
    try {
        const {id}= req.params;
        const {address}=req.body;
        await User.findByIdAndUpdate(id,{address:address})
        return res.status(200).json({message:"Address Updated successfully."})
    } catch (error) {
        res.status(500).json({message:"Internal server error",Error:error})
    }
}

export const UpdateEmail=async (req,res)=>{
    try {
        const {id}= req.params;
        const {email}=req.body;
        await User.findByIdAndUpdate(id,{email:email})
        return res.status(200).json({message:"Email Updated successfully."})
    } catch (error) {
        res.status(500).json({message:"Internal server error",Error:error})
    }
}

export const UpdateUsername=async (req,res)=>{
    try {
        const {id}= req.params;
        const {username}=req.body;
        await User.findByIdAndUpdate(id,{username:username})
        return res.status(200).json({message:"Username Updated successfully."})
    } catch (error) {
        res.status(500).json({message:"Internal server error",Error:error})
    }
}

export const UpdatePassword=async (req,res)=>{
    try {
        const {id}= req.params;
        const {oldPassword,newPassword}=req.body;
        const user= await User.findById(id);
        const isPasswordCorrect=await bcrypt.compare(oldPassword,user.password);
        if(!isPasswordCorrect){
        return res.status(400).json({message:"Not match with old password."})
       }
       const salt= await bcrypt.genSalt(10);
       const hashedPassword=await bcrypt.hash(newPassword,salt)
        await User.findByIdAndUpdate(id,{password:hashedPassword})
        return res.status(200).json({message:"Password Updated successfully."})
    } catch (error) {
        res.status(500).json({message:"Internal server error",Error:error})
    }
}

