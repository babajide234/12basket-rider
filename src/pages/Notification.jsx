import React from 'react'
import { Link } from 'react-router-dom'
import { BsArrowLeft } from 'react-icons/bs'

const Notification = () => {
  return (
    <div className=" w-full min-h-screen flex flex-col ">
      <div className=" px-10 h-40 bg-primary flex justify-between items-center w-full">
        <Link to='/map' className=' bg-white rounded-full w-10 h-10 justify-center items-center text-gray-900  flex font-bold text-2xl'> 
          <BsArrowLeft/> 
        </Link>
        <h2 className=" font-bold text-white text-2xl">Notifications</h2>
      </div>
    </div>
  )
}

export default Notification