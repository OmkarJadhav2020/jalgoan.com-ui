'use client';

import React from 'react';
import './BusinessCompo.css';
import Link from 'next/link';

function BusinessDetailsCard({ businessData }) {
  const djangoApi = process.env.NEXT_PUBLIC_DJANGO_API;
  
  const handleShare = () => {
    const currentUrl = window.location.href; // Get current URL
  
    navigator.clipboard.writeText(currentUrl).then(() => {
      // Successfully copied to clipboard
      alert('URL copied to clipboard!');
    }).catch((error) => {
      // Error occurred
      console.error('Failed to copy URL:', error);
    });
  };
  
  return (
    <div className="business_details_card">
      <div className="business_card">
        <div className="business_info">
          <p className='business_name'>
            <span>{businessData.business_name}</span>
            <i className='bx bx-heart'></i>
          </p>
          <div className="business_rating">
            <span>5</span>
            <div className="rating">
              <i className='bx bxs-star'></i>
              <i className='bx bxs-star'></i>
              <i className='bx bxs-star'></i>
              <i className='bx bxs-star'></i>
              <i className='bx bxs-star'></i>
            </div>
          </div>
          <div className="business_location">
            <i className='bx bxs-map'></i> <p>{businessData.business_address}</p>
          </div>
          <div className="business_keywords">
            <span>{businessData.sub_domain_one}</span>
            <span>{businessData.sub_domain_two}</span>
            <span>{businessData.sub_domain_three}</span>
          </div>
          <div className="business_contact">
            <a href={`tel:${businessData.business_no}`} className='business_call_btn' target="_blank" rel="noopener noreferrer">
              <i className='bx bxs-phone'></i> Call Us
            </a>
            <a href={`https://wa.me/+91${businessData.business_no}`} target="_blank" rel="noopener noreferrer">
              <p><i className='bx bxl-whatsapp'></i> Whatsapp</p>
            </a>
            <a href={businessData.gmap_link} target="_blank" rel="noopener noreferrer">
              <p><i className='bx bxs-direction-right'></i> Direction</p>
            </a>
            <a onClick={handleShare}>
              <p><i className='bx bx-share-alt'></i> <span>Share</span></p>
            </a>
          </div>
        </div>
        <div className="business_img">
          <img src={`${djangoApi}/${businessData.business_banner}`} alt="" />
        </div>
      </div>
    </div>
  );
}

export default BusinessDetailsCard;