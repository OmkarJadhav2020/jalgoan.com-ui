// src/components/Filtercategory/Filtercategory.jsx
'use client';

import React, { useEffect, useState, useContext } from 'react';
import './Filtercategory.css';
import { SubCategoryContext } from '../../context/SubCategoryContext';

function Filtercategory({ mainCategoryId, mainCategory, setFilterSubCategory }) {
  const djangoApi = process.env.NEXT_PUBLIC_DJANGO_API;
  const { 
    loadingSubCategories, 
    getSubCategoriesForMain, 
    debugCategoryMappings 
  } = useContext(SubCategoryContext);
  const [filteredCategories, setFilteredCategories] = useState([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    if (mainCategory && !loaded) {
      console.log(`Filtering subcategories for main category: "${mainCategory}"`);
      
      // Get debug info
      const debug = debugCategoryMappings();
      console.log('Available main categories:', debug.mainCategoryKeys);
      
      // Get filtered subcategories - this should now work with the exact case match
      const filtered = getSubCategoriesForMain(mainCategory);
      console.log(`Found ${filtered.length} subcategories for ${mainCategory}`);
      setFilteredCategories(filtered);
      setLoaded(true);
    }
  }, [mainCategory, getSubCategoriesForMain, debugCategoryMappings, loaded]);

  const handleCategoryClick = (e, categoryId) => {
    e.preventDefault();
    console.log(`Setting filter subcategory ID: ${categoryId}`);
    setFilterSubCategory(categoryId);
  };

  return (
    <div className="filter_category">
      <div className="filter_btn">
        <i className='bx bxs-filter-alt'></i>            
        <p>Filters</p>
      </div>
      <div className="filter_category_content">
        {loadingSubCategories ? (
          <div style={{ padding: '20px', textAlign: 'center' }}>
            <p>Loading filters...</p>
          </div>
        ) : filteredCategories.length > 0 ? (
          filteredCategories.map(category => (
            <div 
              key={category.id} 
              onClick={(e) => handleCategoryClick(e, category.id)} 
              className="category_card"
            >
              <img 
                src={`${djangoApi}/${category.sub_category_img}`} 
                alt={category.sub_category}
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = '/placeholder-image.jpg'; // Fallback image
                }}
              />
              <p>{category.sub_category}</p>
            </div>
          ))
        ) : (
          <div style={{ padding: '20px', textAlign: 'center' }}>
            <p>No filters available for {mainCategory}</p>
            {loaded && (
              <button 
                onClick={() => window.location.reload()} 
                style={{
                  padding: '8px 15px',
                  background: '#0081C7',
                  color: 'white',
                  border: 'none',
                  borderRadius: '5px',
                  marginTop: '10px',
                  cursor: 'pointer'
                }}
              >
                Refresh Filters
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default Filtercategory;