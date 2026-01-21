import express from "express" ;
import connectDB from  "./config/database.js"
import User from "./models/user.js"
import bcrypt from "bcryptjs"
const app=express();
app.use(express.json());
app.post("/signUp",async (req,res)=>{
    try{
        // console.log(req.body);
        const {firstName,email,password}=req.body;
        const hashedPassword=bcrypt.hashSync(password);
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
            res.status(400).send("Incorrect user email")
        }
        const isMatch=await bcrypt.compare(password,user.password);
        if(!isMatch){
            res.status(400).send("Incorrect password !!")
        }
        res.send("Login Sucessfully !!")
    }
    catch(err){
        res.status(400).send("Eroorr")
    }
})

app.get("/getAllUser",async(req,res)=>{
    try{
        const user=await User.find();
        res.send(user);
    }catch(err){
        res.status(200).send("User found Error !!")
    }
})
app.post("/deleteUser",async(req,res)=>{
    try{
        const user=await User.findOneAndDelete({email});
        if(!user){
            res.status(200).send("User Not found !!")
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

 