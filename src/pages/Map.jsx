import React, { useState,useEffect } from 'react'
import GoogleMapReact from 'google-map-react';
// import { useGeolocated } from "react-geolocated";
import useGeolocation from "react-hook-geolocation";
import useCombinedStore from '../store/combinedStore';
import { GoogleMap, useJsApiLoader,Marker,DirectionsService  } from '@react-google-maps/api';
import orderSlice from '../store/oderStore';
import { FiPhone, FiHome } from 'react-icons/fi';
import { FaRegStickyNote } from 'react-icons/fa';
import { MdOutlineClose } from 'react-icons/md';



const AnyReactComponent = ({ text }) => <div>{text}</div>;


const Map = () => {

    const orders = orderSlice(state=> state.orders)

    const { isLoaded } = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: "AIzaSyBP36yIMHK0Fk1EFDoRNt_nLqadIm5wlMc"
    })

    const {
        app,
        setApp
    } = useCombinedStore();

    const [ lng , setLng ] =  useState(0);
    const [ lat , setLat ] =  useState(0);
    const [ showOrder , setShowOrder ] =  useState(false);
    const [ orderDetails , setOrderDetails ] =  useState(false);

    const onGeolocationUpdate = (geolocation) => {
        console.log("Here’s some new data from the Geolocation API: ", geolocation);
    };
    const geolocation = useGeolocation({
        enableHighAccuracy: true,
        maximumAge: 15000,
        timeout: 12000,
    });


    useEffect(() => {
        if(!geolocation.error){
            setLng(geolocation.longitude);
            setLat(geolocation.latitude);
        }
    }, [geolocation])

    useEffect(() => {
        console.log(app)
    }, [app])

    const defaultProps = {
        center: {
          lat: lat,
          lng: lng
        },
        zoom: 20
    };

    const handleApiLoaded = (map, maps) => {
        // use map and maps objects
    };
    const center = {
        lat: lat,
        lng: lng
      };
      const containerStyle = {
        width: '100%',
        height: '100%'
      };
      const options = {
        disableDefaultUI: true,
      };

      const openOrder = ()=>{

      }
      const showDetails = ()=>{
        setOrderDetails(!orderDetails)
      }

  return (
    <div className=" h-screen w-full ">

        {
            isLoaded ? (
                <GoogleMap
                    mapContainerStyle={containerStyle}
                    center={center}
                    zoom={20}
                    options={options}
                >
                    { /* Child components, such as markers, info windows, etc. */ }
                    <>
                    <Marker
                        position={center}
                    />
                    </>
                    
                </GoogleMap>
            ): <></>
        }
        
        <div className={`w-11/12  mx-auto px-5 py-5 rounded-2xl absolute bottom-10 left-5 shadow-lg z-40 bg-white flex flex-col`}>
            
            <div onClick={()=>setShowOrder(!showOrder)} className=" flex justify-between items-center  py-2">
                <h2 className=" font-bold text-lg ">{showOrder ? 'Orders' : 'Click to View Orders'}</h2>
                <span className=" w-10 h-10 bg-primary rounded-full text-white flex justify-center items-center">
                    { orders ? orders.length : '' }
                </span>
            </div>

            <div className={` overflow-hidden ${ showOrder ? 'min-h-2/4 pt-10' : 'h-0 '}`}>
                {
                    orders.map((item)=>(
                        <div key={item.reference_code} onClick={showDetails} className="flex p-4 rounded-xl border border-solid border-gray-300">
                            <div className=" bg-gray-200 w-20 h-15 rounded-lg mr-3"></div>
                            <div className=" flex flex-col">
                                <h2 className=" font-bold text-sm">{item.reference_code}</h2>
                                <p className=" text-sm font-semibold">
                                    <span className=" text-primary">Destination: </span> 
                                    45, Chief Collins Rd,Lekki.
                                </p>
                            </div>  
                        </div>
                    ))
                }
            </div>
        </div>

        <div className={` ${orderDetails ? 'flex':'hidden'} w-full h-screen bg-gray-900/50 fixed top-0 left-0 z-50  items-end`}>
            <div className=" w-full h-[90%] bg-white rounded-tl-3xl rounded-tr-3xl pt-10 px-8  relative">
                <button onClick={()=>setOrderDetails(false)} className=" absolute top-5 right-5 w-10 h-10 flex justify-center items-center rounded-full bg-slate-200"><MdOutlineClose/></button>
                <div className=" mb-5">
                    <h2 className=" font-bold text-3xl">Great Job!</h2>
                    <p className=" text-md">Customer Information</p>
                </div>
                <div className="overflow-auto w-full h-full pb-20">
                    <h3 className=" mb-5 font-bold text-xl">Destination</h3>
                    <div className=" mb-5">

                        <div className=" flex items-center mb-10 relative">
                            <span className=" after:h-10 after:border-l-4 after:border-dashed after:border-gray-300 after:absolute after:top-11 mr-5 w-10 h-10 bg-primary rounded-full text-white flex justify-center items-center">0</span>
                            <h3 className=" font-bold capitalize text-gray-700">Lekki Office </h3>
                        </div>
                        <div className=" flex items-center mb-7 relative">
                            <span className=" mr-5 w-10 h-10 bg-primary rounded-full text-white flex justify-center items-center">0</span>
                            <h3 className=" font-bold capitalize text-gray-700">45, Chief Collins Street, Lekki Phase 1.</h3>
                        </div>
                    </div>
                    <h3 className=" font-bold text-xl mb-5">Delivery Information</h3>
                    <div className=" flex items-center w-full mb-3 border-b border-solid border-gray-300 py-5">
                        <div className=" mr-7 text-3xl text-gray-600">
                            <FiPhone/>
                        </div>
                        <div className="">
                            <h2 className="font-bold text-lg mb-2">Mrs Shade Peters </h2>
                            <h2 className="font-medium">+234 812 345 6789</h2>
                        </div>
                    </div>
                    <div className=" flex items-center w-full mb-3 border-b border-solid border-gray-300 py-5">
                        <div className=" mr-7 text-3xl text-gray-600">
                            <FiHome/>
                        </div>
                        <div className="">
                            <h2 className="font-bold text-lg mb-2">Delivery Address</h2>
                            <h2 className="font-medium">45, Chief Collins Street, Lekki Phase 1.</h2>
                        </div>
                    </div>
                    <div className=" flex items-center w-full mb-3 border-b border-solid border-gray-300 py-5">
                        <div className=" mr-7 text-3xl text-gray-600">
                            <FaRegStickyNote/>
                        </div>
                        <div className="">
                            <h2 className=" font-bold text-lg mb-2">Delivery Note</h2>
                            <h2 className=" font-medium">Kindly deliver to my security man  Abdul</h2>
                        </div>
                    </div>
                    <div className=" mb-10">
                        <button type='submit'  className=' w-full mt-5 py-3 bg-primary rounded-full text-white font-medium text-xl'>Mark as Delivered </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Map