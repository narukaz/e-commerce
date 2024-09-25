import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {  
                isAuthenticated: false,
                isLoading:true,
                user:null
}


export const registerUser = createAsyncThunk('/auth/register',  
    async(formData) =>{
        axios.defaults.withCredentials = true
        const {data} = await axios.post('http://localhost:3000/auth/register', formData,)
        return data
    }
)

export const checkAuth = createAsyncThunk(
    "/auth/checkauth",
  
    async () => {
        axios.defaults.withCredentials = true;
      const response = await axios.get("http://localhost:3000/auth/check-auth",
        {
          headers: {
            "Cache-Control":
              "no-store, no-cache, must-revalidate, proxy-revalidate",
              
          },
        }
      );
  
      return response.data;
    }
  );

export const loginUser = createAsyncThunk('/auth/login',  
    async(formData) =>{
        axios.defaults.withCredentials = true
        const {data} = await axios.post('http://localhost:3000/auth/login', formData,)
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
        .addCase(loginUser.pending, (state)=>{
            state.isLoading = false
        }).addCase(loginUser.fulfilled,(state, action)=>{//fullfilled
            console.log(action)
            state.isLoading = false;
            state.user = action.payload.user? action.payload.user:null ;
            state.isAuthenticated = action.payload.success ? true: false;
        }).addCase(loginUser.rejected,(state)=>{
            state.isLoading = false;
            state.user = null;
            state.isAuthenticated = false;
        } )
        .addCase(checkAuth.pending, (state)=>{
            state.isLoading = true
        }).addCase(checkAuth.fulfilled,(state, action)=>{//fullfilled
            console.log(action)
            state.isLoading = false;
            state.user = action.payload.user? action.payload.user:null ;
            state.isAuthenticated = action.payload.success ? true: false;
        }).addCase(checkAuth.rejected,(state)=>{
            state.isLoading = false;
            state.user = null;
            state.isAuthenticated = false;
        } )

    }
})

export const {setUser} = authSlice.actions;
export default authSlice.reducer;
