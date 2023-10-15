const express = require("express")
const cors =require("cors")
const mongoose=require("mongoose")
const dotenv=require("dotenv").config()

const app=express()
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