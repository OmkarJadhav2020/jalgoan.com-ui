'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import './Categorysection.css';
import BusinessCard from './BusinessCard';
import axios from 'axios';

function SearchSection({ searchData }) {
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
  
  return (
    <div className="business_section" style={{ marginTop: '140px' }}>
      <div className="business_content">
        <div className="page_location">
          <Link href='/'>Home</Link> &gt; Search &gt; <span></span>
        </div> 
        <div className="result_heading">Showing Results</div>
        <div className="business_cards_ads">
          <div className="business_cards">
            {searchData.map((business) => (
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

export default SearchSection;