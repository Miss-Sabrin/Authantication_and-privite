import React from 'react';
import { useGetUserQuery } from '../../store/api/UserSlice';


const Profile = () => {
  const { data : user = {} } = useGetUserQuery();
  return (
    <div className='bg-teal-900 text-white text-center m-auto mt-16 rounded-2xl w-64 h-64 m-5 shadow-2xl overflow-hidden'>
      <img src="./avator.jpg" alt="" className='w-[120px] h-22 ml-16 mt-2 rounded-full border-solid border-4 border-red-700 mb-3' />
      <p>Name : {user.name}</p>
      <p>Email : {user.email}</p>
    </div>
  )
}

export default Profile