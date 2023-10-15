import React from 'react'
import { useSelector } from 'react-redux'
import CardProduct from '../component/CardProduct'
import empty from "../asserts/empty.gif"
import {Link, useNavigate} from "react-router-dom"

const Cart = () => {
const productCartItem=useSelector((state)=>state.product.cartItem)
const totalPrice=productCartItem.reduce((acc,curr)=>acc+parseInt(curr.total),0) 
const totalQty=productCartItem.reduce((acc,curr)=>acc+parseInt(curr.qty),0)
const navigate = useNavigate()
const handleOrder = () => {
    navigate('/order')
    window.location.reload()
}
return (
    <>
    { 
     productCartItem[0] ?
 <div className='p-2 md:p-4'>
        <h2 className='text-lg md:text-2xl font-bold text-slate-800'>
            Your Cart Items
        </h2>
        <div className='my-4 md:flex gap-3'>
            {/* Display cart Items */}
            <div className='w-full max-w-3xl '>
                {
                    productCartItem.map(e=>{
                        return(
                            <CardProduct
                            key={e._id}
                            id={e._id}
                            name={e.name}
                            image={e.image}
                            category={e.category}
                            price={e.price}
                            qty={e.qty}
                            total={e.total}
                            />
                        )
                    })
                }
            </div>
            {/* Total Cart Item  */}
            <div className='w-full max-w-md  ml-auto'>
                <h2 className='bg-blue-500 text-white p-2 text-lg'>Summary</h2>
                <div className='flex w-full py-2 text-lg border-b'>
                <p>Total Qty :</p>
                <p className='ml-auto w-32 font-bold'>{totalQty}</p>
                </div>
                <div className='flex w-full py-2 text-lg border-b'>
                <p >Total Price :</p>
               
                <p className='ml-auto w-32 font-bold'>
                <span className='text-red-500'>₹</span>
                    {totalPrice}</p>
                </div>
                {/* <Link to={"/order"}> */}
                <button className='bg-red-500 w-full text-lg rounded-full font-bold py-2 text-white' onClick={handleOrder}>Place Order</button>
                {/* </Link> */}

                <Link to={"/"}>
                  <div>
                  <button className='bg-green-500 w-full py-2 px-3 mt-4 rounded-full text-lg text-white'>Shop More</button>
                  </div>
                  </Link>
                  </div>
        </div>
    </div>
    :
    <>
        <div className='flex w-full justify-center items-center flex-col'> 
            <img src={empty} alt=""className='w-1/4  ' />
            <p className='text-slate-500 text-3xl font-bold mt-4'>Cart is Empty</p>
            <Link to={"/"}>
            <div>
            <button className='bg-green-500 w-full py-2 px-3 mt-4 rounded-full text-lg text-white'>Shop More</button>
            </div>
            </Link>

        </div>
    </>
}
    </>
  )
}
export default Cart