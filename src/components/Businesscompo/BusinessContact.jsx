'use client';

import React, { useState } from 'react';
import './BusinessCompo.css';

function BusinessContact({ businessData }) {
  const [sideActive, setSideActive] = useState(true);
  
  return (
    <div className={`business_contact_container ${sideActive ? "show_contact" : ""}`}>
      <div className="show_btn" onClick={() => setSideActive(!sideActive)}>
        <i className='bx bxs-right-arrow'></i>
      </div>
      <div className="business_contact_details">
        <ul>
          <li>Business Details</li>
          <li><a href={businessData.gmap_link} target="_blank" rel="noopener noreferrer"><i className='bx bx-map'></i> Address</a></li>
          <li><a href={`tel:${businessData.business_no}`} target="_blank" rel="noopener noreferrer"><i className='bx bxs-phone'></i> Contact Number</a></li>
          <li><a href={`mailto:${businessData.business_email}`} target="_blank" rel="noopener noreferrer"><i className='bx bx-envelope'></i> Send Enquiry via Email</a></li>
          <li><a href={businessData.website_link} target="_blank" rel="noopener noreferrer"><i className='bx bx-globe'></i> Website</a></li>
          <li><a href={businessData.insta_link} target="_blank" rel="noopener noreferrer"><i className='bx bxl-instagram'></i> Instagram</a></li>
          <li><a href={businessData.facebook_link} target="_blank" rel="noopener noreferrer"><i className='bx bxl-facebook-circle'></i> Facebook</a></li>
          <li><a href="" target="_blank" rel="noopener noreferrer"><i className='bx bxs-share bx-flip-horizontal'></i>Share Profile</a></li>
        </ul>
      </div>
    </div>
  );
}

export default BusinessContact;