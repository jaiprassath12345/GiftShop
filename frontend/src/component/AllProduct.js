import React, { useState, useEffect } from 'react'
import FilterProduct from './FilterProduct'
import CardFeature from './CardFeature'
import { useSelector } from 'react-redux'
import { AiOutlineSearch } from "react-icons/ai"

const AllProduct = () => {
  const productData = useSelector((state) => state.product.productList)
  const categoryList = [...new Set(productData.map(e => e.category))]
  const [dataSearch, setDataSearch] = useState([]);

  const handleSearch = (e) => {
    const value = e.target.value
    const filter = productData.filter(item => item.name.toLowerCase().includes(value.toLowerCase()))
    setDataSearch(filter)
  }



  //filter
  const [filterby, setFilterBy] = useState("")
  const [dataFilter, setDataFilter] = useState([])

  useEffect(() => {
    setDataFilter(productData)
  }, [productData])

  const handleFilterProduct = (category) => {
    setFilterBy(category)
    const filter = productData.filter(e => e.category.toLowerCase() === category.toLowerCase())
    setDataFilter(() => {
      return [
        ...filter
      ]
    })
  }


  return (
    <div className='my-5'>
      <div className='flex items-center md:w-3/5 w-full justify-between'>
        <h2 className='font-bold text-2xl text-slate-800 mb-4 '>
          Your Product
        </h2>
        <div className='flex ml-20 items-center relative w-1/3'>
          <AiOutlineSearch className='text-xl ml-1 mb-1 absolute ' />
          <input type="search"
            placeholder='Search'
            className='mt-1 mb-2 w-full bg-slate-200 px-2 pl-8 py-1 rounded '
            onChange={handleSearch} />
        </div>
      </div>
      <div className='flex gap-4 justify-center overflow-scroll scrollbar-none'>
        {
          categoryList[0] && categoryList.map(e => {
            return (
              <FilterProduct
                category={e}
                key={e}
                isActive={e.toLowerCase() === filterby.toLowerCase()}
                onClick={() => handleFilterProduct(e)}
              />
            )
          })
        }
      </div>
      <div className='flex flex-wrap justify-center gap-4'>
        {
          dataSearch.length>0?
          dataSearch.map(e=>{
            return (
              <CardFeature
                key={e._id}
                id={e._id}
                image={e.image}
                name={e.name}
                category={e.category}
                price={e.price}
              />
            )
          }):
          dataFilter.map(e => {
            return (
              <CardFeature
                key={e._id}
                id={e._id}
                image={e.image}
                name={e.name}
                category={e.category}
                price={e.price}
              />
            )
          })
        }
      </div>
    </div>
  )
}

export default AllProduct