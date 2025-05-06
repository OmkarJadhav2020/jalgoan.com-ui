'use client';

import React, { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import axios from 'axios';
import { getShopUrl } from '../../../utils/slugUtils';

function ProductViewRedirect() {
  const params = useParams();
  const router = useRouter();
  const productId = params.productId;
  const djangoApi = process.env.NEXT_PUBLIC_DJANGO_API;
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('tokenKey');

    const fetchData = async () => {
      try {
        setLoading(true);
        console.log("Fetching data for redirect...");
        const response = await axios.get(`${djangoApi}/app/business-view/`, {
          params: { productId },
          headers: {
            Authorization: `Token ${token || ''}` 
          }
        });
        
        // Get the business data
        const businessData = response.data;
        
        // Create the SEO-friendly URL with business name
        const shopUrl = getShopUrl(productId, businessData.business_name);
        
        // Redirect to the new URL
        router.push(shopUrl);
      } catch (error) {
        console.error("Error fetching data for redirect:", error);
        // If there's an error, stay on the current page
        setLoading(false);
      }
    };

    fetchData();
  }, [productId, djangoApi, router]);

  return (
    <div style={{ marginTop: '150px', padding: '20px', textAlign: 'center' }}>
      <p>Redirecting to shop page...</p>
    </div>
  );
}

export default ProductViewRedirect;