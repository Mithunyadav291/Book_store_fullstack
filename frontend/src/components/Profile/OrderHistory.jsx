import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Loader from '../Loader/Loader';
import { Link } from 'react-router-dom';

const OrderHistory = () => {
  const [orderHistory, setOrderHistory] = useState([]);

  useEffect(() => {
    const fetch = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/order/get-order-history", {
          withCredentials: true,
        });
        setOrderHistory(response.data.data);
      } catch (error) {
        console.error("Failed to fetch order history:", error);
      }
    };
    fetch();
  }, []);

  return (
    <div className='bg-zinc-900 px-2 sm:px-4 md:px-12 py-8 min-h-screen'>
      <h1 className='text-3xl font-semibold text-zinc-500 mb-8'>Your Order History</h1>

      {!orderHistory && (
        <div className='flex justify-center items-center h-[70vh]'>
          <Loader />
        </div>
      )}

      {orderHistory && orderHistory.length === 0 && (
        <div className='h-screen'>
          <div className='h-full flex items-center justify-start mt-8 flex-col'>
            <h1 className='text-4xl font-semibold text-zinc-400 mb-4'>You have not ordered any book.</h1>
            <img src='/emptyorderhistory.png' alt='empty cart' className='w-[40vh]' />
          </div>
        </div>
      )}

      {orderHistory && orderHistory.length > 0 && (
        <div className='bg-zinc-800 w-full p-4 flex flex-col items-center rounded'>
          {/* Table Header for all screen sizes */}
          <div className='flex justify-between items-center w-full text-sm sm:text-base text-zinc-300 font-medium border-b border-zinc-700 pb-2'>
            <p className='w-[5%]'>#</p>
            <p className='w-[8%]'>Image</p>
            <p className='w-[17%]'>Book</p>
            <p className='w-[30%]'>Description</p>
            <p className='w-[10%] ml-4'>Price</p>
            <p className='w-[17%]'>Status</p>
            <p className='w-[8%] md:flex hidden'>Mod</p>
          </div>

          {/* Table Body */}
          {orderHistory.map((item, i) => (
            <div
              key={i}
              className='flex justify-between items-start w-full text-sm sm:text-base text-zinc-400 border-b border-zinc-700 py-3'
            >
              <p className='w-[5%] font-semibold'>#{i + 1}</p>
              <Link to={`/viewBookDetails/${item.book._id}`} className='w-[8%] hover:underline hover:italic'>
              <img src={item.book.url} alt="" className='w-[70%]' /></Link>
              <Link to={`/viewBookDetails/${item.book._id}`} className='w-[17%] hover:underline hover:italic'>{item.book.title}</Link>
              <p className='w-[30%]'>{item.book.desc.slice(0,50)}...</p>
              <p className='w-[10%] ml-4'>Rs. {item.book.price}</p>
              <p className='w-[17%] font-semibold text-green-500'>
                {item.status==='Order Placed' ?(
                  <p className='text-yellow-500'>{item.status}</p>
                ): item.status==="Canceled"?(
                  <p className='text-red-500'>{item.status}</p>
                ):(
                  <p >{item.status}</p>
                )}</p>
              <p className='w-[8%] md:flex hidden'>COD</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default OrderHistory;
