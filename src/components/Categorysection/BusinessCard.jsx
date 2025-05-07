'use client';

import React, { useContext, useState } from 'react';
import Link from 'next/link';
import { UserContext } from '../../context/UserContext';
import axios from 'axios';
import { getShopUrl } from '../../utils/slugUtils';

function BusinessCard({ businessData, is_like, is_edit = false }) {
  const [isFirstImageLoaded, setIsFirstImageLoaded] = useState(true);
  const [liked, setLiked] = useState(false);
  
  const djangoApi = process.env.NEXT_PUBLIC_DJANGO_API;
  const { user } = useContext(UserContext);
  
  // Fix for image URL construction
  const getImageUrl = (path) => {
    if (!path) return '';
    
    // Check if the path is already a full URL
    if (path.startsWith('http')) {
      return path;
    }
    
    if(path.startsWith('static'))
    {
      return `${djangoApi}/media/${path}`
    }

    // Check if path starts with a slash
    if (path.startsWith('/')) {
      return `${djangoApi}${path}`;
    }
    
    // Add a slash if needed
    return `${djangoApi}/${path}`;
  };
  
  const token = localStorage.getItem('token');
  
  const addLikedShop = async (e, userId, shopListingId) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (!token) {
      alert('Please login to like shops');
      return;
    }

    if (!userId) {
      alert('User not logged in');
      return;
    }

    try {
      const response = await axios.post(
        `${djangoApi}/app/likedShops/`,
        {
          user: userId,
          shop_listing: shopListingId
        }, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      console.log("Shop liked:", response.data);
      setLiked(true);
      alert("Added to liked");
    } catch (error) {
      console.error('Error liking shop:', error.response ? error.response.data : error.message);
      alert("Error adding to liked shops");
    }
  };

  // Generate the shop URL using our utility function
  const shopUrl = getShopUrl(businessData.id, businessData.business_name);

  return (
    <div className="business_card">
      <div className="business_imgg">
      <Link href={shopUrl}>
        <img
          src={getImageUrl(businessData.business_banner)}
          alt="Business Banner"
          onError={(e) => {
            console.error("Image failed to load:", businessData.business_banner);
            e.target.src = '/placeholder-image.jpg'; // Fallback image
          }}
        />
                  </Link>
      </div>
      <div className="business_info">
        <p className='business_name'>
          <span>{businessData.business_name}</span>
          {is_edit ? (
            <Link href={`/editForm/${businessData.id}`}>
              <i className='bx bxs-edit'></i>
            </Link>
          ) : (
            <i 
              onClick={(e) => addLikedShop(e, user?.id, businessData.id)} 
              className={`bx ${liked ? 'bxs-heart' : 'bx-heart'}`}
              style={{ cursor: 'pointer' }}
            ></i>
          )}
        </p>
        <div className="business_rating">
          <span>5</span>
          <div className="rating">
            <i className='bx bxs-star'></i>
            <i className='bx bxs-star'></i>
            <i className='bx bxs-star'></i>
            <i className='bx bxs-star'></i>
            <i className='bx bxs-star'></i>
          </div>
        </div>
        <div className="business_location">
          <i className='bx bxs-map'></i> <p>{businessData.business_address}</p>
        </div>
        <div className="business_keywords">
          {businessData.sub_domain_one && <span>{businessData.sub_domain_one}</span>}
          {businessData.sub_domain_two && <span>{businessData.sub_domain_two}</span>}
          {businessData.sub_domain_three && <span>{businessData.sub_domain_three}</span>}
        </div>
        <div className="business_contact">
          <a 
            href={`tel:${businessData.business_no}`} 
            className='business_call_btn'
            onClick={(e) => e.stopPropagation()}
          >
            <i className='bx bxs-phone'></i> Call Us
          </a>
          <Link href={shopUrl}>
            <p>View Details</p>
          </Link>
          <p onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            
            const url = `${window.location.origin}${shopUrl}`;
            if (navigator.share) {
              navigator.share({
                title: businessData.business_name,
                text: `Check out ${businessData.business_name}`,
                url: url,
              }).catch(error => console.log('Error sharing', error));
            } else {
              navigator.clipboard.writeText(url)
                .then(() => alert('Link copied to clipboard!'))
                .catch(err => console.error('Failed to copy URL:', err));
            }
          }}>
            <i className='bx bx-share-alt'></i> <span>Share</span>
          </p>
        </div>
      </div>
    </div>
  );
}

export default BusinessCard;