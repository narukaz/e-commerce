import React, { useState } from 'react'
import image from '../../src/assets/image1.jpg'
import { TabsList,Tabs, TabsContent, TabsTrigger } from '@/components/ui/tabs'
import Address from './Address'
import ShoppingOrders from './ShoppingOrders'
function AccountShop() {

 

  return (
    <div className='felx flex-col'>
      <div className='relative h-[300px] w-full overflow-hidden'>
        <img
        src={image}
        className='h-full w-full object-cover object-center'
        />
        
      </div>
      <div className='container mx-auto grid grid-cols-1 py-8 gap-8'>
          <div className='flex flex-col rounded-lg border bg-background p-6 shadow-sm'>
            <Tabs defaultValue='orders'>
                  <TabsList>
                      <TabsTrigger value='orders'>Orders</TabsTrigger>
                      <TabsTrigger value='address'>Address</TabsTrigger>
                  </TabsList>

                  <TabsContent value='orders'>
                    <ShoppingOrders/>
                  </TabsContent>

                  <TabsContent value='address'>
                   <Address/>
                  </TabsContent>
            </Tabs>
          </div>
        </div>
    </div>
  )
}

export default AccountShop
