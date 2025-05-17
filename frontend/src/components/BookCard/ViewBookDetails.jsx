import axios from 'axios';
import React, { useEffect, useState } from 'react'
import {Link, useNavigate, useParams} from 'react-router-dom'
import Loader from '../Loader/Loader';
import  {GrLanguage} from 'react-icons/gr'
import { FaEdit, FaHeart, FaShoppingCart, FaTrash } from 'react-icons/fa';
import {useSelector} from 'react-redux'
import toast from 'react-hot-toast';
import { Check, X } from 'lucide-react';

const ViewBookDetails = () => {
  const [favourite, setFavourite] = useState(false);
  const [addedCart, setAddedCart] = useState(false);
  const [openDeletePopup,setOpenDeletePopup]=useState(false)

  const {id} =useParams();
  const navigate=useNavigate()

  const isLoggedIn=useSelector((state)=>state.auth.isLoggedIn)
  const role=useSelector((state)=>state.auth.role)
 
  const [Data, setData] = useState();
  useEffect(() => {
    const fetch= async ()=>{
     const response=await axios.get(`http://localhost:3000/api/book/getbookbyid/${id}`,
      { withCredentials: true }
     )
    setData(response.data.data)

     // Check if this book is favourite (only if user)
     if (isLoggedIn && role === "user") {
      const favResponse = await axios.get(`http://localhost:3000/api/favourite/checkfav/${id}`, {
        withCredentials: true
      });
      const cartResponse = await axios.get(`http://localhost:3000/api/cart/checkCart/${id}`, {
        withCredentials: true
      });
      setFavourite(favResponse.data.isFavourite);
      setAddedCart(cartResponse.data.isCart);
    }
    
    }

    fetch();
 }, [id,isLoggedIn,role]);
 

  const handleFavourites=async ()=>{
    const response=await axios.put(`http://localhost:3000/api/favourite/addfavbook/${id}`,{})
    setFavourite(!favourite)
   
    toast.success(response.data.message)
  }
  const handleCart=async ()=>{
    const response=await axios.put(`http://localhost:3000/api/cart/addtocart/${id}`,{})
    setAddedCart(!addedCart)
   
    toast.success(response.data.message)
  }

  const handleDeleteBook=async()=>{
    try {
      const response=await axios.delete(`http://localhost:3000/api/book/deleteBook/${id}`)
      toast.success(response.data.message)
      // console.log(response.data)
      navigate("/allbooks")
    } catch (error) {
      toast.error(error.response.data.message)
    }
  }

  return (
   <>
    
     {Data && (
      <div className=' px-8 md:px-12 py-8 bg-zinc-900 flex flex-col sm:flex-row gap-8'>
      <div className='bg-zinc-800 rounded-2xl p-4  h-[85vh] w-full sm:w-1/2 flex flex-col md:flex-row justify-around'>
        <img src={Data.url} alt={Data.title} className=' h-[65vh]  md:w-[70%] lg:w-auto mt-6 object-contain' />
        {isLoggedIn && role==="user" && (
           <div className='flex flex-row md:flex-col mt-6 gap-6 justify-between md:justify-start'>
           <button className={`bg-blue-500 rounded-full text-l md:text-3xl p-2  flex justify-center items-center ${favourite ? 'text-red-500':'text-white'}`}
           onClick={handleFavourites}><FaHeart/>
           <span className='ms-1 md:hidden'>Favourites</span></button>
           <button className={`bg-blue-500 rounded-full text-l md:text-3xl p-2  flex justify-center items-center ${addedCart ? 'text-red-500':'text-white'}`}
           onClick={handleCart}><FaShoppingCart/>
           <span className='ms-1 md:hidden'>{addedCart ?"Added to cart":"Add to cart"}</span></button>
         </div>
        )}
        {isLoggedIn && role==="admin" && (
           <div className='flex flex-row md:flex-col mt-6 gap-6 justify-between md:justify-start'>
           <Link to={`/updatebook/${Data._id}`} className='bg-blue-500 text-white rounded-full text-l md:text-3xl p-2 flex justify-center items-center'><FaEdit/>
           <span className='ms-1 md:hidden'>Edit Book</span></Link>
           <button className='bg-white text-red-500 rounded-full text-l md:text-3xl p-2  flex justify-center items-center'
           onClick={()=>setOpenDeletePopup(true)}><FaTrash/>
           <span className='ms-1 md:hidden'>Delete Book</span></button>
         </div>
        )}

      </div>
      <div className='p-4 w-full sm:w-1/2 '>
         <h1 className='text-4xl text-zinc-300 font-semibold'> {Data.title}</h1>
         <p className='text-zinc-400 mt-2'>by {Data.author}</p>
         <p className='text-zinc-400 mt-4 text-xl'>{Data.desc}</p>
         <p className='text-zinc-400 mt-1 flex items-center '>
          <GrLanguage  className='mr-2'/>  {Data.language}</p>
          <p className='text-zinc-400 mt-4 text-3xl font-semibold'>
           Price:Rs. {Data.price}</p>
      </div>
    </div>
     )}

  {!Data && 
        <div className='flex bg-zinc-900  justify-center items-center h-[85vh]' >
             <Loader/>
        </div>}

    {/* Delete book popup */}
    {openDeletePopup && (
       <div className='fixed inset-0 backdrop-blur-sm  bg-opacity-60 flex justify-center items-center z-50'>
       <div className='bg-zinc-800 p-6 rounded-lg w-[90%] max-w-md border-2 border-zinc-700'>
         <h2 className='text-xl font-semibold text-white mb-4'>
           Confirm Delete ?
          </h2>
          <p className='text-white'> Are you sure you want to delete the book {Data.title}?</p>
          <div className='flex justify-between mt-6'>
                  <button
                    onClick={()=>setOpenDeletePopup(false)}
                    className='px-4 py-2 bg-red-600 hover:bg-red-700 rounded-md text-white flex items-center gap-1'
                  >
                    <X size={16} />
                    Cancel
                  </button>
                  <button
                    onClick={handleDeleteBook}
                    className='px-4 py-2 bg-green-600 hover:bg-green-700 rounded-md text-white flex items-center gap-1 disabled:opacity-50'
                   
                  >
                    <Check size={16} />
                    Confirm
                  </button>
                </div>
         </div>
       </div>
      )} 
    
   </>
  )
}

export default ViewBookDetails
