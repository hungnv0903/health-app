import { ErrorMessage, Field, FieldArray, FieldArrayRenderProps, Form, Formik,FormikProps, } from "formik";
import React, {useEffect, useState } from "react";
import countries from '../../data/countries.json';
import axios from "axios";
import { URL_API } from "../../util/data";
import { createID, fromSchema } from "./validate";
import { useNavigate } from "react-router-dom";

interface ITravel {
  departureDate: string;
  immigrationDate: string;
  departure: string;
  destination: string;

}

interface UserForm {
  fullName: string;
  object: string;
  dateOfBirth: string;
  gender: string;
  nationId: string;
  nationality: string;
  province: string;
  provinceName: string;
  district: string;
  address: string;
  email: string;
  mobile: string;
  symptoms: any[];
  vaccines: string;
  travel:ITravel[];
}

const FormPage = () => {

  const initialValues:UserForm = {
    fullName: '',
    object: '',
    dateOfBirth: '',
    gender: '',
    nationality: '',
    nationId: '',
    province: '',
    provinceName:'',
    district: '',
    address: '',
    email: '',
    mobile: '',
    symptoms: [],  
    vaccines: '',  
    travel: [], 
  };

  const [province, setProvince] = useState<any>([]);
  const [selectProvinceId, setSelectProvinceId] = useState<string>('0')
  const [selectProvinceName , setSelectProvinceName] = useState<string>('') ; 
  const [distrit, setDistrict] = useState<any>([])
  const [dataForm , setDataForm] = useState<any>([])

  useEffect(() => {
    const dataFormLocalstorage:string | null = localStorage.getItem('Formdata') ;
    if(dataFormLocalstorage!==null){
      const arrDataFormLocalstorage = JSON.parse(dataFormLocalstorage) ;  
      setDataForm(arrDataFormLocalstorage) ; 
    }
    const fetchDataProvince = async () => {
      await axios.get(URL_API, {
        headers: {
          'Content-Type': 'application/json',
        }
      })
        .then((response) => setProvince(response.data.results))
        .catch((error) => console.log(error))

    }
    fetchDataProvince();
  }, [])

  const handleProvince = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectProvinceId(event.target.value)
  }

  useEffect(() => {
    const fetchDataDistrit = async () => {
      await axios.get(URL_API + `district/${selectProvinceId}`, {
        headers: {
          'Content-Type': 'application/json',
        }
      })
        .then((response) => setDistrict(response.data.results))
        .catch((error) => console.log(error))
    }

    fetchDataDistrit();

    const selectprovince = province.find((item:any)=>item.province_id===selectProvinceId) ; 
    setSelectProvinceName(selectprovince?.province_name) ; 

  }, [selectProvinceId])


  const handleFormData = (values:any)=>{
    const newValue = {
      ...values ,provinceName:selectProvinceName ,
       id:`_${createID()}`
    } 
    const newDataForm = [...dataForm , newValue] ; 
    setDataForm(newDataForm) ;
    localStorage.setItem('Formdata',JSON.stringify(newDataForm)) ; 
  }


  const handleSubmit = async (values:UserForm) => {
        await handleFormData(values) ; 
        navigate('/table') ; 
   }



   const navigate = useNavigate() ; 


  return (
    <div className="row">
      <Formik
        initialValues={initialValues}
        onSubmit={handleSubmit}
        validationSchema={fromSchema}
      >
        {(FormikProps:FormikProps<UserForm>) => (
          <Form className="col-12">
            <h2 className="text-success">
              MEDICAL DECLARATION FORM FOR FOREIGN ENTRY
            </h2>
            {/* Presonal information */}
            <div className="row">
              <div className="row my-4">
                <span className="fw-bold fs-5 text-start">
                  Personal information:
                </span>
                <div className="form-group">
                  <label
                    htmlFor="fullName"
                    className="float-start fw-normal my-2"
                  >
                    FullName<span className="text-danger">*</span>
                  </label>
                  <Field
                    type="text"
                    name="fullName"
                    placeholder="FullName..."
                    className={`form-control ${FormikProps.touched.fullName && FormikProps.errors.fullName?'border-danger':''} `}
                  ></Field>
                  <ErrorMessage name='fullName' component='span' className='float-start text-danger fs-6 mt-1'></ErrorMessage>
                </div>
              </div>
              <div className="row my-4">
                <div className="col-6 form-group">
                  <label
                    htmlFor="object"
                    className="float-start fw-normal my-2"
                  >
                    Object<span className="text-danger">*</span>
                  </label>
                  <Field
                    component="select"
                    name="object"
                    className={`form-select ${FormikProps.touched.object && FormikProps.errors.object?'border-danger':''} `}
                  >
                    <option value="" >
                      ---Choose
                    </option>
                    <option value="Expert">Expert</option>
                    <option value="Vietnamese">Vietnamese</option>
                    <option value=" InternationalStudent">International Student</option>
                    <option value="Other">Other</option>
                  </Field>
                  <ErrorMessage name='object' component='span' className='float-start text-danger fs-6 mt-1'></ErrorMessage>
                </div>

                {/* Date of birth */}
                <div className="col-3 form-group">
                  <label
                    htmlFor="dateOfBrith"
                    className="float-start fw-normal my-2"
                  >
                    Date of birth<span className="text-danger"></span>
                  </label>
                  <Field
                    type="date"
                    name="dateOfBirth"
                    className={`form-control ${FormikProps.touched.dateOfBirth && FormikProps.errors.dateOfBirth?'border-danger':''} `}
                  ></Field>
                   <ErrorMessage name='dateOfBirth' component='span' className='float-start text-danger fs-6 mt-1'></ErrorMessage>
                </div>

                {/* Gender */}
                <div className="col-3 form-group">
                  <label
                    htmlFor="gender"
                    className="float-start fw-normal my-2"
                  >
                    Gender<span className="text-danger">*</span>
                  </label>
                  <Field
                    component="select"
                    name="gender"               
                    className={`form-select ${FormikProps.touched.gender && FormikProps.errors.gender?'border-danger':''} `}
                  >
                    <option value="" >
                      ---Choose
                    </option>
                    <option value="Made">Made</option>
                    <option value="Femade">Femade</option>
                    <option value="Other">Other</option>
                  </Field>
                  <ErrorMessage name='gender' component='span' className='float-start text-danger fs-6 mt-1'></ErrorMessage>
                </div>
              </div>
              <div className="row my-4">
                {/* Nationality */}
                <div className="col-6 form-group">
                  <label
                    htmlFor="nationality"
                    className="float-start fw-normal my-2"
                  >
                    Nationality<span className="text-danger">*</span>
                  </label>
                  <Field
                    component="select"
                    name="nationality"
                    className={`form-select ${FormikProps.touched.nationality && FormikProps.errors.nationality?'border-danger':''} `}
                  >
                    <option value="" >
                      ---Choose
                    </option>
                    {countries.map((countrie, index) => (
                      <option key={index} value={countrie.name}>{countrie.name}</option>
                    ))}
                  </Field>
                  <ErrorMessage name='nationality' component='span' className='float-start text-danger fs-6 mt-1'></ErrorMessage>
                </div>
                <div className="col-6 form-group">
                  <label
                    htmlFor="fullName"
                    className="float-start fw-normal my-2"
                  >
                    NationID or Passport ID
                    <span className="text-danger">*</span>
                  </label>
                  <Field
                    type="text"
                    name="nationId"
                    placeholder="NationID or Passport ID"
                    className={`form-control ${FormikProps.touched.nationId && FormikProps.errors.nationId?'border-danger':''} `}
                  ></Field>
                  <ErrorMessage name='nationId' component='span' className='float-start text-danger fs-6 mt-1'></ErrorMessage>
                </div>
              </div>
            </div>

            {/* Travel */}
            <div className="row my-4">
              <span className="fw-bold fs-5 text-start">Travel:</span>
              <FieldArray name="travel">
                {(arrayHelper: FieldArrayRenderProps) => (
                  <div className="form-group">
                    {FormikProps.values.travel.map((travelItem: any, index: number) => (

                      <div key={index} className="my-4">
                        {travelItem && (
                          <div>
                            <div className="float-start col-12">
                              <span className="fw-bold fs-6 text-primary float-start ">Travel:{index + 1}</span>
                            </div>
                            <div className="row my-4">
                              <div className="col-6 form-group">
                                <label
                                  htmlFor={`travel[${index}].departureDate`}
                                  className="float-start fw-normal my-2"
                                >
                                  Departure Date<span className="text-danger"></span>
                                </label>
                                <Field
                                  type="date"
                                  name={`travel[${index}].departureDate`}
                                  className="form-control"
                              
                                ></Field>
                                <ErrorMessage name={`travel[${index}].departureDate`} component='span' className='float-start text-danger fs-6 mt-1'></ErrorMessage>
                              </div>
                              <div className="col-6 form-group">
                                <label
                                  htmlFor={`travel[${index}].immigrationDate`}
                                  className="float-start fw-normal my-2"
                                >
                                  Immigration Date<span className="text-danger"></span>
                                </label>
                                <Field
                                  type="date"
                                  name={`travel[${index}].immigrationDate`}
                                  className="form-control"
                                  placeholder=""
                                ></Field>
                                <ErrorMessage name={`travel[${index}].immigrationDate`} component='span' className='float-start text-danger fs-6 mt-1'></ErrorMessage>
                              </div>
                            </div>
                            <div className="row my-4">
                              <div className="col-6 form-group">
                                <label
                                  htmlFor={`travel[${index}].departure`}
                                  className="float-start fw-normal my-2"
                                >
                                  Departure<span className="text-danger">*</span>
                                </label>
                                <Field
                                  component="select"
                                  name={`travel[${index}].departure`}
                                  className="form-select"
                                  placeholder=""
                                >
                                  <option value="" >
                                    ---Choose
                                  </option>
                                  {countries.map((countrie, index) => (
                                    <option key={index} value={countrie.name}>{countrie.name}</option>
                                  ))}
                                </Field>
                                <ErrorMessage name={`travel[${index}].departure`} component='span' className='float-start text-danger fs-6 mt-1'></ErrorMessage>
                              </div>
                              <div className="col-6 form-group">
                                <label
                                  htmlFor={`travel[${index}].destination`}
                                  className="float-start fw-normal my-2"
                                >
                                  Destination<span className="text-danger">*</span>
                                </label>
                                <Field
                                  component="select"
                                  name={`travel[${index}].destination`}
                                  className="form-select"
                                  placeholder=""
                                >
                                  <option value="" >
                                    ---Choose
                                  </option>
                                  {countries.map((countrie, index) => (
                                    <option key={index} value={countrie.name}>{countrie.name}</option>
                                  ))}
                                </Field>
                                <ErrorMessage name={`travel[${index}].destination`} component='span' className='float-start text-danger fs-6 mt-1'></ErrorMessage>
                              </div>
                            
                            </div>

                            {FormikProps.values.travel.length !== 0 && (
                              <div className="d-flex align-items-center my-4">
                                <button className="btn btn-warning me-4" type="button"
                                onClick={() => arrayHelper.push({departureDate: '', immigrationDate: '', departure: '', destination: '' })}>Add more</button>
                                <button type="button" className="btn btn-danger" onClick={() =>{

                                
                                  if(travelItem.destination!=='' || travelItem.departure!=''
                                    || travelItem.immigrationDate!=='' || travelItem.departureDate!=='' ){
                                       const popup =  confirm("Do you want to remove?") ;
                                       if(popup){
                                         arrayHelper.remove(index)
                                       }
                                    
                                    }else{
                                      arrayHelper.remove(index)
                                    }
                                }}>Delete</button>
                              </div>
                            )}
                          </div>
                        )}

                      </div>
                    ))}

                    {FormikProps.values.travel.length === 0 && (
                      <div className="d-flex align-items-center">
                        <p className="me-2 fw-semibold m-0">
                          Do you travel in the last 14 days ?
                        </p>
                        <button className="btn btn-warning" 
                        onClick={() => arrayHelper.push({departureDate: '', immigrationDate: '', departure: '', destination: '' })}>Add more</button>
                      </div>
                    )}

                  </div>
                )}

              </FieldArray>

            </div>

            {/* Contact */}
            <div className="row">
              <div className="row my-4">
                <span className="fw-bold fs-5 text-start">Contact:</span>
                <div className="col-6 form-group">
                  {/* Province */}
                  <label
                    htmlFor="province"
                    className="float-start fw-normal my-2"
                  >
                    Province<span className="text-danger">*</span>
                  </label>
                  <Field
                    component="select"
                    name="province"
                    className={`form-select ${FormikProps.touched.province && FormikProps.errors.province?'border-danger':''} `}
                    onChange={(event: React.ChangeEvent<HTMLSelectElement>) => {
                      FormikProps.handleChange(event);
                      handleProvince(event);
                    }}
                  >
                    <option value="">
                      ---Choose
                    </option>
                    {province && province.map((item: any, index: number) => (
                      <option key={index} value={item.province_id}>{item.province_name}</option>
                    ))}
                  </Field>
                  <ErrorMessage name='province' component='span' className='float-start text-danger fs-6 mt-1'></ErrorMessage>
                </div>
                <div className="col-6 form-group">
                  <label
                    htmlFor="district"
                    className="float-start fw-normal my-2"
                  >
                    District<span className="text-danger">*</span>
                  </label>
                  <Field
                    component="select"
                    name="district"
                    className={`form-select ${FormikProps.touched.district && FormikProps.errors.district?'border-danger':''} `}
                  >
                    <option value="" >
                      ---Choose
                    </option>
                    {distrit && (
                      distrit.map((item: any, index: number) => (
                        <option key={index} value={item.district_name}>{item.district_name}</option>
                      ))
                    )}

                  </Field>
                  <ErrorMessage name='district' component='span' className='float-start text-danger fs-6 mt-1'></ErrorMessage>
                </div>
              </div>
              <div className="row my-4">
                <div className="col-6 form-group">
                  <label
                    htmlFor="address"
                    className="float-start fw-normal my-2"
                  >
                    Address<span className="text-danger">*</span>
                  </label>
                  <Field
                    type="text"
                    name="address"
                    className={`form-control ${FormikProps.touched.address && FormikProps.errors.address?'border-danger':''} `}
                    placeholder="Address..."
                  ></Field>
                    <ErrorMessage name='address' component='span' className='float-start text-danger fs-6 mt-1'></ErrorMessage>
                </div>
                <div className="col-3 form-group">
                  <label htmlFor="email" className="float-start fw-normal my-2">
                    Email<span className="text-danger">*</span>
                  </label>
                  <Field
                    type="text"
                    name="email"
                    className={`form-control ${FormikProps.touched.email && FormikProps.errors.email?'border-danger':''} `}
                    placeholder="Email..."
                  ></Field>
                    <ErrorMessage name='email' component='span' className='float-start text-danger fs-6 mt-1'></ErrorMessage>
                </div>
                <div className="col-3 form-group">
                  <label
                    htmlFor="mobile"
                    className="float-start fw-normal my-2"
                  >
                    Mobile<span className="text-danger">*</span>
                  </label>
                  <Field
                    type="text"
                    name="mobile"
                    className={`form-control ${FormikProps.touched.mobile && FormikProps.errors.mobile?'border-danger':''} `}
                    placeholder="Mobile..."
                  ></Field>
                    <ErrorMessage name='mobile' component='span' className='float-start text-danger fs-6 mt-1'></ErrorMessage>
                </div>
              </div>
            </div>

            {/* Symptoms */}
            <div className="row">
              <div className="row my-4">
                <span className="fw-bold fs-5 text-start">Symptoms:</span>
                <div className="d-flex flex-column flex-md-row">
                  <div className="col-md-2 col-12">
                    <span className="float-start fw-normal my-2 text-start">
                      Do you have any following symptoms?:
                    </span>
                  </div>
                  <div
                    className="col-12 mx-md-auto col-md-8 d-flex align-items-start "
                    role="group"
                    aria-labelledby="checkbox-group"
                  >
                    <label className="mx-lg-4">
                      <Field
                        type="checkbox"
                        name="symptoms"
                        value="fiber"
                        className="mx-2 form-check-input"
                      />
                      Fiber
                    </label>
                    <label className="mx-lg-4">
                      <Field
                        type="checkbox"
                        name="symptoms"
                        value="fever"
                        className="mx-2 form-check-input"
                      />
                      Fever
                    </label>
                    <label className="mx-lg-4">
                      <Field
                        type="checkbox"
                        name="symptoms"
                        value="sorethroat"
                        className="mx-2 form-check-input"
                      />
                      Sore throat
                    </label>
                    <label className="mx-lg-4">
                      <Field
                        type="checkbox"
                        name="symptoms"
                        value="difficultyOfBreathing"
                        className="mx-2 form-check-input"
                      />
                      Difficulty of breathing
                    </label>
                  </div>
                </div>
              </div>
            </div>

            {/* Vaccines */}
            <div className="row">
              <div className="row my-4">
                <span className="fw-bold fs-5 text-start">Vaccines:</span>
                <div className="d-flex flex-column flex-md-row">
                  <div className="col-md-2 col-12">
                    <span className="float-start fw-normal my-2 text-start">
                      Which one would you like to vaccinate ?:
                    </span>
                  </div>
                  <div
                    className="col-12 mx-md-auto col-md-8 d-flex align-items-start "
                    role="group"
                    aria-labelledby="my-radio-group"
                  >
                    <label className="mx-lg-4">
                      <Field
                        type="radio"
                        name="vaccines"
                        value="none"
                        className="mx-2 form-check-input"
                        checked
                      />
                      None
                    </label>
                    <label className="mx-lg-4">
                      <Field
                        type="radio"
                        name="vaccines"
                        value="astraZenecca"
                        className="mx-2 form-check-input"
                      />
                      Astra Zenecca
                    </label>
                    <label className="mx-lg-4">
                      <Field
                        type="radio"
                        name="vaccines"
                        value="pfizer"
                        className="mx-2 form-check-input"
                      />
                      Pfizer
                    </label>
                    <label className="mx-lg-4">
                      <Field
                        type="radio"
                        name="vaccines"
                        value="moderna"
                        className="mx-2 form-check-input"
                      />
                      Moderna
                    </label>
                    <label className="mx-lg-4">
                      <Field
                        type="radio"
                        name="vaccines"
                        value="sinopharm"
                        className="mx-2 form-check-input"
                      />
                      Sinopharm
                    </label>
                  </div>
                </div>
              </div>
            </div>

            {/* botton */}
            <div className="row">
              <div className="d-flex">
                <div className="me-4">
                  <button type="submit" className="btn btn-success fs-4">Submit</button>
                </div>
                <div className="me-4">
                  <button type="button" className="btn btn-danger fs-4" onClick={()=>{navigate('/table')}}>Cancel</button>
                </div>
                <div className="me-4">
                  <button type="button" className="btn btn-secondary fs-4" onClick={()=>FormikProps.resetForm()}>Reset</button>
                </div>
              </div>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default FormPage;
