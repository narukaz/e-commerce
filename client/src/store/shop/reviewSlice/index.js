import { createSlice , createAsyncThunk} from "@reduxjs/toolkit";
import axios from "axios";

const initialState= {
    isLoading:true,
    reviews:[]
}

    export const addProductReviews = createAsyncThunk(
        "shop/addReviews",
        async (review) => {
    
           axios.defaults.withCredentials = true;
          const { data } = await axios.post(`http://localhost:3000/shop/reviews/add`,review);
          return data;
        }
      );

      export const getProductReviews = createAsyncThunk(
        "shop/getReviews",
        async (productId) => {
          
           axios.defaults.withCredentials = true;
          const { data } = await axios.get(`http://localhost:3000/shop/reviews/${productId}`);
          return data;
        }
      );


const reviewSlice = createSlice({

    name:'review',
    initialState,
    reducers:{},
    extraReducers:(builder)=>{

            builder.addCase(getProductReviews.pending, (state)=>{
                state.isLoading= true
            })
            .addCase(getProductReviews.fulfilled,(state,{payload})=>{
                state.isLoading=false;
                state.reviews = payload?.data})
            .addCase(getProductReviews.rejected,(state)=>{
                    state.isLoading=false;
                    state.reviews = []})


    }


})


export default reviewSlice.reducer