import mongoose from "mongoose"
import dotenv from "dotenv"
dotenv.config();
const connectDB=async()=>{
    await mongoose.connect(process.env.MONGO_URI); 
}
export default connectDB;











// connectDB().then(()=>{
//     console.log("Database Connected Successfully !!");
// }).catch(err=>{
//     console.log("Database connection Error !!");
// })