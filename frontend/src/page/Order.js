import React from 'react'
import { Link } from 'react-router-dom'

const Order = () => {
  return (
    <div className='text-center my-5 h-3/4 mt-20'>
        <h1 className='text-2xl md:text-4xl font-bold py-3'>Your order has been Placed Successfully</h1>

        <Link to={"/"}>
     <button className='bg-red-500 w-1/4 text-lg rounded-full font-bold py-2 text-white'>Shop More</button>
     </Link>
    </div>
   
  )
}

export default Order