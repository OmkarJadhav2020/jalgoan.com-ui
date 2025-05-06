'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import './Services.css';
import axios from 'axios';

function Services() {
  const djangoApi = process.env.NEXT_PUBLIC_DJANGO_API;
  const [categories, setCategories] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios.get(`${djangoApi}/app/categorys/`)
      .then(response => {
        setCategories(response.data.categories);
      })
      .catch(error => {
        console.error('Error fetching categories:', error);
      });
  }, []);
  
  return (
    <div className="services_container">
      <div className="services_cards">
        {categories.map(category => (
          <Link href={`/categories/${category.id}/${category.main_category}`} key={category.id}>
            <div className="service">
              <img src={`${djangoApi}${category.category_img.category_img}`} alt={category.category_img.img_name} />
              <p>{category.main_category}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default Services;