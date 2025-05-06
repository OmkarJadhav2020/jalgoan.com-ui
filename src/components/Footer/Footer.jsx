'use client';

import React from 'react';
import Link from 'next/link';
import { assets } from '../../assets/assets';
import './Footer.css';

function Footer() {
  return (
    <>
      <div className="footer_container">
        <div className="footer_about">
          <div className="footer_logo">
            <img className="icon" src={assets.icon} alt="" />
            <img className="logo" src={assets.logo} alt="" />
          </div>
          <div className="footer_info">
            <p>Your definitive guide to Jalgaon District! Discover local businesses, services, and attractions in this vibrant region of Maharashtra, India. From bustling markets to serene natural spots, Jalgaon.com offers comprehensive listings to explore the essence of Jalgaon and its neighboring areas.</p>
          </div>
        </div>
        <div className="footer_links">
          <h1>Useful Links</h1>
          <div className="links">
            <ul className="links_list">
              <Link href="/about" className="link">About</Link>
              <Link href="/allarticlse" className="link">Article</Link>
              <Link href="/news" className="link">News</Link>
              <Link href="/contact" className="link">Contact</Link>
            </ul>    
            <ul className="links_list">
              <Link href="/events" className="link">Events</Link>
              <Link href="/" className="link">Directory</Link>
              <Link href="/" className="link">NGO</Link>
              <Link href="/addListig" className="link">Add Listing</Link>
            </ul>
            <ul className="links_list">
              <Link href="/" className="link">Feedback</Link>
              <Link href="/allarticlse" className="link">Article</Link>
              <Link href="/" className="link">Testimonials</Link>
              <Link href="/termsAndCondition" className="link">Terms & Conditions</Link>
            </ul>
          </div>
        </div>
      </div>
      <div className="footer_copyright">
        <div className="copyright_content">
          <p>Copyright © 2024. All rights reserved.</p>
          <div className="hr_line"></div>
          <div className="social_links">
            <a href="/"><i className='bx bxl-facebook-square'></i></a>
            <a href="/"><i className='bx bxl-instagram-alt'></i></a>
            <a href="/"><i className='bx bxl-twitter'></i></a>
          </div>
        </div>
      </div>
    </>   
  );
}

export default Footer;