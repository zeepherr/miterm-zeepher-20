import { create } from "axios";
import { useUserStore } from "../stores/userStore";


const api = create({
    baseURL : "https://mt-todolist-backend.onrender.com",
    headers :{
        "Content-Type" : "application/json"
    }

})

api.interceptors.request.use(
    (config)=>{
        const token = useUserStore.getState().token
        if(token){
            config.headers.Authorization =`Bearer ${token}`
        }
        return config
    },
    (error)=>{
        return Promise.reject(error)
    }
)

export default api