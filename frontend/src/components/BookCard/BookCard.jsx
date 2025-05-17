import axios from 'axios'
import React from 'react'
import toast from 'react-hot-toast'

import { Link } from 'react-router-dom'

const BookCard = ({item,favourite,onUpdate}) => {
   
  const handleFavourites=async ()=>{
      const response=await axios.put(`https://book-store-fullstack-mithun.onrender.com/api/favourite/addfavbook/${item._id}`,{})
     toast.success(response.data.message)
      onUpdate()
    }

  
  return (
    <div className='bg-zinc-800 rounded'>
    <Link to={`/viewBookDetails/${item._id}`}>
    <div className='bg-zinc-800 rounded p-4 flex flex-col'>
        <div className='bg-zinc-900 flex items-center justify-center'>
           <img src={item.url} alt={item.name} className='h-[30vh]'/>
        </div>
        <h2 className='mt-2 text-zinc-500 text-2xl font-semibold'>{item.title}</h2>
        <p className='mt-2 text-zinc-400 font-semibold'>By {item.author}</p>
        <p className='mt-2 text-zinc-400 font-semibold'>NRS.{item.price}</p>
        
    </div>
    </Link>
    {favourite && (
      <button onClick={handleFavourites} className='bg-yellow-50 px-4 py-2 rounded border border-yellow-500 text-yellow-500 my-2 w-full'>Remove from favourite</button>
    )}
    </div>
  )
}

export default BookCard