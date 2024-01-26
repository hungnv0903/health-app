import React, { useEffect } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'

const Layout = () => {
   const navigate = useNavigate() ; 
  //  useEffect(()=>{
  //   // navigate('/table') ; 
  //   navigate('/declaration') ; 
  //  },[])
  return (
    <Outlet></Outlet>
  )
}

export default Layout