import { create } from "zustand";
import { getOrders } from "../api/request";
import loaderSlice from './loaderStore';

const orderSlice = create(
    (set, get) => ({
        orders:[],
        setOrder:(value)=> {
            getOrders(value)
            .then((res)=> {
                if(res.data.status == 'success'){
                    set(state => ({ ...state, orders: res.data.data }))
                    loaderSlice.setState({ message: res.data.message });
                    loaderSlice.setState({ type: res.data.status });
                } else{
                    loaderSlice.setState({ message: res.data.message });
                    loaderSlice.setState({ type: res.data.status });
                }
            })
            .catch((err) => {
                console.error(err);
            })
            .finally((res) => {
                loaderSlice.setState({ isLoading: false });
            });
        }
    })
);

export default orderSlice;