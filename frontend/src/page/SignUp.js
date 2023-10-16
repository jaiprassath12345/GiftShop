import React, { useState } from 'react'
import loginSignup from "../asserts/login-animation.gif"
import {BiShow,BiHide} from "react-icons/bi";
import { Link,useNavigate } from 'react-router-dom';
import {toast} from  'react-hot-toast';

const SignUp = () => {

  const serverUrl=import.meta.env.REACT_APP_SERVER_DOMAIN;
    const navigate=useNavigate();
    const[showPassword,setShowPassword]=useState(false);
    const[showConfirmPassword,setShowConfirmPassword]=useState(false);
    const[data,setData]=useState({
        firstName:"",
        lastName:"",
        email:"",
        password:"",
        confirmpassword:"" 
    });
    console.log(data)

    const handleShowPassword=()=>{
        setShowPassword(prev=>!prev)
    }
    const handleShowConfirmPassword=()=>{
        setShowConfirmPassword(prev=>!prev)
    }

    const handleOnChange=(e)=>{
        const{name,value}=e.target
        setData((pre)=>{
            return{
                ...pre,
                [name]:value
            }
        })
    }
    console.log(process.env.REACT_APP_SERVER_DOMAIN)
    const handleSubmit= async(e)=>{
            e.preventDefault()
            const {firstName,email,password,confirmpassword}=data
            if(firstName && email && password && confirmpassword)
            {      
                if(password===confirmpassword)
                {
                    const fetchData=await fetch(`${process.env.REACT_APP_SERVER_DOMAIN}/signup`,{
                        method:"POST",
                        headers:{
                            "content-type":"application/json"
                        },
                        body:JSON.stringify(data)
                    })

                    const dataRes=await fetchData.json()
                    console.log(dataRes)
                    toast(dataRes.message)
                    if(dataRes.alert)
                    {
                    navigate("/login")
                    }
                }
                else{
                    alert("Password and confirm password not equal")
                }
            }
            else
            {
                alert("Please Enter Required fields")
            }
    }

  return (
    <div className='p-3 md:p-4'>
        <div className="w-full max-w-sm bg-white m-auto flex items-center flex-col p-4">
            <h1 className='text-center text-2xl font-bold'>Sign Up</h1>
            <div className="w-20 overflow-hidden rounded-full drop-shadow-md">
                <img src={loginSignup} className='w-full'  />
            </div>

            <form className="w-full py-3 flex flex-col" onSubmit={handleSubmit}>
            <label htmlFor="firstName">First Name</label>       
            <input 
            type={"text"}
            id="firstName"
            name="firstName" 
            className='mt-1 mb-2 w-full bg-slate-200 px-2 py-1 rounded' 
            value={data.firstName} 
            onChange={handleOnChange}/>

            <label htmlFor="lastName">Last Name</label>
            <input 
            type={"text"} 
            id="lastName" 
            name="lastName" 
            className='mt-1 mb-2 w-full bg-slate-200 px-2 py-1 rounded' 
            value={data.lastName} 
            onChange={handleOnChange}/>
            
           
            <label htmlFor="email">Email</label>
            <input
            type={"email"} 
            id="email" 
            name="email" 
            className='mt-1 mb-2 w-full bg-slate-200 px-2 py-1 rounded' 
            value={data.email}
            onChange={handleOnChange}/>
            

            <label htmlFor="password">Password</label>
            <div className='flex px-2 py-1 bg-slate-200 rounded mt-1 mb-2 focus-within:outline focus-within:outline-100'>
            <input
             type={showPassword?"text":"password"}
             id="password" 
             name="password" 
             className=' w-full bg-slate-200 px-2 py-1 border-none outline-none' 
            value={data.password} 
            onChange={handleOnChange}/>
            <span className='flex text-xl mt-1' onClick={handleShowPassword}>{showPassword?<BiShow/>:<BiHide/>}</span>
            </div>
          
            <label htmlFor="confirmpassword">Confirm Password</label>
            <div className='flex px-2 py-1 bg-slate-200 rounded mt-1 mb-2 focus-within:outline focus-within:outline-100'>
            <input 
            type={showConfirmPassword?"text":"password"} 
            id="confirmpassword" 
            name="confirmpassword" 
            className=' w-full bg-slate-200 px-2 py-1 border-none outline-none' 
            value={data.confirmpassword}
            onChange={handleOnChange}/>
            <span className='flex text-xl mt-1' onClick={handleShowConfirmPassword}>{showConfirmPassword?<BiShow/>:<BiHide/>}</span>
            </div>

            <button className="w-full max-w-[150px] m-auto w-full bg-red-500 hover:bg-red-600 cursor-pointer text-white text-xl font-mediuum text-center py-1 rounded-full mt-4">Sign Up</button>
            </form>
            <p className='text-left'>Already Have Account ? <Link to={"/login"} className='text-red-500 underline'>Login</Link></p>
        </div>
    </div>
  )
}

export default SignUp