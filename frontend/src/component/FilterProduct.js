import React from 'react'
import {CiShoppingTag} from "react-icons/ci"


const FilterProduct = ({category,onClick,isActive}) => {
  return (
 <div onClick={onClick}>
    <div className={`text-3xl p-5 bg-yellow-500 rounded-full cursor-pointer hover:bg-yellow-600 ${isActive ?  "bg-orange-600 text-white":""}`}>
    <CiShoppingTag/>
  </div>
  <p className='text-center font-medium my-1 capitalize'>{category}</p>
 </div>
  )
}

export default FilterProduct