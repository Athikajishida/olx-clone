import React, { useEffect, useState } from 'react';

import './View.css';
import { getUser } from '../../Firebase/Config';
import Header from '../Header/Header';

import Footer from '../Footer/Footer'


function View() {
  const [postInfo, setPostInfo] = useState({})
  const [userInfo, setUserInfo] = useState({})

  useEffect(() => {
    const storedProduct = JSON.parse(localStorage.getItem('product'));
    setPostInfo(storedProduct)

    const {userId} = storedProduct
    const userData = getUser(userId);
    userData.then((response) => {
      setUserInfo(response[0])
    })
  }, [])

  return (
    <>
      <Header />
      
      <div className="viewParentDiv">
        <div className="imageShowDiv">
          <img
            src={postInfo.imageUrl}
            alt=""
          />
        </div>
        <div className="rightSection">
          <div className="productDetails">
            <p>&#x20B9; {postInfo.price}</p>
            <span>{postInfo.name}</span>
            <p>{postInfo.category}</p>
            <span>{postInfo.createdAt}</span>
          </div>
          <div className="contactDetails">
            <p>Seller details</p>
            <p>{userInfo.name}</p>
            <p>{userInfo.phoneNumber}</p>
          </div>
        </div>
      </div>
      <Footer />
    </>
    
  );
}
export default View;
