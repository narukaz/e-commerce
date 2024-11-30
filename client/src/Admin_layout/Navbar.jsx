import { AdminNavigationButtons } from '@/Generators/config'
import React from 'react'
import { useLocation, useNavigate } from 'react-router-dom'



function Navbar({setOpen}) {
    const navigate = useNavigate()
    const location = useLocation()
  return (
    <nav className='flex gap-4 '>
     {AdminNavigationButtons.map(navigationItem =>
     <h1 onClick={()=>{
        navigate(navigationItem.path)
        setOpen(false)
    
    }}
     className={`text-xl text-extrabold cursor-pointer ${location?.pathname?.includes(navigationItem.path) ?
     'text-foreground' : "text-muted-foreground"  } hover:text-foreground`}>{navigationItem.label}</h1>)}
    </nav>
  )
}




export default Navbar
