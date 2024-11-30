import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import { shopMenuItems } from '@/Generators/config'
import CartWrapper from '@/shop_pages/cartWrapper'
import { logoutUser } from '@/store/auth-store/authSlice'
import { fetchCartItems } from '@/store/shop/cart-slice'


import { Home, LogOut, Menu, ShoppingCart, UserCog } from 'lucide-react'

import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useLocation, useNavigate, useSearchParams } from 'react-router-dom'


function MenuItems  ()  {
    const location = useLocation()
    const navigate = useNavigate()
    const [serachParams, setSearchParams] = useSearchParams()

        function handleOnClick(item){
            
            sessionStorage.removeItem('filters')

           
            const currentFilter = item.id !== 'home'  && item.id !== 'product' && item.id !== 'search'? {category:[ item?.id]} :null
            sessionStorage.setItem('filters', JSON.stringify(currentFilter))
            location.pathname.includes('listing') && currentFilter != null ? setSearchParams( new URLSearchParams(`?category=${item?.id}`)):
            navigate(item?.path)
        }
    return <nav className='flex flex-col mb-3 lg:mb-0 lg:items-center gap-6 lg:flex-row'>
        {shopMenuItems.map(item=> <label
            onClick={()=>handleOnClick(item)}
            className='font-medium text-sm cursor-pointer' key={item?.id} >{item?.label}</label>)}
    </nav>
}

function HeaderRightContent(){
    const navigate = useNavigate()
    const dispatch = useDispatch()
    function onLogout (){
    dispatch(logoutUser())
    deleteCookie('token')
    }
    function deleteCookie(name, path = '/', domain = '') {
        // Construct the cookie string
        let cookieString = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=${path};`;
      
        if (domain) {
          cookieString += `domain=${domain};`;
        }
      
        // Set the cookie to expire
        document.cookie = cookieString;
      }

    const [isCartOpen, setIsCartOpen]= useState(false)
    const {cartItems} = useSelector(state => state?.cart)
    const {user}= useSelector(state=> state?.auth)



    useEffect(()=>{
        dispatch(fetchCartItems(user?.userId))
    },[dispatch])

    return <div className='flex lg:items-center lg:flex-row flex-col gap-4'>
                <Sheet open={isCartOpen} onOpenChange={setIsCartOpen}>
                <SheetTrigger asChild>
                <Button
                className='relative'
                onClick={()=>setIsCartOpen(true)}
                variant='outline' size='icon'>
                <ShoppingCart className='h-6 w-6'/>
                <span className='absolute top-[-5px] right-[-2px] text-sm font-bold'>{cartItems?.length || 0}</span>
                </Button>
                </SheetTrigger>

               
                    <CartWrapper cartItems={cartItems}/>
                
                </Sheet>
            
            
            
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Avatar className='cursor-pointer'>
                        <AvatarImage></AvatarImage>
                        <AvatarFallback>{user?.userName?.slice(0,2).toUpperCase()}</AvatarFallback>
                    </Avatar>
                </DropdownMenuTrigger>
                <DropdownMenuContent side='right' className='w-56 '>
                        <DropdownMenuLabel>Logged in as {user?.userName}</DropdownMenuLabel>
                        <DropdownMenuSeparator/>
                        <DropdownMenuItem
                         onClick={()=>navigate('account')}
                         className='cursor-pointer'>
                            <UserCog className='h-4 w-4'/>
                            <span>Account</span>
                        </DropdownMenuItem>
                        <DropdownMenuSeparator/>
                        <DropdownMenuItem
                        onClick={onLogout}
                        className='cursor-pointer' >
                            <LogOut/>
                            <span>Logout</span>
                        </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>

    </div>
}



function ShoppingViewHeader() {
const {isAuthenticated} = useSelector(state => state?.auth)


  return <header className='sticky top-0 z-40 w-full border-b bg-background'>
    <div className='flex h-16 items-center justify-between px-4 md:px-6'>
        <Link to='/shop' className='flex gap-2'>
        <Home className='h-6 w-6'/>
        <span className='font-bold'>ECommerce</span>
        </Link>
        <Sheet>
            <SheetTrigger asChild>
                <Button variant='outline' size='icon' className='lg:hidden'>
                    <Menu className='h-6 w-6'/>
                </Button>
            </SheetTrigger>
            <SheetContent side='left' className='w-full max-w-xs'>
            <MenuItems/>
            <HeaderRightContent/>
            </SheetContent>
        </Sheet>
        <div className='hidden lg:block '>
        <MenuItems/>
        </div>
        <div className='hidden lg:block'><HeaderRightContent/></div>
    </div>
    
  </header>
}

export default ShoppingViewHeader
