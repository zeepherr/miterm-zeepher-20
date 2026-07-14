import { create } from "zustand";
import {persist} from "zustand/middleware"



export const useUserStore = create(
    persist(
        (set,get)=>({
            user:null,
            token:null,
            setUser: (user)=> set({user}),
            setToken:(token)=>set({token}),
            logOut: ()=> set({user:null,token:null})

        }),
        {
            name:"user-store"
        }
    )
)