import axios from "axios";

import  { createSlice, createAsyncThunk } from "@reduxjs/toolkit";




const initialState ={
        isLoading :false,
        productList:[]
}

export const createNewProduct = createAsyncThunk("/products/addNewProduct", async(formData)=>{
                                                                          axios.defaults.withCredentials = true
                         const {data} = await axios.post("http://localhost:3000/admin/products/add", formData)
                         return data
}) 

export const fetchAllProducts = createAsyncThunk("/products/fetchAllProducts", async(formData)=>{
    axios.defaults.withCredentials = true
const {data} = await axios.get("http://localhost:3000/admin/products/get")
return data
}) 

export const editProduct = createAsyncThunk("/products/editProduct", async(id,formData)=>{
    axios.defaults.withCredentials = true
const {data} = await axios.put(`http://localhost:3000/admin/products/edit/${id}`,formData)
return data
})


export const deleteProduct = createAsyncThunk("/products/deleteProduct", async(id)=>{
    axios.defaults.withCredentials = true
const {data} = await axios.delete(`http://localhost:3000/admin/products/delete/${id}`)
return data
})

const adminProdcutSlice = createSlice({
    name:'adminProducts',
    initialState,
    reducers:{},
    extraReducers:(builder)=>{
        builder.addCase(fetchAllProducts.pending, (state)=>{
            state.isLoading = true
        })
        .addCase(fetchAllProducts.fulfilled, (state,action)=>{
            state.isLoading = false,
            state.productList=action.payload
        })
        .addCase(fetchAllProducts.rejected, (state)=>{
            state.isLoading = false,
            state.productList=[]
        })
    }

})

export default adminProdcutSlice.reducer