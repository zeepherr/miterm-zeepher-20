import api from "."

export const login = async (payload)=>{
    const res = await api.post('/auth/login',payload)
    return res.data
}