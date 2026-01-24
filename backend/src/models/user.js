import mongoose from "mongoose"
import validator from "validator"
import jwt from "jsonwebtoken"
import bcrypt from "bcryptjs"
const userSchema=new mongoose.Schema({
    firstName:{
        type:String,
        required:true,
        trim:true,
        minLength:3,
        maxLength:30
    },
    lastName:{
        type:String,
        trim:true,
        minLength:3,
        maxLength:25
    },
    email:{
        type:String,
        trim:true,
        lowercase:true,
        required:true,
        unique:true,   //if it is unique then mongodb automatically created a index and unique index is much faster along with norma faster
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error("Please enter a correct email address !!")
            }
        }
    },
    password:{
        type:String,
        trim:true,
        required:true,
        validate(value){
            if(!validator.isStrongPassword(value)){
                throw new Error("What are you doing .. Please enter a strong password !!")
            }
        }
    },
    age:{
        type:Number,
        min:18,
        max:80
    },
    gender:{
        type:String,
        enum:{
            values:["Male","Female","others"],
            message:`{VALUE}is incorrect gender must be Male/Female/others`
        },
    },
    photoUrl:{
        type:String,
        default:"https://sincostani.jpeg",
        validate(value){
            if(!validator.isURL(value)){
                throw new Error("Please enter a valid photo url")
            }
        }
    },
    about:{
        type:String,
        default:"Coputer Sceience Student"
    },
    skills:{
        type:[String]
    }
},{
    timestamps:true
})




userSchema.methods.getJWT=async function(){
    const user=this;
    const token=await jwt.sign({_id:user._id},"SincosTani",{expiresIn:'7d'})
    return token;
}
userSchema.methods.validatePassword=async function(passwordInputByUser){
    const user=this;
    const isValidatePassword=await bcrypt.compare(passwordInputByUser,user.password);
    return isValidatePassword;
}
const User=mongoose.model("User",userSchema);
export default User;