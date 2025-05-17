
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Loader from '../Loader/Loader';
import { Edit, X, Check } from 'lucide-react';
import toast from 'react-hot-toast';

const Setting = () => {
  const [profileData, setProfileData] = useState(null);
  const [fieldToEdit, setFieldToEdit] = useState('');
  const [editValue, setEditValue] = useState('');
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [openPopup, setOpenPopup] = useState(false);
  const [loading, setLoading] = useState(false);

  // Fetch user data
  useEffect(() => {
    const fetch = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/auth/getuser", {
          withCredentials: true
        });
        setProfileData(response.data);
      } catch (error) {
        console.error('Error fetching profile data:', error);
      }
    };
    fetch();
  }, [])


  // Handle edit button click
  const handleEdit = (field) => {
    setFieldToEdit(field);
    if (field === 'password') {
      setOldPassword('');
      setNewPassword('');
    } else {
      setEditValue(profileData?.[field] || '');
    }
    setOpenPopup(true);
  };

  // Cancel handler
  const handleCancel = () => {
    setOpenPopup(false);
    setEditValue('');
    setOldPassword('');
    setNewPassword('');
  };

  // Confirm and send API
  const handleConfirm = async () => {
    setLoading(true);


    let payload = {};
    if (fieldToEdit === 'password') {
      payload = {
        oldPassword,
        newPassword
      };
    } else {
      payload[fieldToEdit] = editValue;
    }
    console.log(payload)
    try {
      const response = await axios.put(
        `http://localhost:3000/api/auth/update/${fieldToEdit}/${profileData._id}`,
        payload,
        { withCredentials: true }
      );
      // console.log(response.data)
      setProfileData(response.data);
      toast.success(response.data.message)
      setOpenPopup(false);
      window.location.reload();
    } catch (error) {
      // console.log(error)
      toast.error(error.response.data.message);
    } finally {
      setLoading(false);
    }
  };

  // UI Elements
  const renderEditButton = (label, fieldKey) => (
    <div
      onClick={() => handleEdit(fieldKey)}
      className='flex justify-start items-center bg-zinc-800 rounded hover:bg-zinc-700 gap-2 text-lg w-fit px-4 py-2 cursor-pointer'
    >
      <p className='w-2 h-2 rounded-full bg-white'></p>
      {label}
      <Edit className='w-4 h-4' />
    </div>
  );

  return (
    <div className='px-2 sm:px-4 md:px-12 py-8 md:h-screen h-auto'>
      <h1 className='text-3xl font-semibold text-zinc-500 mb-8'>Setting</h1>

      {!profileData ? (
        <div className='flex justify-center items-center h-full'>
          <Loader />
        </div>
      ) : (
        <div className='flex flex-col gap-4'>
          {renderEditButton("Change Your Username", "username")}
          {renderEditButton("Change Your Email", "email")}
          {renderEditButton("Change Your Password", "password")}
          {renderEditButton("Change Your Address", "address")}

          {/* Popup Modal */}
          {openPopup && (
            <div className='fixed inset-0 backdrop-blur-sm bg-opacity-50 flex justify-center items-center z-50'>
              <div className='bg-zinc-800 p-6 rounded-lg w-[90%] max-w-md border-2 border-zinc-700'>
                <h2 className='text-xl font-semibold text-white mb-4'>
                  Update Your {fieldToEdit}
                  
                </h2>

                {/* Conditional Inputs */}
                {fieldToEdit === 'password' ? (
                  <>
                    <input
                      type='text'
                      placeholder='Old Password'
                      value={oldPassword}
                      onChange={(e) => setOldPassword(e.target.value)}
                      className='w-full p-3 rounded-md bg-zinc-900 text-white mb-3 outline-none'
                    />
                    <input
                      type='text'
                      placeholder='New Password'
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      className='w-full p-3 rounded-md bg-zinc-900 text-white mb-4 outline-none'
                    />
                  </>
                ) : (
                  <input
                    type='text'
                    value={editValue}
                    onChange={(e) => setEditValue(e.target.value)}
                    className='w-full p-3 rounded-md bg-zinc-900 text-white mb-4 outline-none'
                  />
                )}

                {/* Buttons */}
                <div className='flex justify-end gap-4'>
                  <button
                    onClick={handleCancel}
                    className='px-4 py-2 bg-red-600 hover:bg-red-700 rounded-md text-white flex items-center gap-1'
                  >
                    <X size={16} />
                    Cancel
                  </button>
                  <button
                    onClick={handleConfirm}
                    className='px-4 py-2 bg-green-600 hover:bg-green-700 rounded-md text-white flex items-center gap-1 disabled:opacity-50'
                    disabled={loading}
                  >
                    <Check size={16} />
                    {loading ? 'Saving...' : 'Confirm'}
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Setting;
