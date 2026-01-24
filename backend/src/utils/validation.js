import validator from "validator"
export const signUpValidator=(req)=>{
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
export const validateEditprofile=(req)=>{
    const allowedEditsItem=["firstName","lastName","age","gender","about","skills"];
    const isEditAllowed=Object.keys(req.body).every((field)=>{
        return allowedEditsItem.includes(field);
    })
    return isEditAllowed;
}
