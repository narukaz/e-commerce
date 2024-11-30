import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter, CardTitle } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { deleteAddress, fetchAllAddress } from '@/store/shop/addressSlice/address-slice'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'

function AddressCard({addressInfo,handleEditAddress,setCurrentSelectedAddress, selectedId}) {
  const dispatch = useDispatch()
  const {user} = useSelector(state => state.auth)

  const handleDelete =(addressId)=>{
      dispatch(deleteAddress({addressId:addressId, userId:user?.userId})).then(({payload})=>{
      if(payload?.success){
        dispatch(fetchAllAddress(user?.userId))
      }})}
  
  return (
    <Card onClick={setCurrentSelectedAddress ? ()=> setCurrentSelectedAddress(addressInfo) :null}
    className={`p-4 cursor-pointer ${selectedId._id == addressInfo?._id ? 'border-black': ''}`}>
        <CardTitle>
            <p className='font-bold text-xl'>{addressInfo?.city}</p>
        </CardTitle>
        <Separator className='my-3'/>
        <CardContent className='text-start p-0 '>
            <label><p className='font-bold'>Address:</p>{addressInfo?.address}</label>
            <label><p className='font-bold'>City:</p>{addressInfo?.city}</label>
            <label><p className='font-bold'>Pincode:</p>{addressInfo?.pincode}</label>
            <label><p className='font-bold'>Phone:</p>{addressInfo?.phone}</label>
            <label><p className='font-bold'>Note:</p>{addressInfo?.note}</label>
        </CardContent>
        <CardFooter className='p-0'>
          <div className='flex w-full justify-around'>
          <Button
          onClick={()=>handleEditAddress(addressInfo)}
          className='cursor-pointer'>Edit</Button>
          <Button
          onClick={()=>handleDelete(addressInfo._id)}
          className='cursor-pointer'>Remove</Button>
          </div>
        </CardFooter>
    </Card>
  )
}

export default AddressCard
