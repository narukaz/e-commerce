import { configureStore } from "@reduxjs/toolkit";
import authReducer from './auth-slice'
import adminProdcutSlice from "./admin/product-slice";

const store = configureStore({
            reducer:{
                auth:authReducer,
                adminProducts: adminProdcutSlice,
            },
           
})

export default store