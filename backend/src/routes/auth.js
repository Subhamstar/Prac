import express from "express"
import User from "../models/user.js";
import {signUpValidator} from "../utils/validation.js";
import bcrypt from "bcryptjs";
const authRouter=express.Router();
authRouter.post("/signUp",async (req,res)=>{
    try{
        // console.log(req.body);
        signUpValidator(req);
        const {firstName,email,password,lastName}=req.body;
        const hashedPassword=await bcrypt.hash(password,10);
        const newUser= new User({
            firstName,
            email,
            lastName,
            password:hashedPassword
        })
        await newUser.save();
        res.send("Data Added Suceesfully !!")

    }catch(err){
        res.status(400).json({"Error ":err.message});
    }
})
authRouter.post("/login",async (req,res)=>{
    try{
        const {email,password}=req.body;
        // console.log(req.body)
        const user=await User.findOne({email});
        // console.log(user);
        if(!user){
            return res.status(400).send("Incorrect user email")
        }
        const isMatch=await user.validatePassword(password);
        if(!isMatch){
            return res.status(400).send("Incorrect password !!")
        }
        const token=await user.getJWT();
        // console.log(token);
        res.cookie("token",token,{
            httpOnly:true,
            sameSite:"lax",
            secure:false
        });
        res.send("Login Sucessfully !!")
    }
    catch(err){
        res.status(400).send("Eroorr while login")
    }
})
authRouter.post("/logout",async(req,res)=>{
    try{
        res.cookie("token",null,{
            expires:new Date(Date.now())
        });
        res.send("Logout Sucessfullt !! ")
    }
    catch(err){
        res.status(400).send("Error While Logout :"+err.message);
    }
})
export default authRouter;