'use client';

import React, { useEffect, useContext, useState } from 'react';
import axios from 'axios';
import { UserContext } from '../../context/UserContext';
import BusinessCard from '../Categorysection/BusinessCard';
import './AccountCompo.css';

function Likedpage() {
  const djangoApi = process.env.NEXT_PUBLIC_DJANGO_API;
  const { user } = useContext(UserContext);
  const [likedShops, setLikedShops] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchLikedShops = async () => {
      const token = localStorage.getItem('token');
      const tokenKey = localStorage.getItem('tokenKey');
      
      if (!token || !user?.id) {
        setError('You need to be logged in to view liked shops');
        setLoading(false);
        return;
      }
      
      try {
        // First try with Bearer token
        const response = await axios.get(`${djangoApi}/app/likedShops/`, {
          headers: {
            'Authorization': `Bearer ${token}`
          },
          params: {
            user_id: user.id
          }
        }).catch(async () => {
          // If Bearer token fails, try with Token authentication
          return await axios.get(`${djangoApi}/app/likedShops/`, {
            headers: {
              'Authorization': `Token ${tokenKey}`
            },
            params: {
              user_id: user.id
            }
          });
        });
        
        console.log('Liked shops response:', response.data);
        setLikedShops(response.data);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching liked shops:', err);
        setError('Failed to fetch your liked shops. Please try again.');
        setLoading(false);
      }
    };
    
    fetchLikedShops();
  }, [user, djangoApi]);
  
  if (loading) {
    return (
      <div className="likedPage_content">
        <h1>Liked Pages</h1>
        <div style={{ padding: '20px 0', textAlign: 'center' }}>
          <p>Loading your liked shops...</p>
        </div>
      </div>
    );
  }
  
  if (error) {
    return (
      <div className="likedPage_content">
        <h1>Liked Pages</h1>
        <div style={{ padding: '20px 0', textAlign: 'center' }}>
          <p style={{ color: 'red' }}>{error}</p>
        </div>
      </div>
    );
  }
  
  return (
    <div className="likedPage_content">
      <h1>Liked Pages</h1>
      
      {likedShops.length === 0 ? (
        <div style={{ padding: '20px 0', textAlign: 'center' }}>
          <p>You haven't liked any shops yet.</p>
        </div>
      ) : (
        <div>
          {likedShops.map((item) => (
            <BusinessCard 
              key={item.shop_listing?.id || item.id} 
              businessData={item.shop_listing || item} 
              is_like={true} 
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default Likedpage;