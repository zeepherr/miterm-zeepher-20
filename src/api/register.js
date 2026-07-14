import api from "."


export const register = async (payload)=>{
    const res = await api.post('/auth/register',payload)
    return res.data
}