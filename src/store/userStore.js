import { create } from "zustand";
import { persist, createJSONStorage } from 'zustand/middleware'
import { login,logout,updateName,getDetails,updatePwd } from "../api/request";
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
            getDetails: () => {
                getDetails({token:get().token})
                .then((res)=> {
                    console.log(res);
                    if(res.data.status == 'success'){
                        get().setDetails(res.data.data)
                    }
                })
                .catch((err) => {
                    console.error(err);
                })
                .finally((res) => {
                    loaderSlice.setState({ isLoading: false });
                });
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
                logout(
                    {
                        token: get().token
                    }
                ).then((res)=>{
                    if(res.data.status == 'success'){
                        set(state => ({ ...state, isLoggedIn: false }))
                        set(state => ({ ...state, token: '' }))
                        set(state => ({ ...state, details: {} }))
                    }
                })
            },
            updateName: (data) => {
                loaderSlice.setState({ isLoading: true });
                updateName(data)
                .then((res)=> {
                    console.log(res);
                    if(res.data.status == 'success'){
                        loaderSlice.setState({ message: res.data.message });
                        loaderSlice.setState({ type: res.data.status });
                        get().getDetails()
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
            updatePwd: (data) => {
                loaderSlice.setState({ isLoading: true });
                updatePwd(data)
                .then((res)=> {
                    console.log(res);
                    if(res.data.status == 'success'){
                        loaderSlice.setState({ message: res.data.message });
                        loaderSlice.setState({ type: res.data.status });
                        get().getDetails()
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
        }),
        {
            name:'12basket-rider',
            storage: createJSONStorage(() => sessionStorage)
        }
    )
);

export default userSlice;