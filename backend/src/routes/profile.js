import express from 'express'
import User from '../models/user.js';
import userAuth from '../middlewares/auth.js';
import {validateEditprofile} from "../utils/validation.js"
const profileRouter=express.Router();
profileRouter.use(express.json());
profileRouter.get("/profile", userAuth,async(req,res)=>{
    try{
        const user=req.user;
        if(!user){
            throw new Error("User not found !!")
        }
        res.send(user);
    }
    catch(err){
        res.status(400).send("Error in"+err.message);
    }
})
profileRouter.patch("/pofile/edit",userAuth,async (req,res)=>{
    try{
         if(!validateEditprofile(req)){
            return res.send("Update is not allowed of this item")
         }
         const loggedInUser=req.user;
         Object.keys(req.body).forEach((key)=>(loggedInUser[key]=req.body[key]));
         loggedInUser.save();
         res.send(`${loggedInUser.firstName} ,your profile Updateed Sucessfully `);
    }
    catch(err){
        res.send("Err "+err.meassge);
    }
})
profileRouter.post("profile/forgetPassword",(req,res)=>{
    
})
profileRouter.get("/getAllUser",async(req,res)=>{
    try{
        const user=await User.find();
        res.send(user);
    }catch(err){
        res.status(200).send("User found Error !!")
    }
})
profileRouter.patch("/user.:userId",async (req,res)=>{
    try{
        const {userId}=req.param;
        const data=req.body;
        const ALLOWED_UPDATES=["firstName","lastName","age","gender","about","skills"];
        const isUpdateAllowed=Object.keys(data).every((k)=>ALLOWED_UPDATES.includes(k));
        if(!isUpdateAllowed){
            return res.status(400).send("Update not allowed in this field")
        }
        const user=await User.findByIdAndUpdate(
            userId,data,
            {new:true,runValidator:true}
        )
    }
    catch(err){
        res.status(400).send("User Updated Error :"+err.meassge);
    }
})
profileRouter.post("/deleteUser",async(req,res)=>{
    try{
        const email=req.body
        const user=await User.findOneAndDelete({email});
        if(!user){
            return res.status(200).send("User Not found !!")
        }
        res.send("User deleted Sucessfully !!")
    }catch(err){
        res.status(400).message({"Error :":err.message})
    }
})
export default profileRouter;