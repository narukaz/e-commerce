import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet'
import { AdminNavigationButtons } from '@/Generators/config'
import React from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

function AdminSideBar({isOpenSidebar ,setIsOpenSidebar}) {
    const navigate = useNavigate()
    const location = useLocation()
  return (
        <Sheet open={isOpenSidebar} onOpenChange={setIsOpenSidebar}>
           <SheetContent side='left'>
           <SheetHeader className="border-b">
              <SheetTitle className="flex gap-2 mt-5 mb-5">
                <h1 className="text-2xl font-extrabold">Admin Panel</h1>
              </SheetTitle>
            </SheetHeader>
           <nav>
           {AdminNavigationButtons.map(navigationItem =>
            <h1
            onClick={()=>{
            navigate(navigationItem.path)
            setIsOpenSidebar(false)
    
             }}
            className={`text-xl text-extrabold cursor-pointer ${location?.pathname?.includes(navigationItem.path) ?
            'text-foreground' : "text-muted-foreground"  } hover:text-foreground`}>{navigationItem.label}</h1>)}
           </nav>
            </SheetContent> 
        </Sheet>
  )
}

export default AdminSideBar
