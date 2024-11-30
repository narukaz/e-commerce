import { useEffect, useState } from 'react'
import { Route,  Routes } from 'react-router-dom'
import CheckAuth from './Check_AuthPage/auth'
import Authlayout from './Auth_Layout/layout'
import AuthRegister from './Auth_pages/register'
import AuthLogin from './Auth_pages/login'
import ShopLayout from './shop_layout/shop_layout'
import AdminLayout from './Admin_layout/Admin_layout'
import PageNotFound from './pageNotFound/PageNotFound'
import AdminDashboard from './Admin_pages/AdminDashboard'
import AdminOrders from './Admin_pages/AdminOrders'
import AdminProducts from './Admin_pages/AdminProducts'
import { useDispatch, useSelector } from 'react-redux'
import { getUser } from './store/auth-store/authSlice'
import ShopListing from './shop_pages/ShopListing'
import ShopHome from './shop_pages/ShopHome'
import AccountShop from './shop_pages/Account'
import Checkout from './shop_pages/Checkout'
import PaypalReturnPage from './shop_pages/paypal-return'
import PaypalCancelPage from './shop_pages/paypal-cancel'
import UnAuthPage from './unAuthPage'
import PaymentSucess from './shop_pages/paymentSuccess'
import Search from './shop_pages/Search'

function App() {
  
  const {user}= useSelector(state => state?.auth);
  const dispatch = useDispatch()
  const {isAuthenticated}= useSelector(state => state?.auth);
  
 
  useEffect(()=>{
   dispatch(getUser())
   

  }, [dispatch])

  
  return (
   <Routes>
     <Route path='/' element={<CheckAuth user={user} isAuthenticated={isAuthenticated}></CheckAuth>}></Route>
    <Route path='/auth' element={<CheckAuth user={user} isAuthenticated={isAuthenticated}><Authlayout/></CheckAuth>}>

                <Route index element={<AuthLogin/>}/>
                <Route path='signIn' element={<AuthLogin/>}/>
                <Route path='register' element={<AuthRegister/>}/>

    </Route>

    <Route path='/shop' element={<CheckAuth  user={user} isAuthenticated={isAuthenticated}><ShopLayout/></CheckAuth>}>

    <Route index element={<ShopHome/>}/>
    <Route path='listing' element={<ShopListing/>}/>
    <Route path='checkout' element={<Checkout/>}/>
    <Route path='account' element={<AccountShop/>}/>
    <Route path='paypal-return' element={<PaypalReturnPage/>}/>
    <Route path='paypal-cancel' element={<PaypalCancelPage/>}/>
    <Route path='payment-success' element={<PaymentSucess/>}/>
    <Route path='search' element={<Search/>}/>

    </Route>
    
    <Route path='/admin' element={<CheckAuth  user={user} isAuthenticated={isAuthenticated}><AdminLayout/></CheckAuth>}>
    <Route index element={<AdminDashboard/>}/>
    <Route path='dashboard' element={<AdminDashboard/>}/>
    <Route path='products' element={<AdminProducts/>}/>
    <Route path='orders' element={<AdminOrders/>}/>
    </Route>

    <Route path='/unauth-page' element ={<UnAuthPage/>}/>
    <Route path='*' element ={<PageNotFound/>}/>
   </Routes>
  )
}

export default App
