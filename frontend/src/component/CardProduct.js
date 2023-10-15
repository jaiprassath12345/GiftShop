import React from 'react'
import {TbPlus,TbMinus} from "react-icons/tb"
import {AiFillDelete} from "react-icons/ai"
import { useDispatch } from 'react-redux'
import {deleteCartItem,increaseQty,decreaseQty} from"../redux/productSlice"

const CardProduct = ({id,image,name,category,price,qty,total}) => {
  const dispatch=useDispatch()
  return (
    <div className='bg-slate-200 p-2 flex gap-4 rounded border border-slate-300'>
        <div className='bg-white p-3 rounded overflow-hidden'>
            <img src={image} className="h-28 w-40 object-cover "alt="" />
        </div>
        <div className='flex flex-col gap-1 w-full'>
            <div className='flex justify-between'>
          <h3 className='font-semibold text-slate-600  captitalize text-lg md:text-xl'>
            {name}
            </h3>
            <div className='cursor-pointer text-slate-500 hover:text-red-500' onClick={()=>dispatch(deleteCartItem(id))}>
            <AiFillDelete/>
            </div>
            </div>
        <p className=' text-slate-500 font-medium '>{category}</p>
        <p className=' font-bold text-base'><span className='text-red-500 '>₹</span><span>{price}</span>
        </p>
        <div className='flex justify-between'>
         <div className="flex gap-3 items-center">
         <button 
         onClick={()=>dispatch(decreaseQty(id))} className='bg-red-300 py-1 mt-2 rounded hover:bg-red-500 p-1'> <TbMinus/> </button>
         <p className='font-semibold p-1'>{qty}</p>
         <button onClick={()=>dispatch(increaseQty(id))} className='bg-red-300 py-1 mt-2 rounded hover:bg-red-500 p-1'> <TbPlus/></button>

         </div>
         <div className='flex items-center gap-2 font-bold text-slate-700'>
            <p>Total :</p>
            <p><span className='text-red-500 '>₹</span>{total}</p>
         </div>
         </div>
          </div>
    </div>
  )
}
export default CardProduct