import { create } from "zustand";
import api from "../api";

export const useTodoStore = create((set, get) => ({
  content: null,
  loading: false,

  fetchTodo: async (userId) => {
    set({ loading: true });
    try {
      const res = await api.get(`/todos/${userId}`);
      set({ content: res.data, loading: false });
    } catch (error) {
      throw new Response(error);
    }
  },
   createTodo :async(payload)=>{
    try{
        const res = await api.post(`/todosv2`,payload)
        set({content: [...get().content ,res.data]})
       return res.data
    }catch (error){
        throw new Response(error)
    }
},
  deleteTodo: async (todoId) => {
    try {
      const res = await api.delete(`/todosv2/delete/${todoId}`);
      set({ content: get().content.filter((item) => item.id !== todoId) });
      return res.data;
    } catch (error) {
      throw new Response(error);
    }
  },
  updateTodo: async (payload, todoId) => {
    try {
      const res = await api.patch(`/todosv2/update/${todoId}`, payload);
      set({content: [...get().content ,res.data]})
    } catch (error) {
      throw new Response(error);
    }
  },
}));
