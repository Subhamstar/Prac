import express from "express" ;
const app=express();
app.get("/",(req,res)=>{
    res.send({firstName:"Subham",lastName:"Das"});
})
app.get("/ab?c",(req,res)=>{   //its works for ab and abc
    res.send({firstName:"Subham",lastName:"Das"});
})
app.get("/ab+c",(req,res)=>{   //its works for abc and abbc , abbbc,abbbbbbbbc
    res.send({firstName:"Subham",lastName:"Das"});
})
app.get("/ab*c",(req,res)=>{   //its works for ac, abc ,abbc , abbbc,abbbbbbbbc   and abgiogoih(anything)cd its aloso works
    res.send({firstName:"Subham",lastName:"Das"});
})
app.get("/a/",(req,res)=>{   //its works for parths contains a like only a,ab cab,car,koustav etc anywhere the path contains a 
    res.send({firstName:"Subham",lastName:"Das"});
})
app.listen(7777,()=>{
    console.log("Server starting on localhost 3000 !!");
}) 

