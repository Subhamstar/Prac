import express from "express" ;
import connectDB from  "./config/database.js"
import cookieParser from "cookie-parser"
import authRouter from "./routes/auth.js";
import profileRouter from "./routes/profile.js";
import requestRouter from "./routes/request.js";

const app=express();
app.use(express.json());
app.use(cookieParser())
app.use('/',authRouter);
app.use('/',profileRouter);
app.use('/',requestRouter);

connectDB().then(()=>{
    console.log("Database connected Successfully !!");
    app.listen(7777,()=>{
        console.log("Server starting on localhost 3000 !!");
    }) 
}).catch(()=>{
    console.log("Database Connection Error");
    process.exit(1);
})

 