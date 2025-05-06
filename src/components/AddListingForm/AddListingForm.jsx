'use client';

import React, { useEffect, useState, useContext } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { UserContext } from '../../context/UserContext';
import Select from 'react-select';

function AddListingForm({ is_edit = false }) {
  const router = useRouter();
  const djangoApi = process.env.NEXT_PUBLIC_DJANGO_API;
  const { user } = useContext(UserContext);
  const [selectedMainCategory, setSelectedMainCategory] = useState(null);
  const [selectedSubCategory, setSelectedSubCategory] = useState(null);
  const [userLocation, setUserLocation] = useState(null);
  const [filteredSubCategories, setFilteredSubCategories] = useState([]);
  const [mainCategories, setMainCategories] = useState([]);
  const [subCategories, setSubCategories] = useState([]);
  const [error, setError] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [formData, setFormData] = useState({
    user: user?.id || null,
    main_category: null,
    sub_category: null,
    business_name: '',
    business_rating: 0,
    business_address: '',
    business_banner: null,
    sub_domain_one: '',
    sub_domain_two: '',
    sub_domain_three: '',
    sub_domain_four: '',
    sub_domain_five: '',
    sub_domain_six: '',
    business_origin: 'India',
    business_dob: 'N/A',
    business_gst: 'N/A',
    business_description: '',
    business_img_one: null,
    business_img_two: null,
    business_img_three: null,
    business_no: '',
    business_email: '',
    insta_link: '',
    facebook_link: '',
    website_link: '',
    gmap_link: ''
  });

  const getCsrfToken = async () => {
    try {
      const response = await axios.get(`${djangoApi}/app/csrf-token/`);
      return response.data.csrfToken;
    } catch (error) {
      console.error('Error fetching CSRF token:', error);
      return '';
    }
  };

  useEffect(() => {
    // Update the user ID when the user context changes
    if (user && user.id) {
      setFormData(prev => ({ ...prev, user: user.id }));
    }
  }, [user]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${djangoApi}/app/categorys/`);
        const categories = response.data.categories;
        const categoryOptions = categories.map(category => ({
          value: category.main_category.toLowerCase().replace(/\s+/g, '_'),
          label: category.main_category,
          mainCategoryId: category.id
        }));
        setMainCategories(categoryOptions);

        const sub_response = await axios.get(`${djangoApi}/app/subCategorys/`);
        const sub_categories = sub_response.data.categories;
        const subCategoryOptions = sub_categories.map(category => ({
          value: category.sub_category.toLowerCase().replace(/\s+/g, '_'),
          label: category.sub_category,
          main_category: category.main_category,
          subCategoryId: category.id
        }));
        setSubCategories(subCategoryOptions);
      } catch (error) {
        console.error('Error fetching data:', error);
        setError(error.message);
      }
    };

    fetchData();
  }, [djangoApi]);

  const handleMainCategoryChange = (selectedOption) => {
    setSelectedMainCategory(selectedOption.mainCategoryId);
    const filtered = subCategories.filter(category => category.main_category === selectedOption.label);
    setFilteredSubCategories(filtered);
    setFormData((prevFormData) => ({
      ...prevFormData,
      main_category: selectedOption.mainCategoryId
    }));
  };

  const handleSubChange = (selectedOption) => {
    setSelectedSubCategory(selectedOption.subCategoryId);
    setFormData((prevFormData) => ({
      ...prevFormData,
      sub_category: selectedOption.subCategoryId
    }));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
  
    if (files.length > 0) {
      const selectedFile = files[0];
      
      // If the banner image is selected, use it for all image fields
      if (name === 'business_banner') {
        setFormData(prevData => ({
          ...prevData,
          [name]: selectedFile,
          business_img_one: selectedFile,
          business_img_two: selectedFile,
          business_img_three: selectedFile
        }));
      } else {
        setFormData(prevData => ({
          ...prevData,
          [name]: selectedFile
        }));
      }
    }
  };

  const getUserLocation = (e) => {
    e.preventDefault();
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(position => {
        const pos = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        };
        const locationUrlGmap = `https://www.google.com/maps/search/?api=1&query=${pos.lat},${pos.lng}`;
        setUserLocation(locationUrlGmap);
        setFormData(prevData => ({
          ...prevData,
          gmap_link: locationUrlGmap
        }));
      }, (error) => {
        console.error("Error getting location:", error);
        alert("Could not get your location. Please enter it manually.");
      });
    } else {
      alert('Geolocation is not supported by this browser.');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (isSubmitting) {
      return; // Prevent multiple submissions
    }

    setIsSubmitting(true);

    try {
      // Make sure user ID is set
      if (!formData.user && user?.id) {
        setFormData(prev => ({ ...prev, user: user.id }));
      }

      // Validate essential fields
      if (!formData.business_name) {
        alert("Business name is required");
        setIsSubmitting(false);
        return;
      }

      if (!formData.main_category) {
        alert("Please select a main category");
        setIsSubmitting(false);
        return;
      }

      if (!formData.sub_category) {
        alert("Please select a sub category");
        setIsSubmitting(false);
        return;
      }

      const token = localStorage.getItem('tokenKey');
      const csrfToken = await getCsrfToken();

      const data = new FormData();
      
      // Append all form data to FormData object
      for (const key in formData) {
        if (formData[key] !== null && formData[key] !== undefined) {
          data.append(key, formData[key]);
        }
      }

      // Log FormData to verify its contents
      for (let pair of data.entries()) {
        console.log(pair[0] + ': ' + pair[1]);
      }

      const response = await axios.post(
        `${djangoApi}/app/shopListing/`,
        data,
        {
          headers: {
            'X-CSRFToken': csrfToken,
            'Content-Type': 'multipart/form-data',
            'Authorization': `Token ${token}`,
          },
        }
      );

      console.log("Form submission successful:", response.data);
      alert("Form Submitted Successfully!");
      router.push('/');
    } catch (error) {
      console.error('Error uploading data:', error);
      
      let errorMessage = "Error submitting form. ";
      
      // Extract meaningful error messages from the response if available
      if (error.response && error.response.data) {
        const errorData = error.response.data;
        
        if (typeof errorData === 'object') {
          Object.keys(errorData).forEach(key => {
            errorMessage += `${key}: ${errorData[key]} `;
          });
        } else if (typeof errorData === 'string') {
          errorMessage += errorData;
        }
      }
      
      alert(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  // UI style improvements
  const styles = {
    formSection: {
      marginTop : '150px',
      marginBottom: '30px',
      border: '1px solid #eaeaea',
      borderRadius: '8px',
      padding: '20px',
      backgroundColor: '#fafafa'
    },
    sectionHeader: {
      borderBottom: '1px solid #eaeaea',
      marginBottom: '20px',
      paddingBottom: '10px',
      color: '#0081C7',
      fontWeight: 'bold'
    },
    inputGroup: {
      marginBottom: '15px'
    },
    label: {
      display: 'block',
      marginBottom: '5px',
      fontWeight: '500'
    },
    input: {
      width: '100%',
      padding: '10px',
      border: '1px solid #ddd',
      borderRadius: '4px',
      fontSize: '16px'
    },
    textarea: {
      width: '100%',
      padding: '10px',
      border: '1px solid #ddd',
      borderRadius: '4px',
      fontSize: '16px',
      minHeight: '120px'
    },
    submitButton: {
      backgroundColor: '#0081C7',
      color: 'white',
      padding: '12px 20px',
      border: 'none',
      borderRadius: '4px',
      fontSize: '16px',
      cursor: 'pointer',
      width: '100%',
      marginTop: '20px'
    },
    locationButton: {
      backgroundColor: '#f5f5f5',
      border: '1px solid #ddd',
      padding: '10px',
      borderRadius: '4px',
      marginBottom: '10px',
      display: 'flex',
      alignItems: 'center',
      cursor: 'pointer'
    },
    locationIcon: {
      color: '#0081C7',
      marginRight: '10px'
    }
  };

  return (
    <div className="addListingForm_section">
      <div className="addListingForm_heading">
        <h1>List your business to Jalgaon.Com</h1>
      </div>
      <div className="addListingForm_form">
        <form onSubmit={handleSubmit} encType="multipart/form-data">
          <div style={styles.formSection}>
            <h3 style={styles.sectionHeader}>Add Business Details</h3>
            <div style={styles.inputGroup}>
              <label style={styles.label} htmlFor="businessName">Business Name*</label>
              <input
                style={styles.input}
                type="text"
                name="business_name"
                value={formData.business_name}
                onChange={handleChange}
                placeholder="Enter your business name"
                required
              />
            </div>
          </div>
          
          <div style={styles.formSection}>
            <h3 style={styles.sectionHeader}>Add Business Contact Info</h3>
            <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
              <div style={{ flex: 1, minWidth: '250px' }}>
                <label style={styles.label} htmlFor="conEmail">Contact Email*</label>
                <input
                  style={styles.input}
                  type="email"
                  name="business_email"
                  value={formData.business_email}
                  onChange={handleChange}
                  placeholder="business@example.com"
                  required
                />
              </div>
              <div style={{ flex: 1, minWidth: '250px' }}>
                <label style={styles.label} htmlFor="conPhone">Phone Number*</label>
                <input
                  style={styles.input}
                  type="text"
                  name="business_no"
                  value={formData.business_no}
                  onChange={handleChange}
                  placeholder="Your business phone number"
                  required
                />
              </div>
            </div>
          </div>
          
          <div style={styles.formSection}>
            <h3 style={styles.sectionHeader}>Add Business Category</h3>
            <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
              <div style={{ flex: 1, minWidth: '250px' }}>
                <label style={styles.label}>Main Category*</label>
                <Select
                  options={mainCategories}
                  onChange={handleMainCategoryChange}
                  placeholder="Select a main category..."
                  isSearchable={true}
                  required
                />
              </div>
              <div style={{ flex: 1, minWidth: '250px' }}>
                <label style={styles.label}>Sub Category*</label>
                <Select
                  options={filteredSubCategories}
                  onChange={handleSubChange}
                  placeholder="Select a sub category..."
                  isSearchable={true}
                  isDisabled={!selectedMainCategory}
                  required
                />
              </div>
            </div>
          </div>
          
          <div style={styles.formSection}>
            <h3 style={styles.sectionHeader}>Add Business Description</h3>
            <div style={styles.inputGroup}>
              <label style={styles.label} htmlFor="businessDesc">Description*</label>
              <textarea
                style={styles.textarea}
                name="business_description"
                value={formData.business_description}
                onChange={handleChange}
                placeholder="Describe your business, services offered, etc."
                required
              />
            </div>
          </div>
          
          <div style={styles.formSection}>
            <h3 style={styles.sectionHeader}>Business Sub-Domains</h3>
            <p style={{ marginBottom: '15px', color: '#666' }}>
              Enter keywords related to your business products or services
            </p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '15px' }}>
              <div style={{ minWidth: '200px', flex: 1 }}>
                <input
                  style={styles.input}
                  type="text"
                  name="sub_domain_one"
                  value={formData.sub_domain_one}
                  onChange={handleChange}
                  placeholder="Sub-domain 1"
                />
              </div>
              <div style={{ minWidth: '200px', flex: 1 }}>
                <input
                  style={styles.input}
                  type="text"
                  name="sub_domain_two"
                  value={formData.sub_domain_two}
                  onChange={handleChange}
                  placeholder="Sub-domain 2"
                />
              </div>
              <div style={{ minWidth: '200px', flex: 1 }}>
                <input
                  style={styles.input}
                  type="text"
                  name="sub_domain_three"
                  value={formData.sub_domain_three}
                  onChange={handleChange}
                  placeholder="Sub-domain 3"
                />
              </div>
              <div style={{ minWidth: '200px', flex: 1 }}>
                <input
                  style={styles.input}
                  type="text"
                  name="sub_domain_four"
                  value={formData.sub_domain_four}
                  onChange={handleChange}
                  placeholder="Sub-domain 4"
                />
              </div>
              <div style={{ minWidth: '200px', flex: 1 }}>
                <input
                  style={styles.input}
                  type="text"
                  name="sub_domain_five"
                  value={formData.sub_domain_five}
                  onChange={handleChange}
                  placeholder="Sub-domain 5"
                />
              </div>
              <div style={{ minWidth: '200px', flex: 1 }}>
                <input
                  style={styles.input}
                  type="text"
                  name="sub_domain_six"
                  value={formData.sub_domain_six}
                  onChange={handleChange}
                  placeholder="Sub-domain 6"
                />
              </div>
            </div>
          </div>
          
          <div style={styles.formSection}>
            <h3 style={styles.sectionHeader}>Business Profile</h3>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
              <div style={{ flex: 1, minWidth: '200px' }}>
                <label style={styles.label}>Country of Origin</label>
                <input
                  style={styles.input}
                  type="text"
                  name="business_origin"
                  value={formData.business_origin}
                  onChange={handleChange}
                  placeholder="Country of Origin"
                />
              </div>
              <div style={{ flex: 1, minWidth: '200px' }}>
                <label style={styles.label}>Year of Establishment</label>
                <input
                  style={styles.input}
                  type="text"
                  name="business_dob"
                  value={formData.business_dob}
                  onChange={handleChange}
                  placeholder="Year of Establishment"
                />
              </div>
              <div style={{ flex: 1, minWidth: '200px' }}>
                <label style={styles.label}>GST Number</label>
                <input
                  style={styles.input}
                  type="text"
                  name="business_gst"
                  value={formData.business_gst}
                  onChange={handleChange}
                  placeholder="GST Number"
                />
              </div>
            </div>
          </div>
          
          <div style={styles.formSection}>
            <h3 style={styles.sectionHeader}>Social Media</h3>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
              <div style={{ flex: 1, minWidth: '200px' }}>
                <label style={styles.label}>Instagram</label>
                <input
                  style={styles.input}
                  type="text"
                  name="insta_link"
                  value={formData.insta_link}
                  onChange={handleChange}
                  placeholder="Instagram profile URL"
                />
              </div>
              <div style={{ flex: 1, minWidth: '200px' }}>
                <label style={styles.label}>Facebook</label>
                <input
                  style={styles.input}
                  type="text"
                  name="facebook_link"
                  value={formData.facebook_link}
                  onChange={handleChange}
                  placeholder="Facebook page URL"
                />
              </div>
              <div style={{ flex: 1, minWidth: '200px' }}>
                <label style={styles.label}>Website</label>
                <input
                  style={styles.input}
                  type="text"
                  name="website_link"
                  value={formData.website_link}
                  onChange={handleChange}
                  placeholder="Your website URL"
                />
              </div>
            </div>
          </div>
          
          <div style={styles.formSection}>
            <h3 style={styles.sectionHeader}>Business Media</h3>
            <div style={styles.inputGroup}>
              <label style={styles.label}>Business Banner* (Image for your listing)</label>
              <input
                type="file"
                name="business_banner"
                onChange={handleFileChange}
                accept="image/*"
                required
                style={{ marginTop: '10px' }}
              />
              <p style={{ fontSize: '14px', color: '#666', marginTop: '5px' }}>
                Recommended size: 600x400 pixels, max 2MB. This image will also be used for all business photos.
              </p>
            </div>
            
            {/* Hidden fields for business images that will automatically use the banner */}
            <input type="hidden" name="business_img_one" />
            <input type="hidden" name="business_img_two" />
            <input type="hidden" name="business_img_three" />
          </div>
          
          <div style={styles.formSection}>
            <h3 style={styles.sectionHeader}>Add Business Address</h3>
            <div style={styles.locationButton} onClick={getUserLocation}>
              <i className='bx bxs-map' style={styles.locationIcon}></i>
              <span>Get Current Location</span>
            </div>
            
            {userLocation && (
              <div style={{ marginBottom: '15px' }}>
                <a 
                  href={userLocation} 
                  target='_blank' 
                  rel="noopener noreferrer"
                  style={{ color: '#0081C7', textDecoration: 'underline' }}
                >
                  View on Google Maps
                </a>
              </div>
            )}
            
            <div style={styles.inputGroup}>
              <label style={styles.label}>Business Address*</label>
              <input
                style={styles.input}
                type="text"
                name="business_address"
                value={formData.business_address}
                onChange={handleChange}
                placeholder='Full address of your business'
                required
              />
              <input
                type="hidden"
                name="gmap_link"
                value={formData.gmap_link}
              />
            </div>
          </div>
          
          <button 
            type="submit" 
            style={styles.submitButton}
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Submitting...' : 'Submit Form'}
          </button>
        </form>
      </div>
    </div>
  );
}

export default AddListingForm;