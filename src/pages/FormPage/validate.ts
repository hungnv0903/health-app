import * as Yup from 'yup' ;

//create ID 
export const createID = ()=>{
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let randomString = '' ; 
  for(let i = 0 ; i<5 ; i++){
    const randomIndex = Math.floor(Math.random()*characters.length) ; 
    randomString+=characters.charAt(randomIndex) ; 
  }

  return randomString ; 
}



const travelSchema = Yup.object().shape({
    departureDate: Yup.string().required('Departure Date is required!'),
    immigrationDate: Yup.string().required('Immigration Date is required!'),
    departure: Yup.string().required('Departure is required!'),
    destination: Yup.string().required('Destination  is required!'),
  
  })
  
export const fromSchema = Yup.object().shape({
    fullName:Yup.string().required('Fullname is required!'),
    object:Yup.string().required('Object is required!'),
    dateOfBirth:Yup.string().required('Date of birth is required!'),
    gender:Yup.string().required('Gender is required!'),
    nationality:Yup.string().required('Nationality is required!'),
    nationId:Yup.string().required('NationId is required!'),
    province:Yup.string().required('Province is required!'),
    district:Yup.string().required('District is required!'),
    address:Yup.string().required('Address is required!'),
    email:Yup.string().email('Invalid email address!').required('Email is required!'),
    mobile:Yup.string().required('Mobile is required!'),
    
    travel:Yup.array().of(travelSchema),
  })
   

//   const validateForm = (values:any)=>{
//     const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/ ;
//     const mobileRegex = /^\d{10}$/u ; 
//     let error:any = {} ;
//     if(!values.fullName){
//       error.fullName = 'FullName is required!'
//     } 
//     if(!values.object){
//       error.object='Object is required!'
//     }
//     if(!values.dateOfBirth){
//       error.dateOfBirth='Date of birth is required!'
//     }
//     if(!values.gender){
//       error.gender='Gender is required!'
//     }
//     if(!values.nationality){
//       error.nationality='Nationality is required!'
//     }
//     if(!values.nationId){
//       error.nationId='NationId is required!'
//     }
//     if(!values.province){
//       error.province='Province is required!'
//     }
//     if(!values.district){
//       error.district='District is required!'
//     }
//     if(!values.address){
//       error.address='Address is required!'
//     }
//     if(!values.email){
//       error.email='Email is required!'
//     }else if(!emailRegex.test(values.email)){
//         error.email='Invalid email address!'
//     }
//     if(!values.mobile){
//       error.mobile='Mobile is required!'
//     }else if(!mobileRegex.test(values.mobile)){
//         error.mobile='Mobile must be a 10-digit number!'
//     }
   
//     return error ; 
// }
// export default validateForm ; 
 

