import express from 'express'
const requestRouter=express.Router();
import userAuth from '../middlewares/auth.js';
import ConnectionRequest from '../models/connectionRequest.js';
import User from '../models/user.js';
requestRouter.post("/request/send/:status/:toUserId",userAuth,async(req,res)=>{
    try{
        // console.log(req.params.)
        const fromUserId=req.user?._id;
        const toUserId=req.params?.toUserId;
        // console.log(req.params?.toUserId);
        // console.log(req.user?._id);
        const status=req.params?.status;

        const allowedStatus=["ignored","interested"];
        if(!allowedStatus.includes(status)){
            throw new Error("Please sent correct status")
        }
        const toUser=await User.findById(toUserId);
        if(!toUser){
            return res.status(400).send({message:"User does not exist is Database !!"})
        }
        if(fromUserId.toString()===toUserId.toString()){
            return res.status(400).json({message:"You can not send request by yourself !!"})
        }
        const exectingConnectionReq=await ConnectionRequest.findOne({
            $or:[
                {fromUserId,toUserId},
                {fromUserId:toUserId,toUserId:fromUserId},
            ]
        })
        if(exectingConnectionReq){
            return res.status(400).send({message:"Connection request already exists !!"})
        }
        const conncetion=new ConnectionRequest({
            fromUserId,
            toUserId,
            status
        }) 
        const data=await conncetion.save();
        res.json({
            messaage:req.user.firstName+" is "+status+ " in "+toUser.firstName,
            data
        })
    }
    catch(err){
        res.status(400).send("Error while send request :"+err.message);
    }
})
requestRouter.post("/review/received/:status/:requestId",userAuth,async (req,res)=>{
    try{
        const loggedinuUser=req.user;
        const allowedStaus=["accepted","rejected"];
        const {status,requestId}=req.params;
        console.log(status);
        console.log(requestId);
        if(!allowedStaus.includes(status)){
            throw new Error("status is not valid !!");
        }
        const conncetionReq=await ConnectionRequest.findOne({
            _id:requestId,
            toUserId:loggedinuUser._id,
            status:"interested"
        })
        if(!conncetionReq){
            res.status(404).json({messaage:"Connection Request not found"});
        }
        conncetionReq.status=status;
        const data=await conncetionReq.save();
        res.status(400).json({message:"Connection request "+status,
            data
        })
    }
    catch(err){
        res.status(400).send("Error : "+err.messaage);
    }
})
export default requestRouter;