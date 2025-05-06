'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import './Categorysection.css';
import BusinessCard from './BusinessCard';
import axios from 'axios';

function Categorysection({ businessData, mainCategory, filterSubCategory }) {
  const djangoApi = process.env.NEXT_PUBLIC_DJANGO_API;
  const [ads, setAds] = useState([]);

  useEffect(() => {
    axios.get(`${djangoApi}/app/banner-ads/`)
      .then(response => {
        console.log(response.data);
        setAds(response.data);
      })
      .catch(error => {
        console.error('Error fetching banner ads:', error);
      });
  }, [djangoApi]);
  
  const filteredBusinessData = filterSubCategory 
    ? businessData.filter(business => business.sub_category_id === filterSubCategory)
    : businessData;

  return (
    <div className="business_section">
      <div className="business_content">
        <div className="page_location">
          <Link href='/'>Home</Link> &gt; Search &gt; <span>{mainCategory}</span>
        </div> 
        <div className="result_heading">Showing Results</div>
        <div className="business_cards_ads">
          <div className="business_cards">
            {filteredBusinessData.map((business) => (
              <BusinessCard key={business.id} businessData={business} is_like={false} />
            ))}
          </div>
          <div className="business_ads">
            {ads.banner_add_category_one && (
              <img src={`${djangoApi}${ads.banner_add_category_one}`} alt="Category Banner 1" />
            )}
            {ads.banner_add_category_two && (
              <img src={`${djangoApi}${ads.banner_add_category_two}`} alt="Category Banner 2" />
            )}
            {ads.banner_add_category_three && (
              <img src={`${djangoApi}${ads.banner_add_category_three}`} alt="Category Banner 3" />
            )}
            {ads.banner_add_category_four && (
              <img src={`${djangoApi}${ads.banner_add_category_four}`} alt="Category Banner 4" />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Categorysection;