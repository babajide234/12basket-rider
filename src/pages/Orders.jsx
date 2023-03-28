import React,{useState,useEffect} from 'react'
import { MdArrowForwardIos } from 'react-icons/md'
import { CardContent } from '../components/Cards'
import orderSlice from '../store/oderStore';
import userSlice from '../store/userStore';


const Orders = () => {

    const [request, setRequests] = useState(false)
    const [requestsData, setRequestsData] = useState(false)
    const [successRequests, setSuccessRequests] = useState(false)
    const [successRequestsData, setSuccessRequestsData] = useState(false)

    const getOrders = orderSlice((state) => state.setOrder);
    const orders = orderSlice((state) => state.orders);
    const requests = orderSlice((state) => state.requests);
    const successfullOrders = orderSlice((state) => state.successfullOrders);
    const getSuccessOrders = orderSlice((state) => state.getSuccessOrders);
    const getRequests = orderSlice((state) => state.getRequests);
    const token = userSlice((state) => state.token);

    useEffect(() => {
        const data ={
            token: token,
            reference_code: "",
            account: "rider", 
            from: "",
            to: "",
            payment_status: "", 
            order_status: "Request"
        }
        getRequests(data)
    }, [token,getRequests])

    useEffect(() => {
        const data ={
            token: token,
            reference_code: "",
            account: "rider", 
            from: "",
            to: "",
            payment_status: "", 
            order_status: "Successful"
        }
        getSuccessOrders(data)
    }, [token,getSuccessOrders])

  return (
    <div className=" flex flex-col px-[20px] py-10 min-h-screen">

        <h2 className=" font-thin text-4xl mb-10">My Orders</h2>

            <CardContent title="Order Requests">
                <div className="flex justify-between items-center cursor-pointer" onClick={()=>setRequests(!request)}>
                    <h2 className="text-gray-800 text-xl font-bold flex items-center">
                    <span className=" bg-primary text-white w-8 h-8 rounded-full text-sm mr-3 flex justify-center items-center">{requests ? requests.length : '0' }</span>

                        Requests</h2>
                    <span className='text-gray-800  font-bold w-6 h-6 flex justify-center items-center'><MdArrowForwardIos/></span>
                </div>
                <div className={`  text-center ${request ? ' h-fit py-5' : 'h-0 overflow-hidden'}`}>
                    {
                        requests == null ? (
                            <h3 className="">No requests</h3>
                        ):(
                            requests.map((order)=>(
                                <div className=" text-left border border-solid border-gray-200 rounded-lg overflow-hidden px-4 py-5">
                                    <div className="flex ">
                                        <h2 className=" font-bold mr-4">Ref: </h2>
                                        <span className=" whitespace-pre">{order.reference_code}</span>
                                    </div>
                                    <div className="flex ">
                                        <h2 className=" font-bold mr-4">Order Status: </h2>
                                        <span className="">{order.order_status}</span>
                                    </div>
                                    <div className="flex ">
                                        <h2 className=" font-bold mr-4">Payment Status: </h2>
                                        <span className=""> {order.payment_status}</span>
                                    </div>
                                    <div className="flex ">
                                        <h2 className=" font-bold mr-4">Value: </h2>
                                        <span className="">&#x20A6; {order.amount.total}</span>
                                    </div>
                                    <div className="flex mt-5 ">
                                        <button className=' capitalize bg-primary text-white rounded-md px-5 py-2'>pay</button>
                                    </div>
                                    <h2 className=" font-bold mr-4"></h2>
                                </div>
                            ))
                        )
                    }
                </div>
            </CardContent>
            <CardContent title="Successfull Deliveries">
                <div className="flex justify-between items-center cursor-pointer" onClick={()=>setSuccessRequests(!successRequests)}>
                    <h2 className="text-gray-800 text-xl font-bold flex items-center">
                        <span className=" bg-primary text-white w-8 h-8 rounded-full text-sm mr-3 flex justify-center items-center">{successfullOrders ? successfullOrders.length : '0' }</span>
                        Successfull
                    </h2>
                    <span className='text-gray-800  font-bold w-6 h-6 flex justify-center items-center'><MdArrowForwardIos/></span>
                </div>
                <div className={`  text-center ${successRequests ? ' h-fit py-5' : 'h-0 overflow-hidden'}`}>
                    {
                        successfullOrders == null ? (
                            <h3 className="">No Orders Delivered</h3>
                        ):(
                            successfullOrders.map((item)=>(
                                <div key={item.reference_code} className="flex flex-col py-5 px-4 mb-5 last-of-type:mb-0 rounded-xl border border-solid border-gray-300 relative">
                                    <div className=" flex flex-col text-left">
                                        <h2 className=" font-bold text-sm">New Order- {item.store[0].name}</h2>
                                        <p className=" text-sm font-semibold">
                                            <span className=" text-primary">Destination: </span> 
                                            {
                                                item.shipping[0].address
                                            }
                                        </p>
                                    </div> 
                                    
                                    <button className=' bg-green-500 mt-5 text-white rounded-lg   px-2 py-1'>Successfull</button> 
                                        
                                </div>
                            ))
                        )
                    }
                </div>
            </CardContent>

    </div>
  )
}

export default Orders