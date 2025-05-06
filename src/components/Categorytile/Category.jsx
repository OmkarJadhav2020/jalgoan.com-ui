'use client';

import React, { useEffect, useState } from 'react';
import './Category.css';
import axios from 'axios';

function Category({ name }) {
  const djangoApi = process.env.NEXT_PUBLIC_DJANGO_API;
  const [subCategories, setSubCategories] = useState([]);

  useEffect(() => {
    // Only fetch if we have a name and haven't already fetched
    if (name && subCategories.length === 0) {
      axios.get(`${djangoApi}/app/subCategorys/`)
        .then(sub_response => {
          const filteredSubCategories = sub_response.data.categories.filter(
            subCategory => subCategory.main_category === name
          );
          setSubCategories(filteredSubCategories);
          console.log("Sub-categories fetched");
        })
        .catch(error => {
          console.error('Error fetching sub-categories:', error);
        });
    }
    // Add name and djangoApi as dependencies
  }, [name, djangoApi, subCategories.length]);
  
  return (
    <div className="category">
      <p className="category_name">{name}</p>
      <div className="category_cards">
        {subCategories.map(category => (
          <div className="category_business" key={category.id}>
            <div className="category_img">
              <img src={`${djangoApi}/${category.sub_category_img}`} alt={category.sub_category} />
            </div>
            <p className="business_name">{category.sub_category}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Category;