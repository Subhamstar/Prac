import validator from "validator"
const signUpValidator=(req)=>{
    const {firstName,email,password}=req.body;
    if(!firstName){
        throw new Error("Name is not Valid !!");
    }
    if(!validator.isEmail(email)){
        throw new Error("Email is not valid !!");
    }
    if(!validator.isStrongPassword(password)){
        throw new Error("Please enter a strong password !!")
    }
}
export default signUpValidator;