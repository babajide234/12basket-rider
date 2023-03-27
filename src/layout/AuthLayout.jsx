import React from 'react'
import Container from '../components/Container'
import { FaRegCaretSquareLeft } from 'react-icons/fa'
import Logo from '../assets/logo.jpg'
import { Link, Outlet } from 'react-router-dom'


const AuthLayout = () => {
  return (
    <Container>
        <div className=" w-full h-1/2 bg-auth-bg bg-cover bg-no-repeat bg-center rounded-bl-[30px] rounded-br-[30px] px-10 py-5 flex flex-col justify-end">
            {/* <Link to='/shop' className=' text-white text-3xl' ><FaRegCaretSquareLeft/></Link> */}
            <div className=" w-full h-full flex justify-center items-center py-12">
              <img src={Logo} alt="12basket logo" className=" w-[140px] rounded-full" />
            </div>
            <ul className="flex justify-between w-11/12 mx-auto">
                <li className=""><Link to='/login' className=' capitalize text-primary font-bold text-xl border-b-4 border-solid border-primary px-5 py-3'>login</Link></li>
            </ul>
        </div>
        <div className=" px-11 py-10 flex flex-col bg-default">
            <Outlet/>
        </div>
    </Container>
  )
}

export default AuthLayout