import React from 'react'
import Container from '../components/Container'
import Logo from '../assets/logo.jpg'
import { Link } from 'react-router-dom'


const Landing = () => {
  return (
    <Container>
        <div className=" w-full h-screen bg-hero-bg bg-no-repeat bg-cover  ">
            <div className=" w-full h-2/4 flex justify-center items-center">
                <img src={Logo} alt="" className=" rounded-full" />
            </div>
            <div className=" flex flex-col justify-end items-center h-2/4 pb-10 ">
                <h1 className=' font-bold text-4xl text-white mb-5'>Rider App</h1>
                <Link to='/login' className=' px-32 py-6 bg-white rounded-full text-primary font-bold text-2xl'>Login </Link>
            </div>
        </div>
    </Container>
  )
}

export default Landing