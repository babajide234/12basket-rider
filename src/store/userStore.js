import { create } from "zustand";
import { persist, createJSONStorage } from 'zustand/middleware'
import { login } from "../api/request";
import loaderSlice from './loaderStore';

const userSlice = create(
    persist(
        (set,get)=>({
            isLoggedIn:false,
            token:'',
            details: {},
            setDetails: (data) => {
                set(state => ({ ...state, details: data }))
            },
            getDetails: (data) => {
                 
            },
            login: async (data)=>{
                loaderSlice.setState({ isLoading: true });
                login(data)
                .then((res)=> {
                    if(res.data.status == 'success'){
                        set(state => ({ ...state, token: res.data.token }))
                        set(state => ({ ...state, isLoggedIn: true }))
                        loaderSlice.setState({ message: res.data.message });
                        loaderSlice.setState({ type: res.data.status });
                        get().setDetails(res.data.data);
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
            },
            logout:() => {
                set(state => ({ ...state, isLoggedIn: false }))
                set(state => ({ ...state, token: '' }))
                set(state => ({ ...state, details: {} }))
            },
        }),
        {
            name:'12basket-rider',
            storage: createJSONStorage(() => sessionStorage)
        }
    )
);

export default userSlice;