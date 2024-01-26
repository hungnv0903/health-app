import React, { Fragment, useEffect, useState } from 'react'
import { Col, Form, Table } from 'react-bootstrap'
import { NavLink } from 'react-router-dom';

interface IFormData {
  formData:any
  onHandleDelete(newformdata:any):void ; 
}

const TableComponent = ({formData,onHandleDelete}:IFormData) => {
  const [dataTable , setDataTable] = useState<any>([]) ; 
  const [select , setSelect] = useState<number>(2) ;
  const [page , setPage] = useState<number>(0) ; 
  const [arrLi , setArrli] = useState<any>([]) ; 
  const [statusPagination , setStatusPagination] = useState<number>(1)
  
  
  useEffect(()=>{ 
    setPage(Math.ceil(formData.length/select)) ; 
    const startIndex = (statusPagination-1) * select ; 
    const endIndex = startIndex + select ; 
    const newDataTable = [...formData].reverse().slice(startIndex,endIndex) ;
    setDataTable(newDataTable) ;  
  },[select , formData , statusPagination])

  const handleChangeSelect = (event:React.ChangeEvent<HTMLSelectElement>)=>{
    setSelect(parseInt(event.target.value)) ;  
  }


  useEffect(()=>{
    const newArrli = [] ; 
    for(let index = 1 ; index<=page ; index++){
      newArrli.push(
        <li key={index} className={`page-item ${statusPagination===index?'active':''}`} onClick={()=>{
          setStatusPagination(index)
          handlePagination(index) ; 
        }}><div className="page-link">{index}</div></li>
      )
    }

    setArrli(newArrli) ; 
  },[page , statusPagination])

  const handlePagination = (index:number)=>{
    setStatusPagination(index) ; 
  }

  const handlePreviousPagination = ()=>{
    if(statusPagination>1){
      setStatusPagination(statusPagination-1) ; 
    }
  }
  
  const handleNextPagination = ()=>{
    if(statusPagination<page){
      setStatusPagination(statusPagination+1) ; 
    }
  }

  const handleDelete = (id:string)=>{
      const popup = confirm(`Do you want to delete form with ID:${id}`) ; 
      if(popup){

        const newFormData = formData.filter((item:any)=>item.id!=id) ; 
        onHandleDelete(newFormData) ; 
        const jsonNewformData = JSON.stringify(newFormData) ; 
        localStorage.setItem('Formdata',jsonNewformData) ;
      }
  }


  return (
    <Fragment>
        <div className='row mt-4'>
              
        <Table bordered>
        <thead className='table-success'>
          <tr>
            <th>#</th>
            <th>Form ID</th>
            <th>Full Name</th>
            <th>Object</th>
            <th>Date Of Birth</th>
            <th>Gender</th>
            <th>Contact Province</th>
          </tr>
        </thead>
        
        <tbody>
          {statusPagination>page && (
            <tr>
              <td colSpan={7}>
                <p className='fs-4'>No Declarations</p>
              </td>
            </tr>
          )}
          {
            dataTable.map((dataItem:any , index:number)=>{
              if(index < select) {
                return (
                <tr key={index}>
                <td>{index+1}</td>
                <td >
                  <div className='d-flex flex-sm-column flex-md-row '>
                    <span>
                      <NavLink to={`/edit/${dataItem.id}`}>
                        <i className="fa-solid fa-pen-to-square me-2 text-primary"></i>
                      </NavLink>
                      <i className="fa-regular fa-trash-can me-3 text-danger" onClick={()=>handleDelete(dataItem.id)}></i>
                    </span>
                    <span>
                      {dataItem.id}
                    </span>
                  </div>
                </td>
                <td>{dataItem.fullName}</td>
                <td>{dataItem.object}</td>
                <td>{dataItem.dateOfBirth}</td>
                <td>{dataItem.gender}</td>
                <td>{dataItem.provinceName}</td>
                </tr>
                )
              }
              
            })
          }
          
        </tbody>
      </Table>
      </div>
      <div className='row mt-4'>
        <Col className=' col-12 col-sm-10 col-md-8 col-lg-6 m-auto d-flex col justify-content-center'>
          <Col className='d-flex justify-content-center align-items-center gap-3'>
          <nav aria-label="Page navigation example">
          <ul className="pagination m-auto" style={{ cursor:'pointer' }}>
              <li className="page-item"><div className={`page-link ${statusPagination>1 ? "text-primary":"text-secondary"}`} onClick={handlePreviousPagination}>Previous</div></li>
              {arrLi}
              <li className="page-item"><div className={`page-link ${statusPagination<page ? "text-primary":"text-secondary"}`} onClick={handleNextPagination}>Next</div></li>
          
          </ul>
        </nav>
          </Col>
          <Col className='d-flex align-items-center justify-content-end col-4'>
            <Form.Select defaultValue="2" aria-label="Default select example" onChange={handleChangeSelect}>
                <option value="2">2</option>
                <option value="4">4</option>
                <option value="6">6</option>
              </Form.Select>
              <label htmlFor="" className='ms-3'>Items/Page</label>
          </Col>
      </Col>
      </div>
    </Fragment>
  )
}

export default TableComponent ; 