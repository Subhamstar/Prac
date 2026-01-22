import express from "express" ;
import connectDB from  "./config/database.js"
import User from "./models/user.js"
import bcrypt from "bcryptjs"
import cookieParser from "cookie-parser"
import signUpValidator from "./utils/validation.js";
import userAuth  from "./middlewares/auth.js";
import jwt from "jsonwebtoken"
const app=express();
app.use(express.json());
app.use(cookieParser())
app.post("/signUp",async (req,res)=>{
    try{
        // console.log(req.body);
        signUpValidator(req);
        const {firstName,email,password}=req.body;
        const hashedPassword=await bcrypt.hash(password,10);
        const newUser= new User({
            firstName:firstName,
            email:email,
            password:hashedPassword
        })
        await newUser.save();
        res.send("Data Added Suceesfully !!")

    }catch(err){
        res.status(400).json({"Error ":err.message});
    }
})
app.post("/login",async (req,res)=>{
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
        const token=user.getJWT();
        // console.log(token);
        res.cookie("token",token);
        res.send("Login Sucessfully !!")
    }
    catch(err){
        res.status(400).send("Eroorr while login")
    }
})
app.get("/profile", userAuth,async(req,res)=>{
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
app.get("/connctionRequestSent")
app.get("/getAllUser",async(req,res)=>{
    try{
        const user=await User.find();
        res.send(user);
    }catch(err){
        res.status(200).send("User found Error !!")
    }
})
app.patch("/user.:userId",async (req,res)=>{
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
app.post("/deleteUser",async(req,res)=>{
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
connectDB().then(()=>{
    console.log("Database connected Successfully !!");
    app.listen(7777,()=>{
        console.log("Server starting on localhost 3000 !!");
    }) 
}).catch(()=>{
    console.log("Database Connection Error");
    process.exit(1);
})

 