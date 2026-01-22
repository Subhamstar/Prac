import jwt from "jsonwebtoken"
import User from "../models/user.js";
const userAuth=async (req,res,next)=>{
    try{
        const {token}=req.cookies;
        if(!token){
            throw new Error("Token not valid ")
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
        res.status(400).send("Error "+err.message)
    }
}
export default userAuth;