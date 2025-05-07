// src/context/SubCategoryContext.jsx
'use client';

import React, { createContext, useState, useEffect, useCallback } from 'react';
import axios from 'axios';

export const SubCategoryContext = createContext();

export const SubCategoryProvider = ({ children }) => {
  const djangoApi = process.env.NEXT_PUBLIC_DJANGO_API;
  const [subCategories, setSubCategories] = useState([]);
  const [mainCategoryMapping, setMainCategoryMapping] = useState({});
  const [loadingSubCategories, setLoadingSubCategories] = useState(true);
  const [error, setError] = useState(null);

  // Normalize text function to help with matching
  const normalizeText = (text) => {
    if (!text) return '';
    // Only lowercase and trim, no other transformations
    return text.toLowerCase().trim();
  };

  const fetchSubCategories = useCallback(async () => {
    if (subCategories.length > 0) return; // Don't fetch if we already have data
    
    try {
      setLoadingSubCategories(true);
      console.log('Fetching all subcategories...');
      
      const timestamp = new Date().getTime();
      const response = await axios.get(`${djangoApi}/app/subCategorys/?_=${timestamp}`);
      
      if (response.data && response.data.categories) {
        const categories = response.data.categories;
        setSubCategories(categories);
        
        // Create a mapping of normalized main category names to their subcategories
        const mapping = {};
        
        // Group subcategories by their main_category (preserving original case)
        categories.forEach(subCategory => {
          const mainCat = subCategory.main_category; // Use original format
          if (!mapping[mainCat]) {
            mapping[mainCat] = [];
          }
          mapping[mainCat].push(subCategory);
        });
        
        console.log('Subcategory mapping created:', Object.keys(mapping));
        setMainCategoryMapping(mapping);
      }
      
      setLoadingSubCategories(false);
    } catch (err) {
      console.error('Error fetching sub-categories:', err);
      setError(err.message || 'Failed to load sub-categories');
      setLoadingSubCategories(false);
    }
  }, [djangoApi, subCategories.length]);

  useEffect(() => {
    fetchSubCategories();
  }, [fetchSubCategories]);

  // Function to get sub-categories for a specific main category
  const getSubCategoriesForMain = useCallback((mainCategory) => {
    if (!mainCategory) return [];
    
    // Try exact match first
    if (mainCategoryMapping[mainCategory]) {
      console.log(`Found ${mainCategoryMapping[mainCategory].length} subcategories with exact match for ${mainCategory}`);
      return mainCategoryMapping[mainCategory];
    }
    
    // If no exact match, try case-insensitive match
    const normalizedMainCat = normalizeText(mainCategory);
    const keys = Object.keys(mainCategoryMapping);
    
    // Find a case-insensitive match
    for (const key of keys) {
      if (normalizeText(key) === normalizedMainCat) {
        console.log(`Found ${mainCategoryMapping[key].length} subcategories with case-insensitive match for ${mainCategory}`);
        return mainCategoryMapping[key];
      }
    }
    
    console.log(`No subcategories found for ${mainCategory}`);
    console.log('Available categories:', Object.keys(mainCategoryMapping));
    return [];
  }, [mainCategoryMapping]);

  // Debug function to help identify issues
  const debugCategoryMappings = useCallback(() => {
    return {
      allSubCategories: subCategories.length,
      mainCategoryKeys: Object.keys(mainCategoryMapping),
      subCategoryExample: subCategories.length > 0 ? subCategories[0] : null,
      mapping: mainCategoryMapping
    };
  }, [subCategories, mainCategoryMapping]);

  return (
    <SubCategoryContext.Provider 
      value={{ 
        subCategories, 
        loadingSubCategories,
        error,
        getSubCategoriesForMain,
        debugCategoryMappings
      }}
    >
      {children}
    </SubCategoryContext.Provider>
  );
};