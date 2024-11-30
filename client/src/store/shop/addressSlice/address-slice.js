
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState={
    isLoading: false,
    addressList:[]
}

export const fetchAllAddress = createAsyncThunk('address/fetchAllAddress', async(userId)=>{
    axios.defaults.withCredentials = true;
    const {data}  = await axios.get(`http://localhost:3000/shop/address/get/${userId}/`)
    return data
})

export const deleteAddress = createAsyncThunk('address/deleteAddress', async({userId,addressId})=>{
    axios.defaults.withCredentials = true;
    const {data}  = await axios.delete(`http://localhost:3000/shop/address/delete/${userId}/${addressId}`)
    return data
})

export const editAddress = createAsyncThunk('address/fetchAllAddress', async({userId ,addressId ,formData})=>{
    axios.defaults.withCredentials = true;
    const {data}  = await axios.put(`http://localhost:3000/shop/address/update/${userId}/${addressId}`, formData)
    return data
})

export const addAddress = createAsyncThunk('address/addAddress', async(formData)=>{
    axios.defaults.withCredentials = true;
    const {data}  = await axios.post(`http://localhost:3000/shop/address/add`, formData)
    return data
})





const addressSlice = createSlice({
    name:'address',
    initialState,
    reducers:{},
    extraReducers:(builder)=>{
        builder
        .addCase(addAddress.pending, (state)=>{
                state.isLoading=true
        })
        .addCase(addAddress.fulfilled, (state, {payload})=>{
            state.isLoading=false
           
        })
        .addCase(addAddress.rejected, (state)=>{
            state.isLoading=false
            state.addressList=[]
        })
    //fetch data

        .addCase(fetchAllAddress.pending, (state)=>{
            state.isLoading = true
        })
        .addCase(fetchAllAddress.fulfilled, (state,{payload})=>{
            state.isLoading = false
            state.addressList= payload.data
        })
        .addCase(fetchAllAddress.rejected, (state)=>{
            state.isLoading=false
            state.addressList=[]
        } )
    }
})

export default addressSlice.reducer