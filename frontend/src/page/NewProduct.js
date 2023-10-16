import React, { useState } from 'react'
import {BsCloudUpload} from "react-icons/bs"
import { ImagetoBase64 } from '../utility/ImagetoBase64'
import {toast} from  'react-hot-toast';

const NewProduct = () => {

  const [data,setData]=useState({
    name:"",
    category:"",
    image:"",
    price:"",
    description:""
  })

  const handleOnChange=(e)=>{
      const {name,value}=e.target

      setData((prev)=>{
        return {
          ...prev,
          [name]:value
        }
      })
  }

  const uploadImage= async (e)=>{
    const data= await ImagetoBase64(e.target.files[0])
    // console.log(data)
      setData((prev)=>{
        return{
          ...prev,
            image:data
        }
      })
  }

  const handleSubmit= async(e)=>{
    e.preventDefault()
    console.log(data)
    const {name,image,category,price}=data
    if(name && image && category && price){
    const fetchData=await fetch(`${import.meta.env.REACT_APP_SERVER_DOMAIN}/uploadProduct`,{
      method:"POST",
      headers:{
        "content-type":"application/json"
      },
      body: JSON.stringify(data)
    })

    const fetchRes=await fetchData.json()
    console.log(fetchRes)
    toast(fetchRes.message)

    
    setData(()=>{
      return   {
        name:"",
      category:"",
      image:"",
      price:"",
      description:""
      }
    })
  }
  else{
    toast("Enter Required Fields")
  }
  }

  return (
    <div className='p-4'>
      <form className='m-auto w-full max-w-md shadow flex flex-col p-3 bg-white' onSubmit={handleSubmit}>
        <label htmlFor="name">Name</label>
        <input type={"text"} name="name" className='bg-slate-200 p-1 my-1' onChange={handleOnChange} value={data.name}/>

        <label htmlFor="category"></label>
        <select name="category" id="category" className='bg-slate-200 p-1 my-1' onChange={handleOnChange} value={data.category}>
        <option value={"other"}>Select Category</option>
          <option value={"Toys"}>Toys</option>
          <option value={"Mens"}>Men's wear</option>
          <option value={"Womens"}>Women's wear</option>
          <option value={"Jewellery"}>Jewellery</option>
          <option value={"Electronics"}>Electronics</option>
        </select>

        <label htmlFor="image">Image
        <div className='h-40 w-full bg-slate-300 my-1 rounded flex items-center justify-center cursor-pointer'>
         {
          data.image? <img src={data.image} alt="" className='h-full'/>:  <span className='text-5xl'>    
          <BsCloudUpload/>
          </span>
         }
        
         
          <input type={"file"} accept="image/*" id='image' onChange={uploadImage} className='hidden'/>

        </div>
        </label>
        <label htmlFor="price" className='my-1'>Price</label>
        <input type={"text"}  className='bg-slate-200 p-1 my-1' name="price" onChange={handleOnChange} value={data.price}/>

        <label htmlFor="description">Description</label>
        <textarea name="description" value={data.description} rows={2} className='bg-slate-200 p-1 my-1 resize-none' onChange={handleOnChange}></textarea>
     
     <button className='bg-red-400 hover:bg-red-600 text-white text-lg font-medium my-2'>Save</button>
      </form>
    </div>
  )
}

export default NewProduct