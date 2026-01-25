import express from "express"
import ConnectionRequest from "../models/connectionRequest.js";
import userAuth from "../middlewares/auth.js"
import User from "../models/user.js";
const USER_SAFE_DATA="firstName lastName age skills";
const userRouter=express.Router();
userRouter.get("/user/request/received",userAuth,async (req,res)=>{  //pending request 
    try{
        const loggedinUser=req.user;
        const connectionReq=await ConnectionRequest.find({
            toUserId:loggedinUser._id,
            status:"interested"
        }).populate("fromUserId",USER_SAFE_DATA)
        console.log(connectionReq);
        if(connectionReq.length===0){
            return res.json({message:"You dont have any Connection pending !!"})
        }
        return res.json({message:"Data fetched Sucessfully !!",
            data:connectionReq
        })
    }
    catch(err){
        return res.status(400).send("error "+err.message);
    }
})
userRouter.get("/user/connection",userAuth,async(req,res)=>{
    try{
        const loggedinUser=req.user;
        const connectionReq=await ConnectionRequest.find({
            $or:[{toUserId:loggedinUser._id,status:"accepted"},
                {fromUserId:loggedinUser._id,status:"accepted"}
            ],
        }).populate("fromUserId",USER_SAFE_DATA)
          .populate("toUserId",USER_SAFE_DATA);
        const data=connectionReq.map((row)=>{
            if(row.fromUserId._id.toString()===loggedinUser._id.toString())return row.toUserId;
            else return row.fromUserId
        })
        if(connectionReq.length==0){
            return res.json({message:"You dont have any connection request till now;"})
        }
        return res.json({message:"data fetched sucessfully !!",
            data:data
        })
    }
    catch(err){
        res.status(400).json({message:err.message});
    }
})
userRouter.get("/user/feed",userAuth,async(req,res)=>{   // /user/feed/?page=1&limit=10
    try{
        const loggedinuser=req.user;
        const page=parseInt(req.query.page)||1;
        let limit=parseInt(req.query.limit)||10;
        limit=limit<50?limit:50;
        const skip=(page-1)*limit;
        const connectionReq=await ConnectionRequest.find({
            $or:[{fromUserId:loggedinuser._id},
                {toUserId:loggedinuser._id}
            ]
        }).select("fromUserId toUserId")
        const hidefromfeed=new Set();
        connectionReq.forEach((req)=>{
            hidefromfeed.add(req.fromUserId.toString());
            hidefromfeed.add(req.toUserId.toString());
        })
        const users=await User.find({
            $and:[{_id :{$nin:Array.from(hidefromfeed)}},
                  {_id:{$ne:loggedinuser._id}}
            ]
            
        }).select(USER_SAFE_DATA).skip(skip).limit(limit);
        res.send(users);
    }catch(err){
        res.status(400).send("Errror : "+err.message);
    }
})
export default userRouter;