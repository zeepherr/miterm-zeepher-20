import api from ".";




export const createTodo =async(payload)=>{
    try{
        const res = await api.post(`/todosv2`,payload)
       return res.data
    }catch (error){
        throw new Response(error)
    }
}

// export const deleteTodo =async(todoId)=>{
//     try{
//         const res = await api.delete(`/todosv2/delete/${todoId}`)
//        return res.data
//     }catch (error){
//         throw new Response(error)
//     }
// }
export const updateTodo =async(payload,todoId)=>{
    try{
        const res = await api.patch(`/todosv2/update/${todoId}`,payload)
       return res.data
    }catch (error){
        throw new Response(error)
    }
}
