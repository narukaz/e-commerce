import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios';

const initialState = {
    isAuthenticated:document.cookie.split('=')[1] ? true:false,
    user:JSON.parse(localStorage.getItem('user'))||{},
    isLoading:false
}


export const signIn = createAsyncThunk('user/signIn', async(formData)=>{
       console.log("signIn Slice reducer called")
       axios.defaults.withCredentials = true
       const {data} = await axios.post('http://localhost:3000/auth/signIn', formData)
       localStorage.setItem('user', JSON.stringify(data.user))
       return data
})



export const getUser = createAsyncThunk('user/getUser', async()=>{
    console.log("getUser Slice reducer called")
    axios.defaults.withCredentials = true
    const {data} = await axios.get('http://localhost:3000/auth/get')
    return data
})


export const logoutUser = createAsyncThunk('user/logoutUser', async()=>{
    console.log("logout Slice reducer called")
    axios.defaults.withCredentials = true
    const {data} = await axios.get('http://localhost:3000/auth/logout')
    return data
})



export const register = createAsyncThunk('user/register', async(formData)=>{
    console.log("register Slice reducer called")
    axios.defaults.withCredentials = true
    const {data} = await axios.post('http://localhost:3000/auth/register', formData)

    return data
})





const authSlice =  createSlice({
    name:'auth',
    initialState,
    reducers:{
        setAuth:(state)=>{
        state.isAuthenticated=true
        }
        
    },
    extraReducers:(builder)=>{

        builder
        .addCase(signIn.pending, (state)=>{
           
        }).addCase(signIn.fulfilled,(state, {payload})=>{//fullfilled
            state.user = payload?.user
            state.isAuthenticated = true
            state.isLoading = false
            
        }).addCase(signIn.rejected,(state)=>{
            state.isAuthenticated = false
            
        } )
        

        //authchek
        .addCase(getUser.pending, (state)=>{
           
            state.isLoading = true
           
        })
        .addCase(getUser.fulfilled, (state,{payload})=>{
            state.isAuthenticated = payload?.success || false
            state.isLoading = true
            state.user = payload?.user
        })
        .addCase(getUser.rejected, (state)=>{
            state.isAuthenticated = false
            state.isLoading = false
           state.user ={}
        })

        //logout
        .addCase(logoutUser.pending, (state)=>{
            state.isAuthenticated = false
        })
        .addCase(logoutUser.fulfilled, (state,{payload})=>{
            state.isAuthenticated = false
            state.isLoading = true
            state.user = payload?.user
        })
        .addCase(logoutUser.rejected, (state)=>{
            state.isAuthenticated = false
            state.isLoading = false
            state.user ={}
        })


    }


})

export const {setAuth} = authSlice.actions
export default authSlice.reducer