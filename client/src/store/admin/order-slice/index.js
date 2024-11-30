import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";


const initialState ={
    isLoading:false,
    orderList:[],
    orderDetail:null,
   
}

export const getOrderDetailsForAdmin = createAsyncThunk('order/getOrderDetailsForAdmin', async(id)=>{
  
    axios.defaults.withCredentials=true
     const {data} = await axios.get(
      `http://localhost:3000/admin/orders/details/${id}`
     );
     return data;
   }
  )

  
export const getAllOrders = createAsyncThunk('order/getAllOrders', async()=>{
    
     axios.defaults.withCredentials=true
     const {data} = await axios.get(`http://localhost:3000/admin/orders/get`,
     );
     return data;
   }
  )


export const updateOrderStatusById = createAsyncThunk('order/updateOrderStatusById', async({id,orderStatus})=>{

     axios.defaults.withCredentials=true
     const {data} = await axios.put(`http://localhost:3000/admin/orders/update/${id}`,{orderStatus});
     return data;
   }
  )




  const adminOrderSlice = createSlice({
    name:'AdminOrders',
    initialState,
    reducers:{
      resetOrderDetailsForAdmin:(state)=>{ state.orderDetail = null}
    },
    extraReducers:
        (builder)=>{
            builder
            


            .addCase(getAllOrders.pending,(state)=>{ state.isLoading = true})
            .addCase(getAllOrders.fulfilled,(state,{payload})=>{
              state.isLoading = false;
              state.orderList = payload?.data})
              
            .addCase(getAllOrders.rejected,(state)=>{
              state.isLoading = false;
              state.orderList = []
            })



            .addCase(getOrderDetailsForAdmin.pending,(state)=>{ state.isLoading = true})
            .addCase(getOrderDetailsForAdmin.fulfilled,(state,{payload})=>{
              state.isLoading = false;
              state.orderDetail = payload?.data
            
            })
            .addCase(getOrderDetailsForAdmin.rejected,(state)=>{
              state.isLoading = false;
              state.orderDetail = null
            })


        }
    
})



export const{resetOrderDetailsForAdmin} = adminOrderSlice.actions
export default adminOrderSlice.reducer