import React from 'react'
import { Link } from 'react-router-dom'

const HomeCard = ({name,image,category,price,id}) => {
  return (
    <div className='bg-white shadow-md p-4 rounded'>
      <Link to={`/menu/${id}`} onClick={()=>window.scrollTo({top:"0",behaviour:"smooth"})}>

        <div className='w-60'>
            <img src={image} className='h-60 w-full' alt="" />
        </div>
        <h3 className='font-semibold text-slate-600 text-center captitalize text-lg'>{name}</h3>
        <p className='text-center text-slate-500 font-medium'>{category}</p>
        <p className='text-center font-bold '><span className='text-red-500'>₹</span><span>{price}</span></p>
    </Link>
    </div>
  )
}

export default HomeCard