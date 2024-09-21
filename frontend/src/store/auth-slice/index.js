import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {  
                isAuthenticated: false,
                isLoading:false,
                user:null
}


export const registerUser = createAsyncThunk('/auth/register',  

    async(formData) =>{
        const {data} = await axios.post('http://localhost:3000/auth/register', formData,
           {
            withCredentials:true
           }
        )
        return data
    }
)



const authSlice = createSlice({
    name:'auth',
    initialState,
    reducers :{
        setUser:(state,action)=>{
        }
    },
    extraReducers: (builder)=>{
        builder.addCase(registerUser.pending, (state)=>{
            state.isLoading = true
        }).addCase(registerUser.fulfilled,(state, action)=>{
            state.isLoading = false;
            state.user = action.payload;
            state.isAuthenticated = false;
        }).addCase(registerUser.rejected,(state, action)=>{
            state.isLoading = false;
            state.user = null;
            state.isAuthenticated = false;
        } )

    }
})

export const {setUser} = authSlice.actions;
export default authSlice.reducer;