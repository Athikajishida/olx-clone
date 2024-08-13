import React from 'react';

import './Footer.css';

function Footer() {
  return (
    <div className="footerParentDiv">
      <div className="content">
        <div>
          <div className="heading">
            POPULAR LOCATIONS
          </div>
          <div className="list">
            <ul>
              <li>kolkata</li>
              <li>Mumbai</li>
              <li>Chennai</li>
              <li>Pune</li>
            </ul>
          </div>
        </div>
        <div>
          <div className="heading">
            TRENDING LOCATIONS
          </div>
          <div className="list">
            <ul>
              <li>Bhubaneshwar</li>
              <li>Hyderabad</li>
              <li>Chandigarh</li>
              <li>Nashik</li>
            </ul>
          </div>
        </div>
        <div>
          <div className="heading">
            ABOUT US
          </div>
          <div className="list">
            <ul>
              <li>Contact Us</li>
              <li>Tech@OLX</li>
            </ul>
          </div>
        </div>
        <div>
          <div className="heading">
            OLX
          </div>
          <div className="list">
            <ul>
              <li>Blog</li>
              <li>Help</li>
              <li>Sitemap</li>
              <li>Legal & Privacy information</li>
              <li>Vulnerability Program</li>
            </ul>
          </div>
        </div>
        <div>
          <div className="heading">
            FOLLOW US
          </div>
          <div className="list">
            <ul>
              <li>Help</li>
              <li>Sitemap</li>
              <li>Legal & Privacy information</li>
            </ul>
          </div>
        </div>
      </div>
      <div className="footer">
        <div className='footer-top'>
          <div className='footer-first'>
            <img src="https://statics.olx.in/external/base/img/cartrade/logo/cartrade_tech.svg?v=1" className="helloworld" alt="Car Trade"></img>
          </div>
          
          <img src="https://statics.olx.in/external/base/img/cartrade/logo/olx.svg?v=1" className='other' alt="olx"/>
          <img src="https://statics.olx.in/external/base/img/cartrade/logo/carwale.svg?v=1" className='other' alt="carwale"></img>
          <img src="https://statics.olx.in/external/base/img/cartrade/logo/bikewale.svg?v=1" className='other' alt="bikewale"></img>
          <img src="https://statics.olx.in/external/base/img/cartrade/logo/cartrade.svg?v=1" className='other' alt="cartrade"></img>
          <img src="https://statics.olx.in/external/base/img/cartrade/logo/mobility.svg?v=1" className='other' alt="mobility_outlook"></img>
        </div>
        <div className='footer-bottom'>
          <div>Help - Sitemap</div>
          <div>All rights reserved © 2006-2024 OLX</div>
        </div>
      
        
      </div>
    </div>
  );
}

export default Footer;
