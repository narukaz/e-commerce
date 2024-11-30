import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState ={
    isLoading:false,
    productList:[],
    error:''
}


export const fetchAllProducts = createAsyncThunk('products/fetchAllProducts', async()=>{
        axios.defaults.withCredentials = true
        const {data} = await axios.get('http://localhost:3000/admin/products/get')
        return data
})

export const addNewProduct = createAsyncThunk('products/addNewProducts',async(formdata)=>{
    axios.defaults.withCredentials = true
    const {data} = await axios.post('http://localhost:3000/admin/products/add' , formdata)
    return data
})

export const editProduct = createAsyncThunk('products/editProduct',async({id,formData})=>{
   
    axios.defaults.withCredentials = true
    const {data} = await axios.put(`http://localhost:3000/admin/products/edit/${id}` , formData)
    return data
})

export const deleteProduct = createAsyncThunk('products/editProduct',async(id)=>{
    axios.defaults.withCredentials = true
    const {data} = await axios.delete(`http://localhost:3000/admin/products/delete/${id}`)
    return data
})

const productSlice = createSlice({
    name:'product',
    initialState,
    reducers:{},
    extraReducers:(builder)=>{
        builder
        .addCase(fetchAllProducts.pending, (state)=>{
            state.isLoading = true
        })
        .addCase(fetchAllProducts.fulfilled, (state,action)=>{
            state.isLoading = false
            state.productList = action?.payload?.data

        })
        .addCase(fetchAllProducts.rejected, (state)=>{
            state.isLoading = false
            state.productList ={}
        } )
    }
})

export default productSlice.reducer