import CommonForm from '@/Common_form/common_form'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import React, { useEffect, useState } from 'react'
import { addressControls } from '@/Generators/config'
import { useDispatch, useSelector } from 'react-redux'
import { addAddress, editAddress, fetchAllAddress } from '@/store/shop/addressSlice/address-slice'
import AddressCard from './addressCard'
const initialData = {
    address:'',
    city:'',
    pincode:'',
    phone:'',
    note:''
}
function Address({setCurrentSelectedAddress,selectedId}) {
    const [formData, setFormData]=useState(initialData);
    const [ currentEditId , setCurrentEditId] = useState('')
    const dispatch = useDispatch()
    const {user} = useSelector(state => state.auth)
    const {addressList} = useSelector(state => state.address)
    function handleOnSubmit (e){
                e.preventDefault()
                currentEditId ? dispatch(editAddress({userId:user?.userId, addressId : currentEditId,formData}))
                .then(({payload})=>{
                    setFormData(initialData)
                    setCurrentEditId('')
                    if(payload?.success){
                        dispatch(fetchAllAddress(user?.userId))
                    }
                })
                :
                dispatch(addAddress({userId:user?.userId, ...formData})).then(({payload}) => {
                    if(payload?.success){
                        setFormData(initialData)
                        dispatch(fetchAllAddress(user?.userId))
                    }
                })
    }

    function handleEditAddress(address){
            setCurrentEditId(address._id)
            setFormData({...formData,
               address: address?.address,
               city: address?.city,
               pincode: address?.pincode,
               phone: address?.phone,
               note: address?.note
            })
    }

    const checkFormValidity = () =>{
        return Object.values(formData)
       .every(item => item)
         
      }

      useEffect(()=>{
        dispatch(fetchAllAddress(user?.userId))
      },[dispatch])
      
  return (
    <Card>
        <div className='mb-5 p-3 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2 '>
            {addressList && addressList.length >0 ? addressList.map(addressInfo=> <AddressCard
            selectedId={selectedId}
                handleEditAddress={handleEditAddress}
                setCurrentSelectedAddress={setCurrentSelectedAddress}
                setFormData={setFormData}
                addressInfo={addressInfo}/>) :null}
        </div>
        <CardHeader>
            <CardTitle>{currentEditId? "Edit Address" :"Add New Address"}</CardTitle>
        </CardHeader>

        <CardContent className='space-y-3'>
            <CommonForm 
    formControls={addressControls}
    formData={formData}
    setFormData = {setFormData}
    onSubmit={handleOnSubmit}
    buttonText={currentEditId? "Edit" :"Add"}
    isBtnDisabled={!checkFormValidity()} />
        </CardContent>
    </Card>
  )
}

export default Address
