import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { getSearchResults, resetSearchResults } from "@/store/shop/search-slice";

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import ShoppingProductTile from "./shoppingProductTile";
import { addToCart, fetchCartItems } from "@/store/shop/cart-slice";
import { fetchProductById } from "@/store/shop/product-slice";
import ProductDetailsDialog from "./ProductDialog";

function Search() {
  const [keyword, setKeyword] = useState("");
  const dispatch = useDispatch();
  const [searchparams, setSearchParams] = useSearchParams();
  const { searchResults } = useSelector((state) => state?.searchSlice);
  const { cartItems } = useSelector((state) => state?.cart);
  const { user } = useSelector((state) => state?.auth);
  const [openDialog, setOpenDialog] = useState(false)
  const {productDetails}= useSelector(state => state?.shopProducts)


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
  }})}

  function handleGetProductDetails (id){
    dispatch(fetchProductById(id))
}

useEffect(()=>{
  if(productDetails !==null) setOpenDialog(true)
},[productDetails])


  useEffect(() => {
    if (keyword && keyword.trim("") !== "" && keyword.trim().length > 3) {
      setTimeout(() => {
        setSearchParams(new URLSearchParams(`?keyword=${keyword}`));
        dispatch(getSearchResults(keyword));
      }, 1000);
    }else{
      setSearchParams(new URLSearchParams(`?keyword=${keyword}`));
      dispatch(resetSearchResults());
    }
  }, [keyword]);



  return (
    <div className="container mx-auto md:px-6 px-4 py-8">
      <div className="flex justify-center mb-8">
        <div className="w-full flex items-center">
          <Input
            name="keyword"
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            className="py-6"
            placeholder="search product..."
          />
          {/* <Button>Search</Button> */}
        </div>
      </div>
      {
        !searchResults.length ? <h1 className="text-xl font-extrabold">No results found!</h1> : null
      }
      <div className="grid grid-cols-2 sm:griid-cols-2 lg:grid-cols-4 gap-5">

        {
          
          searchResults.map(item => <ShoppingProductTile
            product={item}
            handleGetProductDetails={handleGetProductDetails}
            handleAddToCart={handleAddToCart}
            />) 

        }
      </div>
      <ProductDetailsDialog open={openDialog} setOpen={setOpenDialog} productDetails={productDetails}/>
    </div>
  );
}

export default Search;
