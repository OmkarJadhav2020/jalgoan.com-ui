'use client';

import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Navbar from '../../../../components/Navbar/Navbar';
import Footer from '../../../../components/Footer/Footer';
import Filtercategory from '../../../../components/Filtercategory/Filtercategory';
import Categorysection from '../../../../components/Categorysection/Categorysection';
import LoginSignup from '../../../../components/LoginSignup/LoginSignup';
import axios from "axios";

function CategoryPage() {
  const params = useParams();
  const { mainCategoryId, mainCategory } = params;
  const djangoApi = process.env.NEXT_PUBLIC_DJANGO_API;
  const [businessData, setBusinessData] = useState([]);
  const [filterSubCategory, setFilterSubCategory] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`${djangoApi}/app/filtered-business/`, {
          params: { mainCategoryId }
        });
        setBusinessData(response.data);
        console.log("Data fetched successfully");
        console.log(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching products:', error);
        setLoading(false);
      }
    };

    if (mainCategoryId) {
      fetchProducts();
    }
  }, [mainCategoryId, djangoApi]);

  return (
    <div className="main_section">
      <Navbar />
      {loading ? (
        <div style={{ marginTop: '150px', padding: '20px' }}>
          <p>Loading categories...</p>
        </div>
      ) : (
        <>
          <Filtercategory 
            mainCategoryId={mainCategoryId} 
            mainCategory={mainCategory} 
            setFilterSubCategory={setFilterSubCategory}
          />
          <Categorysection 
            businessData={businessData} 
            mainCategory={mainCategory} 
            filterSubCategory={filterSubCategory} 
          />
        </>
      )}
      <Footer />
      <LoginSignup />
    </div>
  );
}

export default CategoryPage;