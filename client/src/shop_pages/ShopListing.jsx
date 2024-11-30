import React, { useEffect, useState } from 'react'
import ShopFilters from './ShopFilters'
import { DropdownMenu, DropdownMenuContent, DropdownMenuRadioGroup, DropdownMenuRadioItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { Button } from '@/components/ui/button'
import { ArrowDownIcon} from 'lucide-react'
import { sortOptions } from '@/Generators/config'
import { useDispatch, useSelector } from 'react-redux'
import { fetchAllFilteredProducts, fetchProductById } from '@/store/shop/product-slice'
import ShoppingProductTile from './shoppingProductTile'
import { useSearchParams } from 'react-router-dom'
import ProductDetailsDialog from './ProductDialog'
import { addToCart, fetchCartItems } from '@/store/shop/cart-slice'


function ShopListing() {
  const dispatch = useDispatch()
  const {productList, productDetails}= useSelector(state => state.shopProducts)
  const {cartItems} = useSelector(state => state.cart)
  const {user}= useSelector(state => state?.auth)
  const [searchParams, setSearchParams] = useSearchParams()
  const [filters, setFilters] = useState({})
  const [sort , setSort] = useState(null)
  const [openDialog, setOpenDialog] = useState(false)


  const categorySearchParams = searchParams.get('category')

  const handleSort =(value)=>{
        setSort(value)
  }
  const handleFilters =(getSectionId, getCurrentOption)=>{
    let cpyFilters = {...filters}
    
    const indexOfCurrentSelection = Object.keys(cpyFilters).indexOf(getSectionId)
    
    if(indexOfCurrentSelection == -1) {
     cpyFilters = { ...cpyFilters,
                [getSectionId]:[getCurrentOption]
      }
    }
    else{
      const currentOptionIndex = cpyFilters[getSectionId].indexOf(getCurrentOption)
      if(currentOptionIndex == -1){
        cpyFilters[getSectionId].push(getCurrentOption)
        
      }else{
        cpyFilters[getSectionId].splice(currentOptionIndex, 1)
      }
    }

      setFilters(cpyFilters)
      sessionStorage.setItem('filters', JSON.stringify(cpyFilters))
  }

  function createSerachParams(){
   const queryParmas =[]
    for(const key of Object.keys(filters)){
      const value = filters[key]
       if(value.length>0){
       queryParmas.push(`${key}=${encodeURIComponent(value.join(','))}`)
       }
       
    }
    return queryParmas.join('&')
  }

  function handleGetProductDetails (id){
        dispatch(fetchProductById(id))
  }

  const handleAddToCart = (productId, getTotalstock) =>{
        let getCartItems = cartItems || []
        if(getCartItems.length){

            const indexOfCuurentItem = getCartItems.findIndex(item => item.productId === productId)
            if(indexOfCuurentItem >-1){
              const getQuantity = getCartItems[indexOfCuurentItem].quantity;

              if(getQuantity +1 > getTotalstock){
                  return;
              }
            }
            
        }


    dispatch(addToCart({userId:user?.userId, productId, quantity:1})).then((data)=>{
      if(data?.payload?.success){
        dispatch(fetchCartItems(user?.userId))
      }
    }
    )

  }





useEffect(()=>{
  if(productDetails !==null) setOpenDialog(true)
},[productDetails])


useEffect(()=>{
    setSort('price-lowtohigh')
    setFilters(JSON.parse(sessionStorage.getItem('filters')))
  }, [categorySearchParams])

useEffect(()=>{
    dispatch(fetchAllFilteredProducts({filterParams:filters, sortParams:sort}))
},[dispatch,sort,filters])

useEffect(()=>{
    if(filters && Object.keys(filters).length >0 ){
      const createQueryString = createSerachParams(filters)
      setSearchParams( new URLSearchParams(createQueryString))
    }
}, [filters,sort])

  return (
    <div className='grid grid-cols-1 md:grid-cols-[300px_1fr] gap-4'>
      <ShopFilters filters={filters} handleFilters={handleFilters}/>
      <div className='bg-background w-full rounded-lg shadow-sm'>
            <div className='p-4 border-b flex items-center justify-between'>
                  <h2 className='text-lg font-extrabold'>All Products</h2>
                  <div className='flex items-center gap-3'>
                    <span className='text-muted-foreground'>{productList?.length} products</span>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant='outline' size ='sm' className='flex items-center'>
                          <ArrowDownIcon className='h-5 w-5'/>
                          Sort By
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align='end' className='w-[200px]'>
                            <DropdownMenuRadioGroup value={sort} onValueChange={handleSort}>
                              {
                                sortOptions.map(option=> <DropdownMenuRadioItem
                                  key={option?.id}
                                  value={option?.id}>{option?.label}</DropdownMenuRadioItem>)
                              }
                            </DropdownMenuRadioGroup>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
            </div>

            {/* product tile implementation */}
            <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 p-2'>
                                {
                                  productList && productList.length >0 ? 
                                  productList.map(product => <ShoppingProductTile
                                    handleAddToCart={handleAddToCart}
                                    handleGetProductDetails={handleGetProductDetails}
                                    key={product._id} product={product}/> ) : null
                                }
            </div>
      </div>
      <ProductDetailsDialog open={openDialog} setOpen={()=>setOpenDialog(false)} productDetails={productDetails}/>
    </div>
  )
}

export default ShopListing
