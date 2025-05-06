'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import './Category.css';
import Category from './Category';
import axios from 'axios';

function Categorytile() {
  const djangoApi = process.env.NEXT_PUBLIC_DJANGO_API;
  const [categories, setCategories] = useState([]);
  
  useEffect(() => {
    axios.get(`${djangoApi}/app/categorys/`)
      .then(response => {
        setCategories(response.data.categories);
      })
      .catch(error => {
        console.error('Error fetching categories:', error);
      });
  }, [djangoApi]);
  
  return (
    <div className="categoryes_tiles">
      {categories.map(category => (
        <Link href={`/categories/${category.id}/${category.main_category}`} key={category.id}>
          <Category name={category.main_category} />          
        </Link>
      ))}
    </div>
  );
}

export default Categorytile;