import { Button } from '@/components/ui/button'


import puma from '../../src/assets/puma.png'
import nike from '../../src/assets/nike.png'
import adidas from '../../src/assets/adidas.png'
import zara from '../../src/assets/zara.png'
import handm from '../../src/assets/h&m.png'
import diesel from '../../src/assets/diesel.png'

import React, { useEffect, useState } from 'react'
import { ChevronLeft, ChevronRight, Footprints, Shirt, ShoppingBag, ToyBrick, Watch } from 'lucide-react'
import { Card, CardContent,} from '@/components/ui/card'
import { useDispatch, useSelector } from 'react-redux'
import { fetchAllFilteredProducts, fetchProductById } from '@/store/shop/product-slice'
import ShoppingProductTile from './shoppingProductTile'
import { useNavigate } from 'react-router-dom'
import { addToCart, fetchCartItems } from '@/store/shop/cart-slice'
import { getFeatureImages } from '@/store/common'
import ProductDetailsDialog from './ProductDialog'

const ShopByCategory = [
  {id: "men", label: "Men", icon:Shirt },
  {id: "women", label: "Women", icon:ShoppingBag },
  {id: "kids", label: "Kids", icon:ToyBrick },
  {id: "accessories", label: "Accessories", icon: Watch },
  {id: "footwear", label: "Footwear", icon: Footprints },
]


const shopByBrand =[
  {id: "nike", label: "Nike", icon: nike },
  {id: "adidas", label: "Adidas", icon: adidas },
  {id: "levi", label: "Levi's", icon:diesel },
  {id: "puma", label: "Puma",icon:puma },
  {id: "zara", label: "Zara" , icon:zara},
  {id: "h&m", label: "H&M", icon:handm },
]


function ShopHome() {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const [currentSlide , setCurrentSlide] = useState(0)
  const {productList, productDetails} = useSelector(state => state?.shopProducts)
  const {user} = useSelector(state => state.auth)
  const [openDialog, setOpenDialog] = useState(false)
  

  
  const { featureImageList } = useSelector((state) => state.common);


  function handleGetProductDetails (id){
    dispatch(fetchProductById(id))
}

  const handleAddToCart = (productId) =>{
  dispatch(addToCart({userId:user?.userId, productId, quantity:1})).then((data)=>{
          if(data?.payload?.success){
          dispatch(fetchCartItems(user?.userId))
          }})}

  const handleNavigateToCategory =(currentItem, section)=>{
      sessionStorage.removeItem('filters')
      const currentFilter = {[section]:[currentItem]}
      sessionStorage.setItem('filters', JSON.stringify(currentFilter))
      navigate('/shop/listing')
  }

  useEffect(()=>{
    if(productDetails !==null) setOpenDialog(true)
  },[productDetails])
  
  useEffect(()=>{
    const timer = setInterval(()=>{
      setCurrentSlide((prevSlide) => ((prevSlide+1)%featureImageList.length))
    },2000)
    return()=> clearInterval(timer)
  },[])

  useEffect(() => {
    dispatch(getFeatureImages());
  }, [dispatch]);



  useEffect(()=>{
    dispatch(fetchAllFilteredProducts({ filterParams:{}, sortParams:'price-lowtohigh' }))
  },[dispatch])

  return (
    <div className='flex flex-col min-h-screen'>
      <div className='relative w-full h-[600px] overflow-hidden'>
      {
        featureImageList && featureImageList.length>0? featureImageList.map((image, index)=><img 
        key={index}
        src={image?.image}
        className={`${index === currentSlide ? 'opacity-100' : 'opacity-0'} absolute top-0 left-0 w-full h-full object-cover  transition-opacity duration-1000`}
        />) :null
      }
      <Button variant='outline' size ='icon'
       onClick={()=>setCurrentSlide((prev)=> ((prev-1 +featureImageList.length)%featureImageList.length))}
       className='absolute top-1/2 text-white   transform -translate-y-1/2 bg-white/20 h-screen border-none'
      >
      <ChevronLeft className='w-4 h-4'/>
      </Button>
      <Button variant='outline' size ='icon'
      onClick={()=>setCurrentSlide((prev)=> ((prev+1)%featureImageList.length))}
      className='absolute top-1/2 right-0 text-white  transform -translate-y-1/2 bg-white/20 h-screen border-none'
      >
      <ChevronRight className='w-4 h-4'/>
      </Button>
      </div>
      <section className='py-12 bg-gray-50'>
        <div className='container mx-auto px-4'>
        <h2 className='text-center mb-8 text-3xl font-bold'>Shop by Category</h2>
        </div>
        <div className='grid grid-cols-2 lg:grid-cols-5 md:grid-cols-3 gap-4'>
            {
              ShopByCategory && ShopByCategory.length > 0 ? ShopByCategory.map( item =>
              <Card
              onClick ={()=> handleNavigateToCategory(item?.id,"category")}
              className='cursor-pointer hover:shadow-lg transition-shadow'>
                <CardContent className='flex flex-col items-center justify-center p-6'>
                <item.icon className='h-20 w-20'/>
                <span className='font-bold text-xl text-center'>{item?.label}</span>
                </CardContent>    
              </Card>) :null
            }
        </div>
      </section>

      <section className='py-12 bg-gray-50'>
        <div className='container mx-auto px-4'>
        <h2 className='text-center mb-8 text-3xl font-bold'>Shop by Brand</h2>
        </div>
        <div className='grid grid-cols-2 lg:grid-cols-5 md:grid-cols-3 gap-4'>
            {
              shopByBrand && shopByBrand.length > 0 ? shopByBrand.map( item =>
              <Card
              onClick ={()=> handleNavigateToCategory(item?.id, "brand")}
              className='cursor-pointer hover:shadow-lg transition-shadow'>
                <CardContent className='flex flex-col items-center justify-center p-6'>
                <img src={item?.icon} alt={item?.id} className='h-20 w-20'/>
                <span className='font-bold text-xl text-center'>{item?.label}</span>
                </CardContent>    
              </Card>) :null
            }
        </div>
      </section>


      <section>
      <div className='container mx-auto px-4 mt-2'>
        <h2 className='text-center mb-8 text-3xl font-bold'>Featured products</h2>
        </div>
        <div className='grid grid-cols-2 lg:grid-cols-4 md:grid-cols-3 gap-6 px-4'>
          {
            productList && productList.length >0 ? productList.map(product=>
            <ShoppingProductTile
            product={product}
            handleGetProductDetails={handleGetProductDetails}
            handleAddToCart={handleAddToCart}
            />):null
          }
        </div>
      </section>
      <ProductDetailsDialog open={openDialog} setOpen={()=>setOpenDialog(false)} productDetails={productDetails}/>
    </div>
  )
}

export default ShopHome
