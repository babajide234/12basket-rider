import { useState, useEffect } from 'react'
import './App.css'
import router from './routes'
import {  RouterProvider } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import loaderSlice from './store/loaderStore';
import orderSlice from './store/oderStore';
import userSlice from './store/userStore';

function App() {
  const message = loaderSlice((state) => state.message)
  const type = loaderSlice((state) => state.type)
  const clear = loaderSlice((state) => state.clear)
  const setOrder = orderSlice((state) => state.setOrder);
  const token = userSlice((state) => state.token);

  const clearMesage = () => {
    setTimeout(() => {
      clear();
    }, 5500);
  }

  useEffect(()=>{
    if(type == 'success'){
      toast.success(message)
    }
    if(type == 'failed'){
      toast.error(message)
    }
    clearMesage();

  },[type, message])

  useEffect(()=>{
    const data ={
      token: token,
      reference_code: "",
      account: "rider", 
      from: "",
      to: "",
      payment_status: "", 
      order_status: "" 
  }
    setOrder(data)
  },[setOrder])
  return (
    <>
      <RouterProvider router={router}/>
      <div className=" w-5/6 mx-auto">
        <ToastContainer
          position="bottom-center"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          theme="colored"
          />
      </div>
    </>
  )
}

export default App
