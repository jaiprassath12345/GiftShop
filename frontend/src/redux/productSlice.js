import {createSlice} from "@reduxjs/toolkit"
import toast from 'react-hot-toast'


const initialState={
    productList:[],
    cartItem:[],

}


export const productSlice=createSlice({
    name:"product",
    initialState,
    reducers:{
        setDataProduct:(state,action)=>{
            // console.log(action)
            state.productList=[...action.payload]
        },
        addCartItem:(state,action)=>{
            // console.log(action)
            const check=state.cartItem.some(e=>e._id === action.payload._id)
            if(check)
            {
                toast("Item Already in cart")
            }
            else
            {
                toast("Item Added to Cart")
                const total=action.payload.price
                state.cartItem=[...state.cartItem,{...action.payload,qty : 1,total:total}]
            }
           
        },
        deleteCartItem:(state,action)=>{
            // console.log(action.payload)
            toast("Deleted Successfully")
            const index=state.cartItem.findIndex(e=>e._id === action.payload)
            state.cartItem.splice(index,1)
        },
        increaseQty:(state,action)=>{
            console.log("===",state.cartItem)
            const index=state.cartItem.findIndex((e)=>e._id === action.payload)
            let qtys=state.cartItem[index].qty
            const qtyInc=++qtys
            state.cartItem[index].qty = qtyInc

            const price=state.cartItem[index].price
            const total=price*qtyInc

            state.cartItem[index].total =total

        },
        decreaseQty:(state,action)=>{
            const index=state.cartItem.findIndex(e=>e._id === action.payload)
            let qtys=state.cartItem[index].qty
            if(qtys>1)
            {
            const qtyDec=--qtys

            state.cartItem[index].qty= qtyDec
            const price=state.cartItem[index].price
            const total=price*qtyDec

            state.cartItem[index].total =total
            }
        }
    }
})

export const {setDataProduct,addCartItem,deleteCartItem,increaseQty,decreaseQty} =productSlice.actions

export default productSlice.reducer