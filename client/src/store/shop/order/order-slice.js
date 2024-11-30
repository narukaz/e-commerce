import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";


const initialState ={
    approvalUrl:null,
    orderId:null,
    isLoading:false,
    orderDetail : null,
    orderList : []
}


export const createNewOrder = createAsyncThunk('order/createNewOrder', async(orderData)=>{
                axios.defaults.withCredentials=true
              const {data} = await  axios.post('http://localhost:3000/shop/order/create', orderData)
              return data
})

export const capturePayment = createAsyncThunk('order/capturePayment', async({paymentId,payerId,orderId})=>{
  
   axios.defaults.withCredentials=true
    const {data} = await axios.post(
      "http://localhost:3000/shop/order/capture",
      {
        paymentId,
        payerId,
        orderId,
      }
    );
    return data;
  }
)

export const getOrderDetails = createAsyncThunk('order/getOrderDetails', async(id)=>{
  
  axios.defaults.withCredentials=true
   const {data} = await axios.get(
    `http://localhost:3000/shop/order/details/${id}`,
   );
   return data;
 }
)

export const getAllOrdersByUser = createAsyncThunk('order/getAllOrdersByUser', async(userId)=>{
  
   axios.defaults.withCredentials=true
   const {data} = await axios.get(`http://localhost:3000/shop/order/list/${userId}`,
   );
   return data;
 }
)



const orderSlice = createSlice({
    name:'order',
    initialState,
    reducers:{
      resetOrderDetails:(state)=>{ state.orderDetail = null}
    },
    extraReducers:
        (builder)=>{
            builder
            .addCase(createNewOrder.pending,(state)=>{ state.isLoading = true})
            .addCase(createNewOrder.fulfilled,(state,{payload})=>{
                state.isLoading = false;
                state.approvalUrl = payload.approvalUrl
                state.orderId = payload.orderId
                sessionStorage.setItem('currentOrderId', JSON.stringify(payload.orderId))
                })
            .addCase(createNewOrder.rejected,(state)=>{
                state.isLoading=false
                state.approvalUrl = null
                state.orderId = null
            
            })


            .addCase(getAllOrdersByUser.pending,(state)=>{ state.isLoading = true})
            .addCase(getAllOrdersByUser.fulfilled,(state,{payload})=>{
              state.isLoading = false;
              state.orderList = payload?.data
            
            })
            .addCase(getAllOrdersByUser.rejected,(state)=>{
              state.isLoading = false;
              state.orderList = []
            })



            .addCase(getOrderDetails.pending,(state)=>{ state.isLoading = true})
            .addCase(getOrderDetails.fulfilled,(state,{payload})=>{
              state.isLoading = false;
              state.orderDetail = payload?.data
            
            })
            .addCase(getOrderDetails.rejected,(state)=>{
              state.isLoading = false;
              state.orderDetail = null
            })


        }
    
})



export const {resetOrderDetails} = orderSlice.actions
export default orderSlice.reducer