import { createSlice, createAsyncThunk  } from "@reduxjs/toolkit";
import axios from "axios";

const initialState ={
    isLoading:false,
    cartItems:[],
    cartId:''
}

export const addToCart = createAsyncThunk('cart/addToCart' , async({productId, userId, quantity})=>{
    axios.defaults.withCredentials = true;
    const {data} =  await axios.post('http://localhost:3000/shop/cart/add', {productId,userId,quantity})
    return data
})


export const fetchCartItems = createAsyncThunk('cart/fetchCartItems' , async(userId)=>{
    axios.defaults.withCredentials = true;

    const {data} = await axios.get(`http://localhost:3000/shop/cart/get/${userId}`)

    return data
})

export const updateCartItem = createAsyncThunk('cart/updateCartItem' , async({productId, userId, quantity})=>{
    axios.defaults.withCredentials = true;
    const {data} = await axios.put('http://localhost:3000/shop/cart/update-cart', {productId,userId,quantity})
    return data
})


export const deleteCartItem = createAsyncThunk('cart/deleteCartItem' , async({productId, userId})=>{
    axios.defaults.withCredentials = true;
    const {data} = await axios.delete(`http://localhost:3000/shop/cart/delete/${userId}/${productId}`)
    return data
})




const cartSlice = createSlice({
    name:'cart',
    initialState,
    reducers:{},
    extraReducers:(builder)=>{
        builder
        .addCase(addToCart.pending, (state)=>{
            state.isLoading = true
        })
        .addCase(addToCart.fulfilled, (state,{payload})=>{
            state.isLoading = false
            state.cartItems = payload.data.items
        })
        .addCase(addToCart.rejected, (state)=>{
            state.isLoading = false
            state.cartItems = []
        })





        .addCase(fetchCartItems.pending, (state)=>{
            state.isLoading = true
        })
        .addCase(fetchCartItems.fulfilled, (state,{payload})=>{
            state.isLoading = false
            state.cartItems = payload.data.items
            state.cartId =  payload.data.cartId
        })
        .addCase(fetchCartItems.rejected, (state)=>{
            state.isLoading = false
            state.cartItems = []
        })



        .addCase(updateCartItem.pending, (state)=>{
            state.isLoading = true
        })
        .addCase(updateCartItem.fulfilled, (state,{payload})=>{
            state.isLoading = false
            state.cartItems = payload.data.items
        })
        .addCase(updateCartItem.rejected, (state)=>{
            state.isLoading = false
            state.cartItems = []
        })





        .addCase(deleteCartItem.pending, (state)=>{
            state.isLoading = true
        })
        .addCase(deleteCartItem.fulfilled, (state,{payload})=>{
            state.isLoading = false
            state.cartItems = payload.data
        })
        .addCase(deleteCartItem.rejected, (state)=>{
            state.isLoading = false
            state.cartItems = []
        })
    }
})



export default cartSlice.reducer