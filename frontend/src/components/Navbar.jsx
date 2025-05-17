import React, { useState } from 'react'
import logoImg from "../assets/logo.png"
import { Link, useLocation } from 'react-router-dom'
import { Menu } from 'lucide-react'
import { useSelector } from 'react-redux'

const Navbar = () => {
    const [openSidebar, setOpenSidebar] = useState(false);
    const location=useLocation()

    const links=[
        {
            title:"Home",
            link:"/",
        },
        {
            title:"About Us",
            link:"/about",
        },
        {
            title:"All Books",
            link:"/allbooks",
        },
        {
            title:"Cart",
            link:"/cart",
        },
        {
            title:"Profile",
            link:"/profile",
        },
        {
            title:"Admin Profile",
            link:"/profile",
        },
    ]

    const isLoggedIn=useSelector((state)=>
        state.auth.isLoggedIn);
    const role=useSelector((state)=>
        state.auth.role);
    
    // console.log(isLoggedIn)

    if(isLoggedIn===false){
        links.splice(3,3) //remove last two elements from links array index 3 and 4
    }
    if(isLoggedIn===true && role==='user'){
        links.splice(5,1)
    }
    if(isLoggedIn===true && role==='admin'){
        links.splice(3,2)
    }
  return (
    <div className='relative flex bg-zinc-800 text-white px-8 py-3 items-center justify-between'>
        <Link to="/" className='flex items-center justify-center'>
            <img src={logoImg} alt="logo" className='h-12'/>
            <h1 className='text-2xl font-bold'>BookHeaven</h1>
        </Link>
        <div className='block md:flex items-center gap-4'>
           <div className='hidden  md:flex gap-4'>
           {links.map((item,i)=>(
                <Link key={i} to={item.link}
                className={`hover:text-zinc-500 transition-all duration-300
                 ${location.pathname===item.link ? "text-blue-500  font-bold":""}`}
                >{item.title}</Link>
            ))}
           </div>
            {isLoggedIn===false && (
                 <div className='hidden md:flex gap-4'>
                 <Link to="/login" className='px-2 py-1 rounded border border-blue-500 hover:bg-blue-500 transition-all duration-300'>Login</Link>
                 <Link to="/signup" className='px-2 py-1 bg-blue-500 rounded hover:bg-zinc-800 hover:border transition-all duration-300'>SignUp</Link>
                </div>
            )}

           {/* mobile navigation */}
           <button  onClick={()=>setOpenSidebar(!openSidebar)} className='md:hidden  hover:text-zinc-400'>
            <Menu size={35}/>
           </button>
        </div>
       
        {openSidebar && (
        <div className={`md:hidden bg-zinc-800 h-screen absolute top-16 rounded-2xl right-0 w-full sm:w-1/2 z-40
        flex flex-col justify-start items-center gap-8 
        transform ${
          openSidebar ? "translate-x-0" : "translate-x-full pointer-events-none"
        } transition-transform duration-1000 ease-in-out shadow-xl
         `}> 
       

          {links.map((item,i)=>(
                <Link onClick={()=>setOpenSidebar(!openSidebar)} key={i} to={item.link}
                className='hover:text-blue-500 text-xl transition-all duration-300'
                >{item.title}</Link>
            ))}
           
           {isLoggedIn===false && (
            <>
               <Link to="/login" onClick={()=>setOpenSidebar(!openSidebar)} className='px-2 py-1 rounded border border-blue-500 hover:bg-blue-500 transition-all duration-300'>Login</Link>
               <Link to="/signup" onClick={()=>setOpenSidebar(!openSidebar)} className='px-2 py-1 bg-blue-500 rounded hover:bg-zinc-800 hover:border transition-all duration-300'>SignUp</Link>
             </>
           )}
        </div> 
        )}
   
    </div>
  )
}

export default Navbar