'use client';

import React, { useEffect, useState } from 'react';
import Navbar from '../../components/Navbar/Navbar';
import Footer from '../../components/Footer/Footer';
import LoginSignup from '../../components/LoginSignup/LoginSignup';
import SearchSection from '../../components/Categorysection/SearchSection';

function SearchPage() {
  const [searchData, setSearchData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Retrieve search results from sessionStorage
    const storedResults = sessionStorage.getItem('searchResults');
    if (storedResults) {
      setSearchData(JSON.parse(storedResults));
    }
    setLoading(false);
  }, []);

  return (
    <div className="main_section">
      <Navbar />
      {loading ? (
        <div style={{ marginTop: '150px', padding: '20px' }}>
          <p>Loading search results...</p>
        </div>
      ) : searchData.length > 0 ? (
        <SearchSection searchData={searchData} />
      ) : (
        <div style={{ marginTop: '150px', padding: '20px' }}>
          <p>No search results found. Please try another search term.</p>
        </div>
      )}
      <Footer />
      <LoginSignup />
    </div>
  );
}

export default SearchPage;