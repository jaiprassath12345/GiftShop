import React, { useEffect, useRef, useState } from 'react'
import HomeCard from '../component/HomeCard'
import { useSelector} from "react-redux";
import CardFeature from '../component/CardFeature';
import {GrPrevious,GrNext} from "react-icons/gr"
import FilterProduct from '../component/FilterProduct';
import AllProduct from '../component/AllProduct';



const Home = () => {
  
  const productData=useSelector((state)=>state.product.productList)
  const homeProductCartList=productData.slice(0,2)
  const homeProductToys=productData.filter(e=>e.category==="Toys",[])


  const slideProductRef=useRef()

  const nextProduct=()=>{
    slideProductRef.current.scrollLeft+=200
  }

  const prevProduct=()=>{
    slideProductRef.current.scrollLeft-=200
    
  }


  // const search=localStorage.getItem('Search')?JSON.parse(localStorage.getItem('Search')): [] 
 
  return (
 
    <div className='p-2 md:p-4'>
      <div className='md:flex gap-4 py-2'>

        <div className="md:w-1/2 ">
          <div className='flex gap-3 bg-slate-400 w-36 px-2 item-center rounded-full'>
              <p className='text-sm font-medium text-slate-900'>Bike Delivery</p>
              <img src="https://cdn-icons-png.flaticon.com/512/2972/2972185.png" className="h-7"alt="" />
          </div>
          <h2 className='text-4xl md:text-7xl font-bold py-3'>The Faster Delivery in <span className='text-red-500 '>Your Home</span></h2>
          <p className='py-3 text-base'>Best Gift Ever.Same Day Gifts.A Little Bit of Joy.Find gifts they'll love.Your Gifting Solutions.
            Unique and funny gifts.Some gifts are timeless.Need a gift? We got you.</p>
          <button className='font-bold bg-red-500 text-slate-200 px-4 py-2 rounded'>Order Now</button>
         </div>
          <div className='md:w-1/2 flex flex-wrap gap-5 p-4 justify-center'>
            {
             homeProductCartList[0] && homeProductCartList.map(e=>{
                return (
                    <HomeCard
                    key={e._id}
                    id={e._id}
                    image={e.image}
                    name={e.name}
                    price={e.price}
                    category={e.category}
                    />
              )
              })
            }
        </div>      
      </div>
               {/* <div>
                <div className='flex w-full items-center'>
                <h2 className='font-bold text-2xl text-slate-800 mb-4 '>Toys</h2>
                <div className='ml-auto gap-4 flex' >
                  <button onClick={prevProduct} className='bg-slate-300 hover:bg-slate-400 text-lg p-1 rounded'><GrPrevious/></button>
                  <button onClick={nextProduct} className='bg-slate-300 hover:bg-slate-400 text-lg p-1 rounded'><GrNext/></button>

                </div>
                </div>
                <div className='flex gap-5 overflow-scroll scrollbar-none scroll-smooth transition-all' ref={slideProductRef}>
                  {
                   homeProductToys.map(e=>{
                      return(
                    <CardFeature
                    key={e._id}
                    id={e._id}
                    name={e.name}
                    category={e.category}
                    price={e.price}
                    image={e.image}/>

                      )
                    })
                  }
                </div>
              </div> */}
                  <AllProduct heading={"Your Product"}/>
             
    </div>
    
  )
}

export default Home