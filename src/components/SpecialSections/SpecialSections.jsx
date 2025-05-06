'use client';

import React, { useContext } from 'react';
import Link from 'next/link';
import './SpecialSections.css'
import { FormContext } from '../../context/FormContext';
import { UserContext } from '../../context/UserContext';

function SpecialSections() {
  // Use FormContext directly without relying on React Router context
  const { closeSpecial, setCloseSpecial } = useContext(FormContext);
  const { user } = useContext(UserContext); // Add UserContext to access user state

  return (
    <>
      <div className="special_section">
        <div className="special_section_btns">
          <a href='https://jalgaon.gov.in/public-utility-category/ngos/' target='_blank' rel="noopener noreferrer">
            <div className="special_btn btn_ngo">NGO</div>
          </a>
          <a href='https://jalgaon.gov.in/telephone/' target='_blank' rel="noopener noreferrer">
            <div className="special_btn btn_directory">Directory</div>
          </a>
          <a href='https://jalgaon.gov.in/tourist-places/' target='_blank' rel="noopener noreferrer">
            <div className="special_btn btn_freeList">Tourist places</div>
          </a>
          <Link href='/events'>
            <div className="special_btn btn_events">Events</div>
          </Link>
        </div>
      </div>

      {/* special_section_two */}
      <div className={`special_section_two ${closeSpecial ? '' : 'active'}`}>
        <div className="sepcial_section_btns_two">
          <ul>
            {/* Add account option at the top of the mobile menu */}
            {user && (
              <Link href='/account'>
                <div className="special_btn_two account_btn">
                  <i className='bx bx-user-circle'></i> My Account
                </div>
              </Link>
            )}
            {/* Add listing option */}
            <Link href='/addListig'>
              <div className="special_btn_two add_listing_btn">
                <i className='bx bx-plus-circle'></i> Add Listing
              </div>
            </Link>
            {/* Original menu items */}
            <a href='https://jalgaon.gov.in/public-utility-category/ngos/' target='_blank' rel="noopener noreferrer">
              <div className="special_btn_two btn_ngo">NGO</div>
            </a>
            <a href='https://jalgaon.gov.in/telephone/' target='_blank' rel="noopener noreferrer">
              <div className="special_btn_two btn_directory">Directory</div>
            </a>
            <a href='https://jalgaon.gov.in/tourist-places/' target='_blank' rel="noopener noreferrer">
              <div className="special_btn_two btn_freeList">Tourist places</div>
            </a>
            <Link href='/events'>
              <div className="special_btn_two btn_events">Events</div>
            </Link>
            {/* Add logout option if user is logged in */}
            {user && (
              <div 
                className="special_btn_two logout_btn" 
                onClick={() => {
                  localStorage.removeItem('token');
                  localStorage.removeItem('tokenKey');
                  localStorage.setItem("hasVisited", 'false');
                  window.location.reload();
                }}
              >
                <i className='bx bxs-user-x'></i> Logout
              </div>
            )}
          </ul>
        </div>
      </div>
    </>
  );
}

export default SpecialSections;