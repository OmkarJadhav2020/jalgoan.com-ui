'use client';

import React, { useState, useEffect } from 'react';
import './Advertise.css';
import axios from 'axios';
import Link from 'next/link';

function Advertise() {
  const apiUrl = `${process.env.NEXT_PUBLIC_DJANGO_API}/app/crousel-ads/`;
  const apiUrl_banner = `${process.env.NEXT_PUBLIC_DJANGO_API}/app/banner-ads/`;
  const [sliedData, setSlideData] = useState([]);
  const [slide, setSlide] = useState(0);
  const [ads, setAds] = useState([]);

  useEffect(() => {
    axios.get(apiUrl)
      .then(response => {
        setSlideData(response.data.ads);
        console.log(sliedData);
        console.log(response.data.ads);
      })
      .catch(error => {
        console.error('Error fetching carousel ads:', error);
      });
  }, []);

  useEffect(() => {
    axios.get(apiUrl_banner)
      .then(response => {
        console.log(response.data);
        setAds(response.data);
      })
      .catch(error => {
        console.error('Error fetching banner ads:', error);
      });
  }, []);

  useEffect(() => {
    const autoSlideInterval = setInterval(() => {
      setSlide((prevSlide) => (prevSlide + 1) % sliedData.length);
    }, 3000); // Change slide every 3 seconds

    return () => {
      clearInterval(autoSlideInterval);
    };
  }, [sliedData.length]);

  return (
    <div className="advertise_container">
      <div className="slide_container">
        {sliedData.map((item, index) => {
          return (
            <Link key={index} href={`/live/${item.id}`} 
                  as={`/live/${item.id}`} 
                  state={{ itemData: item }}>
              <img 
                key={index} 
                src={`${process.env.NEXT_PUBLIC_DJANGO_API}${item.crousel_add_img}`} 
                className={slide === index ? "slider_img_div" : "slider_img_div_hidden"} 
                alt="Carousel Advertisement" 
              />
            </Link>
          );
        })}
        <span className="indicators">
          {sliedData.map((_, index) => {
            return (
              <button 
                key={index} 
                onClick={() => setSlide(index)} 
                className={slide === index ? "indicator indicator_active" : "indicator"}>
              </button>
            );
          })}
        </span>
      </div>

      <div className="banner_ads">
        {ads.banner_add_home_one && (
          <a href={ads.banner_add_home_one_url}>
            <img src={`${process.env.NEXT_PUBLIC_DJANGO_API}${ads.banner_add_home_one}`} alt="Home Banner One" />
          </a>
        )}
        {ads.banner_add_home_two && (
          <a href={ads.banner_add_home_two_url}>
            <img src={`${process.env.NEXT_PUBLIC_DJANGO_API}${ads.banner_add_home_two}`} alt="Home Banner Two" />
          </a>
        )}
      </div>
    </div>
  );
}

export default Advertise;