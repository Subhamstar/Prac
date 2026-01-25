import mongoose from 'mongoose'
const ConnectionRequestSchema=new mongoose.Schema({
    fromUserId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    toUserId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    status:{
        type:String,
        enum:{
            values:["interested","ignored","accepted","rejected"],
            message:`{VALUE} is not correct`
        }
    }
})
ConnectionRequestSchema.index({fromUserId:1,toUserId:1}) //1 ->assending, -1 ->decending
ConnectionRequestSchema.pre("save",async function (){
    const conncetionReq=this;
    if(conncetionReq.fromUserId.equals(conncetionReq.toUserId)){
        throw new Error("You can not send conncetion request by yourself !!");
    }
    // next()
})
const ConnectionRequest=mongoose.model("Connection",ConnectionRequestSchema);
export default ConnectionRequest;