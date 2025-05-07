'use client';

import React, { useEffect, useState, useContext } from 'react';
import { useParams } from 'next/navigation';
import Navbar from '../../../../components/Navbar/Navbar';
import Footer from '../../../../components/Footer/Footer';
import Filtercategory from '../../../../components/Filtercategory/Filtercategory';
import Categorysection from '../../../../components/Categorysection/Categorysection';
import LoginSignup from '../../../../components/LoginSignup/LoginSignup';
import axios from "axios";
import { SubCategoryContext } from '../../../../context/SubCategoryContext';

function CategoryPage() {
  const params = useParams();
  const { mainCategoryId, mainCategory } = params;
  // Decode the URL-encoded mainCategory
  const decodedMainCategory = decodeURIComponent(mainCategory).replace(/-/g, ' ');
  
  const djangoApi = process.env.NEXT_PUBLIC_DJANGO_API;
  const [businessData, setBusinessData] = useState([]);
  const [filterSubCategory, setFilterSubCategory] = useState(null);
  const [loading, setLoading] = useState(true);
  const { debugCategoryMappings } = useContext(SubCategoryContext);

  // Debug function to help diagnose issues
  const showDebugInfo = () => {
    const debug = debugCategoryMappings();
    console.log('CATEGORY DEBUG INFO:');
    console.log('Main Category ID:', mainCategoryId);
    console.log('Raw Main Category Name:', mainCategory);
    console.log('Decoded Main Category Name:', decodedMainCategory);
    console.log('Available main categories in mapping:', debug.mainCategoryKeys);
    
    // Check if category exists in mapping - use both original and decoded names
    const originalExists = debug.mainCategoryKeys.includes(mainCategory);
    const decodedExists = debug.mainCategoryKeys.includes(decodedMainCategory);
    const lowercaseExists = debug.mainCategoryKeys.includes(decodedMainCategory.toLowerCase());
    
    console.log('Original category in mapping?', originalExists);
    console.log('Decoded category in mapping?', decodedExists);
    console.log('Lowercase decoded in mapping?', lowercaseExists);
    console.log('Number of subcategories total:', debug.allSubCategories);
    
    // Try different formats to match
    const subcatsOriginal = debug.mapping[mainCategory] || [];
    const subcatsDecoded = debug.mapping[decodedMainCategory] || [];
    const subcatsLower = debug.mapping[decodedMainCategory.toLowerCase()] || [];
    
    console.log('Subcategories for original:', subcatsOriginal.length);
    console.log('Subcategories for decoded:', subcatsDecoded.length);
    console.log('Subcategories for lowercase:', subcatsLower.length);
    
    // Try to find a case-insensitive match
    for (const key of debug.mainCategoryKeys) {
      if (key.toLowerCase() === decodedMainCategory.toLowerCase()) {
        console.log('Case-insensitive match found:', key);
        console.log('Subcategories for this match:', debug.mapping[key].length);
        break;
      }
    }
  };

  // Call debug function when component loads
  useEffect(() => {
    if (mainCategoryId && mainCategory) {
      showDebugInfo();
    }
  }, [mainCategoryId, mainCategory, debugCategoryMappings]);

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
            mainCategory={decodedMainCategory} 
            setFilterSubCategory={setFilterSubCategory}
          />
          <Categorysection 
            businessData={businessData} 
            mainCategory={decodedMainCategory} 
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