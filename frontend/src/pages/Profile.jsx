import React, { useEffect, useState } from 'react'
import Sidebar from '../components/Profile/Sidebar'
import { Outlet } from 'react-router-dom'
import axios from 'axios'
import Loader from '../components/Loader/Loader'


const Profile = () => {
  // const isLoggedIn=useSelector();
  const [Data, setData] = useState();

  useEffect(() => {
    const fetch=async()=>{
      const response=await axios.get("http://localhost:3000/api/auth/getuser"
        // ,{withCredentials:true}
      )
      setData(response.data)

    }

    fetch()
  }, []);

  return (
    <div className='bg-zinc-900 px-2 md:px-12 flex flex-col md:flex-row h-auto py-8 text-white'>
      {!Data && (
        <div className='flex justify-center h-[80vh] items-center w-full'>
          <Loader/>
        </div>
      )}
      {Data && (
        <>
          <div className='w-full  md:w-1/3 lg:w-2/6 mr-4'>
             <Sidebar data={Data}/>
           </div>
           <div className='w-full md:w-2/3 lg:w-4/6'>
              <Outlet />
            </div>
        </>
      )}
    </div>
  )
}

export default Profile