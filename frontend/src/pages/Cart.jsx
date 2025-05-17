import React, { useEffect, useState } from 'react'
import Loader from '../components/Loader/Loader'
import axios from 'axios';
import { AiFillDelete } from 'react-icons/ai'
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
const Cart = () => {
  const [cart, setCart] = useState();
  const [totel,setTotel]=useState(0)
  const navigate=useNavigate()

  
  const fetch=async ()=>{
    const response= await axios.get("http://localhost:3000/api/cart/getcartbook",{withCredentials:true})
    setCart(response.data.data)
    // console.log(response.data.data)
   }
  useEffect(() => {
   fetch()
  }, []);

  const deleteItem=async (id)=>{
    const response=await axios.put(`http://localhost:3000/api/cart/addtocart/${id}`,{},{  // here addtocart is used to delete the item from cart
      withCredentials:true
    })
    fetch();
    toast.success(response.data.message)
  }

 useEffect(() => {
  if(cart && cart.length>0){
    let totel=0;
    cart.map((item)=>{
      totel +=item.price
    });
    setTotel(totel)
    totel=0
  }
 }, [cart]);

 const placeOrder=async()=>{
  try {
     const response=await axios.post("http://localhost:3000/api/order/placeorder",{order:cart},{withCredentials:true})
     toast.success(response.data.message)
     navigate("/profile/orderHistory")
  } catch (error) {
    console.log(error)
    toast.error(error.response.data.message)
  }
 }

  return (
    <div className='bg-zinc-900  px-4 sm:px-8 md:px-12 py-8 min-h-screen '>
       <h1 className=' text-3xl font-semibold text-zinc-500 mb-8'>Your Cart</h1> 
      {!cart && (
        <div className='flex justify-center items-center h-[70vh]'><Loader/></div>
      )}
      {cart && cart.length===0 &&(
        <div className='h-screen'>
          <div className='h-full flex items-center justify-center flex-col'>
            <h1 className='text-4xl font-semibold text-zinc-400 '>Empty Cart</h1>
            <img src="/emptycart.png" alt="empty cart" />
          </div>
        </div>
      )}
        {cart && cart.length>0 && cart.map((item,i)=>(
          <div key={i} className=' bg-zinc-800 px-8 py-4 my-6 rounded w-full flex flex-col md:flex-row justify-between items-center '>
            <img src={item.url} alt="" className='h-[15vh] object-cover'/>
            <div className='w-full md:w-auto'>
              <h1 className='text-2xl text-zinc-100 font-semibold text-start mt-2 md:0'>{item.title}</h1>
              <p className='text-zinc-300 mt-2 hidden lg:block'>{item.desc.slice(0,100)}...</p>
              <p className='text-zinc-300 mt-2 hidden md:block lg:hidden'>{item.desc.slice(0,65)}...</p>
              <p className='text-zinc-300 mt-2 block- md:hidden'>{item.desc.slice(0,100)}...</p>
            </div>
            <div className='flex mt-4 w-full md:w-auto items-center justify-between'>
              <h1 className='text-zinc-100 text-3xl font-semibold flex'>Rs.{item.price}</h1>
              <button onClick={()=>deleteItem(item._id) }  className='bg-red-100 text-red-500 border text-2xl border-red-700 rounded p-2 ms-12'><AiFillDelete/></button>
            </div>
          </div>
        ))}
      {cart && cart.length>0 && (
        <div className='mt-4 my-6 w-full flex items-center justify-end'>
        <div className='p-4 bg-zinc-800 rounded'>
           <h1 className='text-3xl text-zinc-200 font-semibold'>
            Totel Amount
           </h1>
           <div className='mt-3 flex items-center justify-between text-xl text-zinc-200'>
             <h2>{cart.length} books</h2>
             <h2>Rs.{totel}</h2>
           </div>
           <button onClick={()=>placeOrder()} className='bg-zinc-100 rounded px-4 py-2 mt-4 w-full hover:bg-zinc-400 text-xl font-serif'>Place Your Order</button>
         </div>
        </div>
      )} 
    
    </div>
  )
}

export default Cart