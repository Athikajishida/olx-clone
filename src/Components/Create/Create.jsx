import React, { Fragment, useContext, useEffect, useState } from 'react';
import * as Yup from 'yup'

import './Create.css';
import Header from '../Header/Header';
import { UserContext } from '../../contexts/userProvider';
import { useNavigate } from 'react-router-dom';
import { productUpload } from '../../Firebase/Config';
import Footer from '../Footer/Footer'
const Create = () => {
  const [errors,setErrors]=useState();
  const [formData,setFormData] = useState({
    productName:'',
    category:'',
    price:''
  })
  // const [productName, setProductName] = useState('')
  // const [category, setCategory] = useState('')
  // const [price, setPrice] = useState('')
  const [image, setImage] = useState(null)
  const navigagte = useNavigate()
  const {user} = useContext(UserContext)

  useEffect(() => {
    if (!user) {
      navigagte('/login')
    }
  }, [])
  const validationSchema = Yup.object({
    productName:Yup.string().required('Product name is required'),
    category:Yup.string().required('Product category is required'),
    price:Yup.string().required('Product price is required'),
  })
 //const p1 = new Promise((reso))
  const handleSubmit = async (e) => {
    e.preventDefault();
    try{
      await validationSchema.validate(formData,{abortEarly:false});
      if (!user) {
        navigagte('/login')
        return
      } else {
          const productUploaded = await productUpload(image, formData.productName, formData.category, formData.price, user)
          if (productUploaded) {
            navigagte('/')
          }
      }
    }catch(e){
      const newErrors = {};
      e.inner.forEach(err=>{
        newErrors[err.path] = err.message;
      })

      setErrors(newErrors)
    }
    
  }

  const handleChange = (e)=>{
      const {name,value} = e.target;
      setFormData({
        ...formData,
        [name] : value
      })
  }

  return (
    <Fragment>
      <Header />
      <div className='main-div'>
        <div className="centerDiv">
      
          <br />
          <input
            className="input"
            type="text"
            name="productName"
            value={formData.productName}
            onChange={handleChange}
            placeholder='Name'
          />
          {errors?<div className='error'>{errors.productName}</div>:<></>}
          <br />
  
          <br />
          <input
            className="input"
            type="text"
            name="category"
            value={formData.category}
            onChange={handleChange}
            placeholder='Category'
          />
          {errors&&<div className='error'>{errors.category}</div>}
          <br />
          
          <br />
          <input 
          className="input" 
          type="number" 
          name="price" 
          value={formData.price}
          onChange={handleChange} placeholder='Price'/>
          {errors&&<div className='error'>{errors.price}</div>}
          <br />
          <br />
          <img alt="Posts" width="200px" height="200px" src={image ? URL.createObjectURL(image):''}></img>
          <br />
          <input onChange={(e) => {setImage(e.target.files[0])}} type="file" />
          <br />
          <button onClick={handleSubmit} className="uploadBtn">upload and Submit</button>
        </div>
      </div>
        
        <Footer />
    </Fragment>
  );
};

export default Create;
