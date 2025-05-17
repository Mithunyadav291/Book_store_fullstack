import axios from "axios";
import React, { useEffect, useState } from "react";
import Loader from "../Loader/Loader";
import { Check, User } from "lucide-react";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import { IoOpenOutline } from "react-icons/io5";
import SeeUserData from "./SeeUserData";

const AllOrders = () => {
  const [allOrders, setAllOrders] = useState();
  const [options, setOptions] = useState(-1);
  const [status, setStatus] = useState("");
  const [userDiv, setUserDiv] = useState("hidden");
  const [userDivData, setUserDivData] = useState();


  const fetch = async () => {
    const response = await axios.get(
      "https://book-store-fullstack-mithun.onrender.com/api/order/get-all-orders",
      { withCredentials: true }
    );
    setAllOrders(response.data.data);
    // console.log(response.data)
  };
  useEffect(() => {
    fetch();
  }, []);

  const submitChanges=async(id)=>{
    const response = await axios.put("https://book-store-fullstack-mithun.onrender.com/api/order/update-order-status/"+id,
      {status:status},
      { withCredentials: true }
    );
    toast.success(response.data.message)
    fetch()
  }
  return (
    <div className="bg-zinc-900 px-2 sm:px-4 md:px-12 py-8 min-h-screen">
      <h1 className="text-3xl font-semibold text-zinc-500 mb-8">
        All Order History
      </h1>

      {!allOrders && (
        <div className="flex justify-center items-center h-[70vh]">
          <Loader />
        </div>
      )}

      {allOrders && allOrders.length === 0 && (
        <div className="h-screen">
          <div className="h-full flex items-center justify-start mt-8 flex-col">
            <h1 className="text-4xl font-semibold text-zinc-400 mb-4">
              There is no any order placed by Customer.
            </h1>
            <img
              src="/emptyorderhistory.png"
              alt="empty cart"
              className="w-[40vh]"
            />
          </div>
        </div>
      )}

      {allOrders && allOrders.length > 0 && (
        <div className="bg-zinc-800 w-full p-4 flex flex-col items-center rounded">
          {/* Table Header for all screen sizes */}
          <div className="flex justify-between items-center w-full text-sm sm:text-base text-zinc-300 font-medium border-b border-zinc-700 pb-2">
            <p className="w-[5%]">#</p>
            <p className="w-[8%]">Image</p>
            <p className="w-[17%]">Books</p>
            <p className="w-[25%]">Description</p>
            <p className="w-[10%] ml-4">Price</p>
            <p className="w-[22%] ">Status</p>
            <p className="w-[8%] ">
              <User />
            </p>
          </div>

          {/* Table Body */}
          {allOrders.map((item, i) => (
            <div
              key={i}
              className="flex justify-between items-start w-full text-sm sm:text-base text-zinc-400 border-b border-zinc-700 py-3"
            >
              <p className="w-[5%] font-semibold">#{i + 1}</p>
              <Link
                to={`/viewBookDetails/${item.book._id}`}
                className="w-[8%] hover:underline hover:italic"
              >
                <img src={item.book.url} alt="" className="w-[70%]" />
              </Link>
              <Link
                to={`/viewBookDetails/${item.book._id}`}
                className="w-[17%] hover:underline hover:italic"
              >
                {item.book.title}
              </Link>
              <p className="w-[25%]">{item.book.desc.slice(0, 50)}...</p>
              <p className="w-[10%] ml-4">Rs. {item.book.price}</p>
              <div className="flex flex-col w-[22%] gap-2 justify-center items-start hover:bg-zinc-900 p-2 rounded-lg">
               <button onClick={()=>setOptions(i)} className=" font-semibold text-green-500">
                {item.status === "Order Placed" ? (
                  <p className="text-yellow-500">{item.status}</p>
                ) : item.status === "Canceled" ? (
                  <p className="text-red-500">{item.status}</p>
                ) : (
                  <p>{item.status}</p>
                )}
              </button>
              {options===i &&(
              <div className="flex ">
                <select onChange={(e)=>setStatus(e.target.value)} name="status" className="bg-zinc-800">
                  {/* enum:["Order Placed","Out of delivery","Delivered","Canceled"] */}
                  <option value='Order Placed'>Order Placed</option>
                  <option value='Out of delivery'>Out of delivery</option>
                  <option value='Delivered'>Delivered</option>
                  <option value='Canceled'>Canceled</option>
                </select>
                <button 
                onClick={()=>{setOptions(-1);
                  submitChanges(item._id)
                }}><Check className="text-green-500 hover:text-red-500 text-xl" /></button>
              </div>
                
              )}
             </div>
              <button onClick={()=>{setUserDiv("fixed");setUserDivData(item.user)}} className="w-[8%] text-2xl hover:text-orange-500"><IoOpenOutline/></button>
            </div>
          ))}
        </div>
      )}
       {userDivData && (
      <SeeUserData userDivData={userDivData} userDiv={userDiv} setUserDiv={setUserDiv}/>
     )}
    </div>
    
  );
};

export default AllOrders;
