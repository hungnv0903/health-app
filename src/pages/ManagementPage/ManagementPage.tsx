import React, { Fragment, useEffect, useState } from 'react'
import { Button, Col, Form, Table } from 'react-bootstrap'
import InputGroup from 'react-bootstrap/esm/InputGroup'
import {useNavigate } from 'react-router-dom';
import TableComponent from './TableComponent';

const ManagementPage = () => {
  const navigate = useNavigate() ; 
  const [formData  , setFormData] = useState<any>([]) ; 
  const [search , setSearch] = useState<string>('') ; 
  const [searchData, setSearchData] = useState<any>([]) ;; 
 
  useEffect(()=>{
    const dataLocalstorage:string|null = localStorage.getItem('Formdata') ; 
    if(dataLocalstorage!==null){
      const arrFormdata = JSON.parse(dataLocalstorage) ;
      setFormData(arrFormdata) ; 
    }
  },[])

  const handleDeleteItemFormData = (newformdata:any)=>{
      setFormData(newformdata) ; 
  }

  const handleSearch = (event:React.ChangeEvent<HTMLInputElement>)=>{
    const textSearch = event.target.value.toLowerCase() ; 
    setSearch(textSearch) ;  
  }

  useEffect(()=>{
    const seachFormData = [...formData] ; 
    const newSearchFormData = seachFormData.filter((item:any)=>
                        item.id.toLowerCase().includes(search) || 
                        item.fullName.toLowerCase().includes(search)|| 
                        item.object.toLowerCase().includes(search)||
                        item.gender.toLowerCase().includes(search)) ; 
     
    setSearchData(newSearchFormData) ; 

  },[search])


  return (
    <Fragment>
      <div className='row my-4'>
        <h2 className='fs-1'>Vietnam Health Declaration for foreign entry</h2>
      </div>
      <div className='row d-flex justify-content-between'>
        <div className='col-lg-4'>
          <InputGroup>
            <Form.Control
              placeholder="Search..."
              aria-label="Username"
              aria-describedby="basic-addon1"
              onChange={handleSearch}
              />
          </InputGroup>
          </div>
          <div className='col-lg-2'>
            <Button variant="success" className='float-end' onClick={()=>{navigate('/declaration')}}>New form</Button>{' '}
          </div>
      </div>
      <TableComponent formData={search?searchData:formData} onHandleDelete={handleDeleteItemFormData}></TableComponent>
      
      
      
    </Fragment>
  )
}

export default ManagementPage