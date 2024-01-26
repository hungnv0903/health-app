import React, { Suspense } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import FormPage from '../pages/FormPage/FormPage'
import ManagementPage from '../pages/ManagementPage/ManagementPage'
import { NavLink } from 'react-router-dom'
import FormEdit from '../pages/FormPage/FormEdit'

const Router = () => {
  return (
    <>
      <Suspense>
        <NavLink to='/'></NavLink>
        <NavLink to='/table'></NavLink>
        <NavLink to='/declaration'></NavLink>
        <Routes>
          <Route path='/' element={<Navigate to="/table"></Navigate>} ></Route>
          <Route path='/table' element={<ManagementPage></ManagementPage>}></Route>
          <Route path='/declaration' element={<FormPage></FormPage>}></Route>
          <Route path='/edit/:userId' element={<FormEdit></FormEdit>}></Route>
        </Routes>
      </Suspense>
    </>
  )
}

export default Router ; 