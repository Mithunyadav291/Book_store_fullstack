import React, { useEffect, useState } from 'react'
import {Toaster} from 'react-hot-toast'
import Home from './pages/Home'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import { Routes,Route, Navigate } from 'react-router-dom'
import Layout from './pages/Layout'
import AllBooks from './pages/AllBooks'
import Login from './pages/Login'
import SignUp from './pages/SignUp'
import Cart from './pages/Cart'
import About from './pages/About'
import Profile from './pages/Profile'
import ViewBookDetails from './components/BookCard/ViewBookDetails'
import { useDispatch, useSelector } from 'react-redux'
import { authActions } from './store/auth'
import axios from 'axios'
import Favourites from './components/Profile/Favourites'
import OrderHistory from './components/Profile/OrderHistory'
import Setting from './components/Profile/Setting'
import AllOrders from './components/admin/AllOrders'
import AddBook from './components/admin/AddBook'
import UpdateBook from './components/admin/UpdateBook'
import Loader from './components/Loader/Loader'

axios.defaults.withCredentials=true;


const App = () => {

  const dispatch=useDispatch()
  const role=useSelector((state)=>state.auth.role);

  const [Data, setData] = useState(null);
  const [loading,setLoading]=useState(true);

  useEffect(() => {
    const fetch=async()=>{
     try {
       const response=await axios.get("http://localhost:3000/api/auth/getuser"
        // ,{withCredentials:true}
      )
      setData(response.data)
     } catch (error) {
      setData(null)
     }finally{
      setLoading(false)
     }
    

    }

    fetch()
  }, []);

  // useEffect(() => {
  //   if(localStorage.getItem("id") && localStorage.getItem("token") && localStorage.getItem("role"))
  //   {
  //     dispatch(authActions.login())
  //     dispatch(authActions.changeRole(localStorage.getItem("role")))
  //   }
  // }, []);
 
  useEffect(() => {
    if(Data && localStorage.getItem("id") && localStorage.getItem("token") && localStorage.getItem("role"))
    {
      dispatch(authActions.login())
      dispatch(authActions.changeRole(Data.role))
    }
  }, [Data]);

  if(loading){
    return(
      <div className='flex justify-center h-[80vh] items-center w-full'>
          <Loader/>
        </div>
    )
  }

  return (
    <>
  
     <Routes>
        <Route path='/' element={<Layout/>}>
            <Route index element={<Home/>} />
            <Route path='/allbooks' element={<AllBooks/>} />
            <Route path='/login' element={!Data ? <Login/> :<Navigate to="/"/>} />
            <Route path='/signup' element={!Data ? <SignUp/> :<Navigate to="/"/>} />
            <Route path='/cart' element={Data ? <Cart/>  :<Navigate to="/login"/> }/>
            <Route path='/about' element={<About/>} />
            <Route path='/updatebook/:id' element={<UpdateBook/>} />
            <Route path='/profile' element={<Profile/>} >
               {role==="user" ? (<Route index element={<Favourites/>} />):
               (<Route index element={<AllOrders/>} />)}
               {role==="admin"&& (<Route path='addbook' element={<AddBook/>} />)}
               {role ==="user" && (<Route path='orderHistory' element={<OrderHistory/>} />)}
               <Route path='setting' element={<Setting/>} />
            </Route>
            <Route path='/viewBookDetails/:id' element={<ViewBookDetails/>} />
        </Route>
      
     </Routes>
     <Toaster/>
    </>
 
  )
}

export default App