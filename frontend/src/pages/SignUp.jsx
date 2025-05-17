import axios from 'axios';
import React, { useState } from 'react'
import toast from 'react-hot-toast';
import { FaUser, FaEnvelope, FaLock, FaHome } from "react-icons/fa";
import { Link, useNavigate } from 'react-router-dom';


const SignUp = () => {
    
  const [formData, setFormData] = useState({
    username:"",
    email:"",
    password:"",
    address:""
  });
  const navigate=useNavigate()
  const handleSubmit=async (e)=>{
    e.preventDefault();
    
    try {
     const response = await axios.post("https://book-store-fullstack-mithun.onrender.com/api/auth/signup", formData,
      {
        withCredentials: true
      }
     );

      // If successful (status 201)
      // if (response.status === 201) {
        toast.success(response.data.message || "Account created successfully!");
        navigate("/login");
      // }
         
    } catch (error) {
     
        toast.error(error.response.data.message);
    }
    
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-zinc-900">
      <div className="bg-zinc-800 p-8 rounded-2xl shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center text-white">Sign Up</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex items-center border rounded-xl px-4 py-2 bg-gray-50">
            <FaUser className="text-gray-400 mr-3" />
            <input
              type="text"
              name='username'
              placeholder="Username"
              // required
              value={formData.username}
              onChange={(e)=>setFormData({...formData, username:e.target.value})}
              className="w-full bg-transparent outline-none"
            />
          </div>
          <div className="flex items-center border rounded-xl px-4 py-2 bg-gray-50">
            <FaEnvelope className="text-gray-400 mr-3" />
            <input
              type="email"
              name='email'
              // required
              placeholder="Email"
              value={formData.email}
              onChange={(e)=>setFormData({...formData, email:e.target.value})}
              className="w-full bg-transparent outline-none"
            />
          </div>
          <div className="flex items-center border rounded-xl px-4 py-2 bg-gray-50">
            <FaLock className="text-gray-400 mr-3" />
            <input
              type="password"
              name='password'
              placeholder="Password"
              // required
              value={formData.password}
              onChange={(e)=>setFormData({...formData, password:e.target.value})}
              className="w-full bg-transparent outline-none"
            />
          </div>
          <div className="flex items-center border rounded-xl px-4 py-2 bg-gray-50">
            <FaHome className="text-gray-400 mr-3" />
            <input
              type="text"
              name='address'
              placeholder="Address"
              // required
              value={formData.address}
              onChange={(e)=>setFormData({...formData, address:e.target.value})}
              className="w-full bg-transparent outline-none"
            />
          </div>
          <button
            type="submit"
            className="w-full text-xl bg-blue-600 text-white py-2 rounded-xl hover:bg-blue-800 transition duration-300"
          >
            Create Account
          </button>


        </form>
        <p className="text-center text-white mt-2">
          Already have an account? 
          <Link to="/login" className="text-blue-500"> Sign In</Link>
        </p>
      </div>
    </div>
  );
}

export default SignUp