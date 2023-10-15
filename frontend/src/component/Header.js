import React,{useState} from 'react'
import logo from "../asserts/logo3.png"
import {Link} from "react-router-dom"
import {FaUserAlt} from "react-icons/fa"
import {BsCartFill} from "react-icons/bs"
import toast from 'react-hot-toast'
import {useSelector,useDispatch} from "react-redux"
import {logoutRedux} from "../redux/userSlice"
const Header = () => {

    const [showMenu,SetShowMenu]=useState(false);
    const userData= useSelector((state)=>state.user)
    const productData=useSelector((state)=>state.product.productList)
    const dispatch=useDispatch()
    const handleShow=()=>{
        SetShowMenu(prev=>!prev)
    }
const cartItemNumber=useSelector((state)=>state.product.cartItem)
    // console.log(process.env.REACT_APP_ADMIN_EMAIL)
  return (
    <header className='fixed shadow-md w-full h-16 px-2 md:px-4 z-50 bg-white'>
       <div className='flex items-center h-full justify-between'>
           <Link to={""}>
           <div className="h-16">
                <img src={logo} className='h-full'/>
            </div>
           </Link>
          
           <div className='flex items-center gap-4 md:gap-7'>  
            <nav className='gap-4 md:gap-6 text-base md:text-lg hidden md:flex'>  
                <Link to={""}>Home</Link>
                <Link to={"menu/652a4e83371a48268b9f6a44"}>Menu</Link>
            </nav>
            <div className='text-2xl text-slate-600 relative'>
               <Link to={"cart"}>
                <BsCartFill/>
                <div className="absolute -top-1 -right-1 text-white bg-red-500 h-4 w-4 rounded-full m-0 p-0 text-sm text-center">
                    {cartItemNumber.length}
                    </div>
                </Link>
            </div>
            <div className='text-xl text-slate-600 'onClick={handleShow}>
                <div className='border-2 border-solid border-slate-600 p-2 rounded-full '>
                <FaUserAlt/>
                </div>
                {
                    showMenu &&
                   ( <div className="absolute right-2 bg-white py-2 px-2 shadow drop-shadow-md flex flex-col">
                    {
                            process.env.REACT_APP_ADMIN_EMAIL &&
                            <Link to={"newproduct"} className='whitespace-nowrap cursor-pointer'>New Product</Link>
                    }
                    {
                    <Link to={"login"} className='whitespace-nowrap cursor-pointer'>Login</Link>
                    }
                    </div>)
                }   
            </div>
           </div>
       </div>
    </header>
  )
}

export default Header