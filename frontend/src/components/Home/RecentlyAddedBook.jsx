import React, { useEffect, useState } from 'react'
import BookCard from '../BookCard/BookCard'
import axios from 'axios'
import { Divide } from 'lucide-react';
import Loader from '../Loader/Loader';

const RecentlyAddedBook = () => {
    const [Data, setData] = useState();

    useEffect(() => {
       const fetch= async ()=>{
        const response=await axios.get("http://localhost:3000/api/book/getrecentbook")
       setData(response.data.data)
    }

       fetch();
    }, []);

  return (

    <div className='mt-8 px-4 '>
        <h4 className='text-3xl text-yellow-100'>Recently Added Books</h4>
        {!Data && 
        <div className='flex justify-center items-center mt-20' >
             <Loader/>
        </div>}

        <div className='my-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4'>
            {Data && Data.map((item,i)=>(
                <div key={i}>
                    <BookCard item={item}/>
                </div>
            ))}
        </div>
    </div>
  )
}

export default RecentlyAddedBook