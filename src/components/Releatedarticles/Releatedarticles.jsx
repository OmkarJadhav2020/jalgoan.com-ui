'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import './Releatedarticles.css';
import BlogSlider from './BlogSlider';
import axios from 'axios';

export default function RelatedArticles() {
  const djangoApi = process.env.NEXT_PUBLIC_DJANGO_API;
  const [articleData, setArticleData] = useState([]);
  
  useEffect(() => {
    const getArticlesData = async () => {
      try {
        const response = await axios.get(`${djangoApi}/app/active-articles/`);
        setArticleData(response.data);
        console.log("Articles data fetched successfully");
      } catch (error) {
        console.error('Error fetching articles:', error);
      }
    };

    getArticlesData();
  }, [djangoApi]);

  const prevSlide = () => {
    let box = document.querySelector('.articles_cards');
    let width = box.clientWidth;
    box.scrollLeft = box.scrollLeft - width;
  };

  const nextSlide = () => {
    let box = document.querySelector('.articles_cards');
    let width = box.clientWidth;
    box.scrollLeft = box.scrollLeft + width;
  };

  return (
    <div className="related_articles">
      <div className="articles_header">
        <h1 className="header_text">Related Articles</h1>
        <Link href='/allarticlse'><p className="see_more"> Explore More <i className='bx bx-right-arrow-circle'></i></p></Link>
      </div>
      <div className="articles_slider">
        <div className="slider_button">
          <button onClick={prevSlide}><i className='bx bxs-chevron-left'></i></button>
          <button onClick={nextSlide}><i className='bx bxs-chevron-right'></i></button>
        </div>
        <div className="articles_cards">
          {articleData.map((activeArticle, index) => (
            <BlogSlider key={index} data={activeArticle} is_all={false} />
          ))}
        </div>
      </div>
    </div>
  );
}