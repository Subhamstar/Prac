import axios from "axios";
import React, { useState } from "react";

const Login = () => {
  const [email, setEmail] = useState("rahul@gmail.com");
  const [password, setPassword] = useState("Rahul@1234");
  const handleLogin=async(e)=>{
     e.preventDefault();
    try{
      const user=await axios.post("http://localhost:7777/login",{
        email,
        password,
      },{withCredentials:true});   // withCredentials means  store in Application->cookies section
    }catch(err){
      console.error(err);
    }
  }
  return (
    <div className="min-h-screen flex items-center justify-center">
      {/* Card */}
      <div className="w-full max-w-md bg-white/10 backdrop-blur-lg rounded-2xl shadow-2xl p-8 border border-white/20">
        {/* Title */}
        <h1 className="text-3xl font-bold text-center text-white mb-6">
          Login
        </h1>

        {/* Form */}
        <form className="space-y-5 "onSubmit={handleLogin}>
          {/* Email */}
          <div>
            <label className="block text-white mb-1">Email Address</label>

            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              required
              className="
w-full px-4 py-2 rounded-lg
bg-white/20 text-white
border border-white/30
focus:outline-none focus:ring-2 focus:ring-orange-400
placeholder-white/70
" 
onChange={(e)=>setEmail(e.target.value)}
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-white mb-1">Password</label>

            <input
              type="password"
              placeholder="Enter your password"
              value={password}
              required
              className="
w-full px-4 py-2 rounded-lg
bg-white/20 text-white
border border-white/30
focus:outline-none focus:ring-2 focus:ring-orange-400
placeholder-white/70
"
onChange={(e)=>setPassword(e.target.value)}
            />
          </div>

          {/* Buttons */}
          <div className="flex flex-col gap-3 pt-2">
            <button
              type="submit"
              className="
btn w-full
bg-orange-500 hover:bg-orange-600
border-none text-white
font-semibold
transition
"
            >
              Login
            </button>

            <button
              type="reset"
              className="
btn w-full
btn-ghost text-white
hover:bg-white/20
"
            >
              Reset
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
