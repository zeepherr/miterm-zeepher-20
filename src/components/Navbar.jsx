import React from 'react'
import { useUserStore } from '../stores/userStore'
import { useNavigate } from 'react-router'

function Navbar() {
    const navigate = useNavigate()
    const token = useUserStore(store => store.token)
    const logOut = useUserStore(store => store.logOut)
    const hdlClick = ()=>{
     logOut() 
     navigate('/login')
    }
  return (
    <div className='bg-#FFFFFF shadow-2xl w-full text-end p-3 '>
        <button onClick={hdlClick} className='py-1 px-2 rounded-xl cursor-pointer bg-blue-600/90 hover:bg-blue-600 hover:scale-105 transition-all active:bg-blue-600/10 text-white'>{token ? "LogOut" : "Sign In"}</button>
    </div>
  )
}

export default Navbar