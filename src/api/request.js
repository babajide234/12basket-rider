import axios from "axios";
import { BASE_URL } from "./common";

const instance = axios.create({
    baseURL:BASE_URL
})

export const changeStatus = async (data) =>{
    return instance.post('rider/update-status', data)
}

export const updateLocation = async (data) =>{
    return instance.post('rider/update-location', data)
}

export const getDetails = async (data) =>{
    return instance.post('rider/details', data)
}

export const login = async (data) =>{
    return instance.post('account/login', data)
}

export const getOrders = async (data) =>{
    return instance.post('/order/details', data)
}

export const acceptOrder = async (data) =>{
    return instance.post('account/login', data)
}
export const details = async (data) =>{
    return instance.post('Order/details', data)
}