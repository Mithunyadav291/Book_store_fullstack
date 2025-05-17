import axios from 'axios';
import React, { useEffect, useState } from 'react'
import BookCard from '../BookCard/BookCard';

const Favourites = () => {
  const [favouriteBooks,setFavouriteBooks]=useState([])

  const fetch= async ()=>{
    const response=await axios.get(`https://book-store-fullstack-mithun.onrender.com/api/favourite/getfavouritebook`,
     { withCredentials: true }
    )
   setFavouriteBooks(response.data.data)

   }

  useEffect(() => {
    fetch();
 }, []);
 
  return (
   <>
   <h1 className='bg-zinc-800 p-4 m-4 text-2xl w-fit rounded-2xl'>Your Favourites Book</h1>
   {favouriteBooks.length === 0 && (
      <div className='m-6 text-2xl text-center'>No favourite Book</div>
    )}
    <div className='mx-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4'>
    
      {favouriteBooks && favouriteBooks.map((item,i)=>(
        <div key={i}>
        <BookCard item={item} favourite={true} onUpdate={fetch}/>
        </div>
      ))}
    </div>
   </>
  )
}

export default Favourites