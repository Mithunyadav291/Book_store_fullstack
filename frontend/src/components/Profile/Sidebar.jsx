import axios from 'axios'
import { Book, Camera, Check, Heart, LogOut, Settings, X } from 'lucide-react'
import React, { useState } from 'react'
import toast from 'react-hot-toast'
import { GrCart, GrLike } from 'react-icons/gr'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { authActions } from '../../store/auth'

const Sidebar = ({data}) => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [openLogoutPopup, setOpenLogoutPopup]=useState(false)

  const dispatch=useDispatch()
  const navigate=useNavigate()
  const location=useLocation()
  const role=useSelector((state)=>state.auth.role)

  const logout=async()=>{
    dispatch(authActions.logout());
    dispatch(authActions.changeRole("user"));
    localStorage.clear("id")
    localStorage.clear("token")
    localStorage.clear("role")

    try {
      const response=await axios.get("https://book-store-fullstack-mithun.onrender.com/api/auth/logout")
      toast.success(response.data.message)
    } catch (error) {
      toast.error(error.response.data.message)
    }
    navigate('/')
  }
  
  const handleImageUpload=async(e)=>{
    // const file=e.target.files[0];
    // if(!file) return;

    // const formData = new FormData();
    // formData.append("avatar", file);
      
     
    //   setIsUploading(true)
    //   try {
       
    //     const response=await axios.put("http://localhost:3000/api/auth/update/avatar"+data._id,formData)
    //     toast.success("Image updated successfully")
    //     setSelectedImage(URL.createObjectURL(file)); 
       
    //   } catch (error) {
    //     console.log(error)
    //   }finally{
    //     window.location.reload()
    //     setIsUploading(false)
    //   }


    
  }
  return (
    <>
    <div className='bg-zinc-800 p-4 rounded-xl flex flex-col  items-center justify-around h-auto  md:h-[80vh] mx-4 md:mx-0 '>
     <div className='flex flex-col items-center md:w-auto justify-center'>
       <div className='relative flex flex-col items-center justify-center '>
          <img src={selectedImage || data.avatar} alt="" className='h-[16vh] rounded-full'/>
          <label htmlFor="avatar-upload" className='absolute top-18 left-38'>
          <input type='file' accept='image/*' id='avatar-upload' className='hidden'
          onChange={handleImageUpload}/>
          <Camera className='w-8 h-18 text-red-400'/>
         </label>
         <p className="text-sm  text-zinc-400">
              {isUploading ? "Uploading..." : "Click the camera icon to update your photo"}
            </p>
       </div>
       
        
        <p className='mt-3 text-2xl text-zinc-100 font-semibold'>{data.username}</p>

        <p className='mt-1 text-xl text-zinc-300'>{data.email}</p>
        <p className='mt-1 text-xl text-zinc-300'>{data.address}</p>
        <p className='mt-1 text-xl text-zinc-300'>{data.role}</p>
        <div className='w-full mt-4 bg-zinc-500 h-[1px] block'></div>
     </div>
     
    {role==="user" && (
       <div className=' flex-col items-center justify-center hidden md:flex'>
       <Link to='/profile' className={` font-semibold w-full py-2 text-center hover:bg-zinc-900 rounded transition-all duration-300 flex justify-center items-center gap-2 text-2xl ${location.pathname==="/profile"?"text-blue-400":"text-zinc-100"}`}>Favourites <Heart/></Link>
       <Link to='/profile/orderHistory' className={`font-semibold w-full py-2 text-center hover:bg-zinc-900 rounded transition-all duration-300 flex justify-center items-center gap-2 text-2xl  ${location.pathname==="/profile/orderHistory"?"text-blue-400":"text-zinc-100"}`}>Order History <GrCart/></Link>
       <Link to='/profile/setting' className={` font-semibold w-full py-2 text-center hover:bg-zinc-900 rounded transition-all duration-300 flex justify-center items-center gap-2 text-2xl  ${location.pathname==="/profile/setting"?"text-blue-400":"text-zinc-100"}`}>Settings <Settings/></Link>
       <div className='w-full mt-4 bg-zinc-500 h-[1px] block'></div>
     
     </div>
    )}
    {role==="admin" && (
       <div className=' flex-col items-center justify-center hidden md:flex'>
       <Link to='/profile' className={` font-semibold w-full py-2 text-center hover:bg-zinc-900 rounded transition-all duration-300 flex justify-center items-center gap-2 text-2xl ${location.pathname==="/profile"?"text-blue-400":"text-zinc-100"}`}>All Orders <GrCart/></Link>
       <Link to='/profile/addbook' className={`font-semibold w-full py-2 text-center hover:bg-zinc-900 rounded transition-all duration-300 flex justify-center items-center gap-2 text-2xl  ${location.pathname==="/profile/addbook"?"text-blue-400":"text-zinc-100"}`}>Add Book <Book/> </Link>
       <Link to='/profile/setting' className={` font-semibold w-full py-2 text-center hover:bg-zinc-900 rounded transition-all duration-300 flex justify-center items-center gap-2 text-2xl  ${location.pathname==="/profile/setting"?"text-blue-400":"text-zinc-100"}`}>Settings <Settings/></Link>
       <div className='w-full mt-4 bg-zinc-500 h-[1px] block'></div>
     
     </div>
    )}
     <button onClick={()=>setOpenLogoutPopup(true)} className='bg-zinc-900 text-white font-semibold flex items-center justify-center mt-3 py-2 px-4 text-xl rounded hover:bg-white hover:text-zinc-800 transition-all duration-300'> Log Out <LogOut/></button>
    </div>
    {/* mobile navigation. less than md. show  */}
   {role==="user" &&(
     <div className='flex md:hidden mt-2  items-center justify-center'>
     <Link to='/profile' className={` font-semibold w-full py-2 text-center hover:bg-zinc-900 rounded transition-all duration-300 flex justify-center items-center gap-2 text-2xl ${location.pathname==="/profile"?"text-blue-400":"text-zinc-100"}`}>Favourites <Heart/></Link>
        <Link to='/profile/orderHistory' className={`font-semibold w-full py-2 text-center hover:bg-zinc-900 rounded transition-all duration-300 flex justify-center items-center gap-2 text-2xl  ${location.pathname==="/profile/orderHistory"?"text-blue-400":"text-zinc-100"}`}>Order History <GrCart/></Link>
        <Link to='/profile/setting' className={` font-semibold w-full py-2 text-center hover:bg-zinc-900 rounded transition-all duration-300 flex justify-center items-center gap-2 text-2xl  ${location.pathname==="/profile/setting"?"text-blue-400":"text-zinc-100"}`}>Settings <Settings/></Link>
      </div>
   )}
   {role==="admin" &&(
     <div className='flex md:hidden mt-2  items-center justify-center'>
     <Link to='/profile' className={` font-semibold w-full py-2 text-center hover:bg-zinc-900 rounded transition-all duration-300 flex justify-center items-center gap-2 text-2xl ${location.pathname==="/profile"?"text-blue-400":"text-zinc-100"}`}>All Orders <GrCart/></Link>
        <Link to='/profile/addbook' className={`font-semibold w-full py-2 text-center hover:bg-zinc-900 rounded transition-all duration-300 flex justify-center items-center gap-2 text-2xl  ${location.pathname==="/profile/addbook"?"text-blue-400":"text-zinc-100"}`}>Add Book <Book/></Link>
        <Link to='/profile/setting' className={` font-semibold w-full py-2 text-center hover:bg-zinc-900 rounded transition-all duration-300 flex justify-center items-center gap-2 text-2xl  ${location.pathname==="/profile/setting"?"text-blue-400":"text-zinc-100"}`}>Settings <Settings/></Link>
      </div>
   )}
     {openLogoutPopup && (
       <div className='fixed inset-0 backdrop-blur-sm  bg-opacity-60 flex justify-center items-center z-50'>
       <div className='bg-zinc-800 p-6 rounded-lg w-[90%] max-w-md border-2 border-zinc-700'>
         <h2 className='text-xl font-semibold text-white mb-4'>
           Confirm Logout ?
          </h2>
          <p> Are you sure you want to log out from your account? You will need to log in again to access your profile.</p>
          <div className='flex justify-between mt-6'>
                  <button
                    onClick={()=>setOpenLogoutPopup(false)}
                    className='px-4 py-2 bg-red-600 hover:bg-red-700 rounded-md text-white flex items-center gap-1'
                  >
                    <X size={16} />
                    Cancel
                  </button>
                  <button
                    onClick={logout}
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

export default Sidebar