'use client';

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Navbar from '../../components/Navbar/Navbar';
import Footer from '../../components/Footer/Footer';
import LoginSignup from '../../components/LoginSignup/LoginSignup';
import AccountCompo from '../../components/AccountCompo/AccountCompo';

function Account() {
  const router = useRouter();
  
  useEffect(() => {
    // Check if user is logged in
    const token = localStorage.getItem('token');
    if (!token) {
      router.push('/');
    }
  }, [router]);

  return (
    <div className="main_section">
      <Navbar />
      <AccountCompo />
      <Footer />
      <LoginSignup />
    </div>
  );
}

export default Account;