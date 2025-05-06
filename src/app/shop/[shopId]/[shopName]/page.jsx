'use client';

import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import Navbar from '../../../../components/Navbar/Navbar';
import Footer from '../../../../components/Footer/Footer';
import LoginSignup from '../../../../components/LoginSignup/LoginSignup';
import BusinessDetailsCard from '../../../../components/Businesscompo/BusinessDetailsCard';
import CompanyWork from '../../../../components/Businesscompo/CompanyWork';
import BusinessContact from '../../../../components/Businesscompo/BusinessContact';
import axios from 'axios';
import '../../../../pages/pageUtil.css';

function ShopDetailsPage() {
  const params = useParams();
  const shopId = params.shopId;
  const djangoApi = process.env.NEXT_PUBLIC_DJANGO_API;
  const [businessData, setBusinessData] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('tokenKey');

    const fetchData = async () => {
      try {
        setLoading(true);
        console.log("Fetching data...");
        const response = await axios.get(`${djangoApi}/app/business-view/`, {
          params: { productId: shopId }, // Use shopId from the URL
          headers: {
            Authorization: `Token ${token || ''}` // Using Token authentication scheme
          }
        });
        setBusinessData(response.data);
        console.log(response.data);
        console.log("Data fetched successfully");
        setLoading(false);
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    };

    fetchData();
  }, [shopId, djangoApi]);

  return (
    <div className='main_section'>
      <Navbar />
      {loading ? (
        <div style={{ marginTop: '150px', padding: '20px' }}>
          <p>Loading business details...</p>
        </div>
      ) : (
        <>
          <div className="page_location_tow">
            <Link href='/'>Home</Link> &gt; Search &gt; {businessData.main_category && (
              <Link href={`/categories/${businessData.main_category_id}/${businessData.main_category}`}>
                {businessData.main_category}
              </Link>
            )} &gt; <span>{businessData.business_name}</span>
          </div>
          <BusinessDetailsCard businessData={businessData}/>
          <div className="company_contact_details">
            <CompanyWork businessData={businessData}/>
            <BusinessContact businessData={businessData}/> 
          </div>
        </>
      )}
      <Footer />
      <LoginSignup />
    </div>
  );
}

export default ShopDetailsPage;