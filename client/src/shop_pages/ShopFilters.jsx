import { Checkbox } from '@/components/ui/checkbox'
import { Label } from '@/components/ui/label'
import { Separator } from '@/components/ui/separator'
import { filterOptions } from '@/Generators/config'
import React from 'react'

function ShopFilters({handleFilters, filters}) {
  return (
    <div className='bg-background rounded-lg shadow-sm'>
            <div className='p-4 border-b'>
                <h2 className='text-lg font-semibold'>Filters</h2>
            </div>
            <div className='p-4 space-y-4'>
                {
                    Object.keys(filterOptions).map(option=>
                        <>
                        <div className='text-base font-bold'>{option}</div>
                        <div className='grid gap-2 mt-2'>
                                {
                                    filterOptions[option].map(item=><Label className='flex items-center gap-2 font-medium'>
                                        
                                        <Checkbox
                                        checked={
                                            filters && Object.keys(filters).length > 0 &&
                                            filters[option] && filters[option].indexOf(item.id) > -1
                                        }
                                        onCheckedChange={()=>{
                                            handleFilters(option , item.id)
                                        }}
                                        value={item?.id} o/>
                                        {item?.label}
                                    </Label>)
                                }
                        </div>
                        <Separator/>
                        </>
                    )
                }
            </div>
    </div>
  )
}

export default ShopFilters
 