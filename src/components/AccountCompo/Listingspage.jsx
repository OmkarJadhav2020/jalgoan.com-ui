'use client';

import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import BusinessCard from '../Categorysection/BusinessCard';
import { UserContext } from '../../context/UserContext';
import './AccountCompo.css';
import Link from 'next/link';
function Listingspage() {
  const djangoApi = process.env.NEXT_PUBLIC_DJANGO_API;
  const apiUrl = `${djangoApi}/app/listedShops/`;

  const { user } = useContext(UserContext);
  const [listedPosts, setListedPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchListedShops = async () => {
      const token = localStorage.getItem('token');
      const tokenKey = localStorage.getItem('tokenKey');

      if (!token || !user?.id) {
        setError('You need to be logged in to view your listings');
        setLoading(false);
        return;
      }

      try {
        // First try with Bearer token
        const response = await axios.get(apiUrl, {
          headers: {
            'Authorization': `Bearer ${token}`
          },
          params: {
            user_id: user.id
          }
        }).catch(async () => {
          // If Bearer token fails, try with Token authentication
          return await axios.get(apiUrl, {
            headers: {
              'Authorization': `Token ${tokenKey}`
            },
            params: {
              user_id: user.id
            }
          });
        });
        
        console.log('Listed shops response:', response.data);
        
        setListedPosts(response.data);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching listed shops:', err);
        setError('Failed to fetch your shop listings. Please try again.');
        setLoading(false);
      }
    };

    fetchListedShops();
  }, [user, apiUrl]);

  if (loading) {
    return (
      <div className="listingPage_content">
        <h1>Your Listings</h1>
        <div style={{ padding: '20px 0', textAlign: 'center' }}>
          <p>Loading your shop listings...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="listingPage_content">
        <h1>Your Listings</h1>
        <div style={{ padding: '20px 0', textAlign: 'center' }}>
          <p style={{ color: 'red' }}>{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="listingPage_content">
      <h1>Your Listings</h1>
      
      {listedPosts.length === 0 ? (
        <div style={{ padding: '20px 0', textAlign: 'center' }}>
          <p>You haven't created any shop listings yet.</p>
          <p style={{ marginTop: '10px' }}>
            <Link href="/addListig" style={{ color: '#0081C7', textDecoration: 'underline' }}>
              Create your first listing
            </Link>
          </p>
        </div>
      ) : (
        <div>
          {listedPosts.map((shop) => (
            shop.id ? (
              <BusinessCard key={shop.id} businessData={shop} is_like={false} is_edit={true} />
            ) : (
              <p key={Math.random()}>Shop listing is missing data</p>
            )
          ))}
        </div>
      )}
    </div>
  );
}

export default Listingspage;