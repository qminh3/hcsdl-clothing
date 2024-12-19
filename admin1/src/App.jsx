
import Navbar from './commpnents/Navbar'
import Sidebar from './commpnents/Sidebar'
import { Routes,Route } from 'react-router-dom'

import { useEffect, useState } from 'react'
import Login from './commpnents/Login'

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ListCustomer from './pages/ListCustomer'
import ListEmployee from './pages/ListEmployee'
import AddEmployee from './pages/AddEmployee'
import AddCustomer from './pages/AddCustomer'
export const backendUrl = import.meta.env.VITE_BACKEND_URL
export const currency = "$"

const App = () => {
  const [token,setToken]= useState(localStorage.getItem('token') ? localStorage.getItem('token'):'')
  useEffect(()=>{
    // const token = localStorage.getItem('token')
    // setToken(token)
    localStorage.setItem('token', token)
  },[token])

  return (
    <div className='bg-gray-50 min-h-screen'>
      <ToastContainer position="top-right" autoClose={5000} />
      {token === ''? <Login setToken={setToken} />  : 
      <>
      <Navbar setToken={setToken} />
      <hr/>
      <div className='flex w-full'>
        <Sidebar/>
        <div className='w=[70%] mx-auto ml-[max(5vw,25px)] my-8 text-gray-600 text-base'>
          <Routes>
            <Route path='/list_customer' element={<ListCustomer token={token}/>}/>
            <Route path='/list_employee' element={<ListEmployee token={token}/>}/>
            <Route path='/add_employee' element={<AddEmployee token={token}/>}/>
            <Route path='/add_customer' element={<AddCustomer token={token}/>}/>
          </Routes>
        </div>
      </div>
      </>
      }
      
    </div>
  )
}

export default App
