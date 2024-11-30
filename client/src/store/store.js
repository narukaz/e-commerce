import { configureStore } from "@reduxjs/toolkit" ;
import authSlice from "./auth-store/authSlice";
import AdminProductSlice from './admin/products-slice/product-slice'
import shopProductSlice from './shop/product-slice/index.js'
import cartReducer from './shop/cart-slice/index.js'
import addressSlice from "./shop/addressSlice/address-slice";
import shopOrderSlice from './shop/order/order-slice'
import adminOrderSlice from './admin/order-slice/index.js'
import shopSearchSlice from './shop/search-slice.js'
import productReview from "./shop/reviewSlice";
import commonSlice from "./common";


const store = configureStore({
    reducer:{

        auth: authSlice,
        adminProduct: AdminProductSlice,
        shopProducts: shopProductSlice,
        cart: cartReducer,
        address: addressSlice,
        shopOrder: shopOrderSlice,
        adminOrder:adminOrderSlice,
        searchSlice:shopSearchSlice,
        review:productReview,
        common:commonSlice
    }
})

export default store