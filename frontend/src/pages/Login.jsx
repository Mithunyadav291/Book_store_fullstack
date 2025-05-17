import axios from 'axios';
import React, { useState } from 'react'
import toast from 'react-hot-toast';
import { FaUser, FaEnvelope, FaLock, FaHome } from "react-icons/fa";
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { authActions } from '../store/auth';

const Login = () => {
    
  const [formData, setFormData] = useState({
    email:"",
    password:"",
  });

    
  const navigate=useNavigate()
  const dispatch=useDispatch()

  const handleSubmit=async (e)=>{
    e.preventDefault();
    
    try {
     const response = await axios.post("http://localhost:3000/api/auth/signIn", formData,
      {
        withCredentials: true
      });
      dispatch(authActions.login())
      dispatch(authActions.changeRole(response.data.role))
       localStorage.setItem('id',response.data._id)
       localStorage.setItem('token',response.data.token)
       localStorage.setItem('role',response.data.role)
        toast.success(response.data.message || "Account created successfully!");
        navigate("/");
  
    } catch (error) {
     
        toast.error(error.response.data.message);
    }
    
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-zinc-900">
      <div className="bg-zinc-800 p-8 rounded-2xl shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center text-white">Login</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          
          <div className="flex items-center border rounded-xl px-4 py-2 bg-gray-50">
            <FaEnvelope className="text-gray-400 mr-3" />
            <input
              type="email"
              name='email'
              required
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
              required
              value={formData.password}
              onChange={(e)=>setFormData({...formData, password:e.target.value})}
              className="w-full bg-transparent outline-none"
            />
          </div>
         
          <button
            type="submit"
            className="w-full text-xl bg-blue-600 text-white py-2 rounded-xl hover:bg-blue-800 transition duration-300"
          >
            Login
          </button>


        </form>
        <p className="text-center text-white mt-2">
          Don't have an account? 
          <Link to="/signup" className="text-blue-500"> Sign Up</Link>
        </p>
      </div>
    </div>
  );
}

export default Login