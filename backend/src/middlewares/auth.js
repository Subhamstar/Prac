import jwt from "jsonwebtoken"
import User from "../models/user.js";
const userAuth=async (req,res,next)=>{
    try{
        const token=req.cookies?.token;
        if(!token){
            throw new Error("Token not valid ")
        }
        // console.log(req.cookies);
        // console.log(token);
        // console.log("token value:", req.cookies.token);
        // console.log("token type:", typeof req.cookies.token);

        if (!token || typeof token !== "string") {
            return res.status(401).json({ message: "Token not found or invalid" });
        }
        const decodedMessage=await jwt.verify(token,"SincosTani");
        const {_id}=decodedMessage;
        const user=await User.findById(_id);
        if(!user){
            throw new Error("Plese login again");
        } 
        req.user=user;
        next();
    }
    catch(err){
        res.status(400).send("Error : "+err.message)
    }
}
export default userAuth;