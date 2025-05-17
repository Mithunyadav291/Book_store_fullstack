import { X } from 'lucide-react'
import React from 'react'

const SeeUserData = ({userDivData, userDiv, setUserDiv}) => {
  return (
    <>
    <div className={`${userDiv} inset-0 backdrop-blur-sm bg-zinc-800 top-0 left-0 h-screen w-full  opacity-90 flex justify-center items-center z-50`}>
        <div className='bg-white w-[80%] h-auto rounded-2xl flex flex-col items-center justify-center p-4 text-zinc-800 shadow-lime- font-serif relative'>
        
            <h1 className='text-2xl font-serif mb-2 border-b-1 w-full text-center'>User Information</h1>
           
            <button onClick={()=>setUserDiv("hidden")} className='hover:bg-red-500 p-3 rounded absolute top-0 right-0'><X/></button>
            <h1 className='text-xl'>Username:{userDivData.username}</h1>
            <h1 className='text-xl'>Email:{userDivData.email}</h1>
            <h1 className='text-xl'>Address:{userDivData.address}</h1>
       
        </div>
    </div>
    </>
  )
}

export default SeeUserData