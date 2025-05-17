import axios from "axios";
import { useEffect, useState } from "react";
import Loader from "../components/Loader/Loader";
import BookCard from "../components/BookCard/BookCard";


const AllBooks = () => {
    const [Data, setData] = useState();

    useEffect(() => {
       const fetch= async ()=>{
        const response=await axios.get("https://book-store-fullstack-mithun.onrender.com/api/book/getallbook")
       setData(response.data.data)
    }

       fetch();
    }, []);

  return (

    <div className='bg-zinc-900 px-4 md:px-12 py-8 min-h-screen'>
        <h4 className='text-3xl text-yellow-100'>All Books</h4>
        {!Data && 
        <div className='flex justify-center items-center mt-20' >
             <Loader/>
        </div>}
        {Data && Data.length===0 &&(
        <div className='h-screen'>
          <div className='h-full flex items-center justify-start flex-col'>
            <h1 className='my-8 text-4xl font-semibold text-zinc-400 '>No book is available now!</h1>
            <img src="/nobooks.png" alt="empty cart" />
          </div>
        </div>
      )}
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

export default AllBooks