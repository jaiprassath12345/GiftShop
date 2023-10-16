const express = require("express")
const cors =require("cors")
const mongoose=require("mongoose")
const dotenv=require("dotenv").config()
const app=express()

// Set middleware of CORS 
app.use((req, res, next) => {
  res.setHeader(
    "Access-Control-Allow-Origin",
    "https://giffy.onrender.com/"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS,CONNECT,TRACE"
  );
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Content-Type, Authorization, X-Content-Type-Options, Accept, X-Requested-With, Origin, Access-Control-Request-Method, Access-Control-Request-Headers"
  );
  res.setHeader("Access-Control-Allow-Credentials", true);
  res.setHeader("Access-Control-Allow-Private-Network", true);
  //  Firefox caps this at 24 hours (86400 seconds). Chromium (starting in v76) caps at 2 hours (7200 seconds). The default value is 5 seconds.
  res.setHeader("Access-Control-Max-Age", 7200);

  next();
});

app.use(cors({
    origin:["http://localhost:3000"]
}))
app.use(express.json())

const PORT=process.env.port || 8080
//mongodb connection

mongoose.set('strictQuery',false);
mongoose.connect(process.env.MONGODB_URL)
.then(()=>console.log("connect to database"))
.catch((err)=>console.log(err))


//schema
const userSchema=mongoose.Schema({
    firstName:String,
    lastName:String,
    email:{
        type:String,
        unique:true
    },
    password:String,
    confirmpassword:String
})

//model
const userModel=mongoose.model("users",userSchema)


//api
app.get("/",(req,res)=>{
    res.send("server is running")
})

app.post("/signup", (req,res)=>{
   
    const {email}=req.body

    userModel.findOne({email: email}).then((result)=>{
        if(result){
        
            res.send({message:"Email id is already Registered",alert:false})
        }
        else{
            const data=userModel(req.body)
            const save=data.save()
            res.send({message:"Successfully Sign Up",alert:true})
        }
    })
    .catch((err)=>console.log(err))
})

//api login
app.post("/login",(req,res)=>{
   
    const {email}=req.body

    userModel.findOne({email: email}).then((result)=>{
        if(result){
       
        const dataSend={
                _id:result._id,
                firstName:result.firstName,
                lastName:result.lastName,
                email:result.email
        }
        
            res.send({message:"Login is successfull",alert:true,data:dataSend})
        }
        else{
    
            res.send({message:"Email is not available,Please sign up",alert:false})
        }
    })
    .catch((err)=>console.log(err))

})


//product section
const schemaProduct=mongoose.Schema({
    name:String,
    category:String,
    image:String,
    price:String,
    description:String
})

const productModel=mongoose.model("product",schemaProduct)

//save product in data
//api
app.post("/uploadProduct",async(req,res)=>{
    const data=productModel(req.body)
    const dataSave=await data.save()
    res.send({message:"uploaded successfully"})
})

//GET Api
app.get("/product",async(req,res)=>{
    const data=await productModel.find({})
    res.send(data)
})
app.listen(PORT,()=>console.log("server is running at port: "+PORT))