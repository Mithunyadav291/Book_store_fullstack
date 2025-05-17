import axios from 'axios'
import React, { useState } from 'react'
import toast from 'react-hot-toast'
import { FaBook, FaGlobe, FaImage, FaLanguage, FaMoneyBill, FaPen } from 'react-icons/fa'
import { useNavigate } from 'react-router-dom'

const AddBook = () => {
  const [loading,setLoading]=useState(false)
    const [bookData,setBookData]=useState({
        url:"",
        title:"",
        author:"",
        price:"",
        desc:"",
        language:""
    })
  const navigate=useNavigate()
    const handleSubmit=async(e)=>{
       e.preventDefault();
      //  console.log(bookData)
      setLoading(true)
       try {
        if(bookData.url==="" || bookData.title==="" || bookData.author==="" || bookData.price==="" || bookData.desc ==="" || bookData.language==="")
        {toast.error("Please fill all the fields")}
        else{
          const response=await axios.post("http://localhost:3000/api/book/addbook",bookData, {withCredentials:true})
          console.log(response.data)
          toast.success(response.data.message)
          navigate("/allbooks")
          setBookData({
            url:"",
            title:"",
            author:"",
            price:"",
            desc:"",
            language:""
          })
        }
       } catch (error) {
        toast.error(error.response.data.message)
       }finally{
        setLoading(false)
       }
    }
  return (
    <div className='h-[100%] md:p-4'>
         <h1 className='text-zinc-300 mb-2 text-3xl font-semibold'>Add Book</h1>

         <form onSubmit={handleSubmit} className="space-y-4 bg-zinc-800 p-8 rounded-2xl">
         <InputField icon={<FaImage />} name="url" placeholder="Image URL" value={bookData.url} onChange={(e)=>setBookData({ ...bookData, url: e.target.value })} />
          <InputField icon={<FaBook />} name="title" placeholder="Title" value={bookData.title} onChange={(e)=>setBookData({ ...bookData, title: e.target.value })} />
          <InputField icon={<FaPen />} name="author" placeholder="Author" value={bookData.author} onChange={(e)=>setBookData({ ...bookData, author: e.target.value })} />
          <InputField icon={<FaLanguage />} name="language" placeholder="Language" value={bookData.language} onChange={(e)=>setBookData({ ...bookData, language: e.target.value })} />
          <InputField icon={<FaMoneyBill />} name="price" placeholder="Price" value={bookData.price} onChange={(e)=>setBookData({ ...bookData, price: e.target.value })} type="number" />
          
          <div className="flex items-start border rounded-xl px-4 py-2 bg-black">
            <FaGlobe className="text-gray-400 mt-1 mr-3" />
            <textarea
              name="desc"
              placeholder="Description"
              value={bookData.desc}
              onChange={(e)=>setBookData({ ...bookData, desc: e.target.value })}
              className="w-full text-white outline-none resize-none"
              rows="3"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full text-xl bg-green-600 text-white py-2 rounded-xl hover:bg-green-800 transition duration-300"
          >
            {loading ? "Adding..." :"Add Book" }
          </button>
        </form>
    </div>
  )
}

const InputField = ({ icon, name, placeholder, value, onChange, type = "text" }) => (
  <div className="flex items-center border rounded-xl px-4 py-2 bg-black">
    <span className="text-gray-400 mr-3">{icon}</span>
    <input
      type={type}
      name={name}
      placeholder={placeholder}
      
      value={value}
      onChange={onChange}
      className="w-full  text-white outline-none"
      required
    />
  </div>
);
export default AddBook