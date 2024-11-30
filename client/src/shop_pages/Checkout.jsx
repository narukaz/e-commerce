import React, { useState } from "react";
import image from "../assets/image1.jpg";
import Address from "./Address";
import { useDispatch, useSelector } from "react-redux";
import CartItemContent from "./cartItemContent";
import { Button } from "@/components/ui/button";
import { createNewOrder } from "@/store/shop/order/order-slice";
import { useNavigate } from "react-router-dom";

function Checkout() {
  const { cartItems } = useSelector((state) => state?.cart);
  const { cartId } = useSelector((state) => state?.cart);
  const {user} = useSelector(state => state?.auth)
  const [currentSelectedAddress ,setCurrentSelectedAddress] =useState(null)
  const [isPaymentStart, setIsPaymentStart] = useState(false)
  const {approvalUrl} = useSelector(state=> state.shopOrder)
  const navigate = useNavigate()
  const dispatch = useDispatch()
  
  const totalCartItem =
    cartItems && cartItems.length > 0
      ? cartItems.reduce((sum, item) => {
          if (item?.salePrice > 0) {
            return (sum += item?.salePrice * item?.quantity);
          }
          sum += item?.price * item?.quantity;
        }, 0)
      : null;

  function handleInitiatePaypalPayment() {

    if(cartItems.length<1){
      console.log('Your cart is empty , please add items to proceed')
      return
    }

    if(currentSelectedAddress ==  null){
      console.log('please select one address to proceed')
      return;
    }
    console.log("cart id" , cartId)
    const orderData = {
      userId:user?.userId,
      cartId:cartId,
      cartItems:cartItems.map(item=>({
        productId:item?.productId,
        title: item?.title,
        image:item?.imageUrl,
        price:item?.salePrice >0 ? item?.salePrice : item?.price,
        quantity:item?.quantity
      })),
      addressInfo:{
        addressId:currentSelectedAddress?._id,
        address:currentSelectedAddress?.address,
        city:currentSelectedAddress?.city,
        pincode:currentSelectedAddress?.pincode,
        phone:currentSelectedAddress?.phone,
        note:currentSelectedAddress?.note
      },
      orderStatus : 'pending',
      paymentMethod:'paypal',
      paymentStatus:'pending',
      totalAmount:totalCartItem,
      orderDate:new Date(),
      orderUpdateDate : new Date(),
      paymentId:'',
      PayerId:'',
    };

    dispatch(createNewOrder(orderData)).then(({payload})=>{
      if(payload?.success){
        setIsPaymentStart(true)
      }else{
        setIsPaymentStart(false)
      }
      if(payload?.approvalUrl){
        console.log("approvalUrl", approvalUrl)
        window.location.href = payload?.approvalUrl
      }
    }) 

   
  }

  return (
    <div className="flex flex-col">
      <div className="relative h-[300px] w-full overflow-hidden">
        <img src={image} className="h-full w-full object-cover object-center" />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-5 p-5">
        <Address setCurrentSelectedAddress={setCurrentSelectedAddress} selectedId={currentSelectedAddress} />
        <div className="flex flex-col gap-4 p-5">
          {cartItems && cartItems.length > 0
            ? cartItems.map((item) => <CartItemContent item={item} />)
            : null}
          <div className="mt-8 space-y-4">
            <div className="flex items-center justify-between">
              <span className="font-bold">total price</span>
              <span className="font-bold">${totalCartItem}</span>
            </div>
          </div>
          <Button onClick={handleInitiatePaypalPayment} className="w-full">
            {isPaymentStart  ? '...processing' : `Checkout with paypal`}
          </Button>
        </div>
      </div>
    </div>
  );
}

export default Checkout;
