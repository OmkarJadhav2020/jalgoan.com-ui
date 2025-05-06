/**
 * Converts a string to a URL-friendly slug
 * @param {string} text - Text to convert into slug
 * @returns {string} URL-friendly slug
 */
export const createSlug = (text) => {
    if (!text) return '';
    
    return text
      .toString()
      .toLowerCase()
      .trim()
      .replace(/\s+/g, '-') // Replace spaces with hyphens
      .replace(/&/g, '-and-') // Replace & with 'and'
      .replace(/[^\w\-]+/g, '') // Remove all non-word characters except hyphens
      .replace(/\-\-+/g, '-') // Replace multiple hyphens with single hyphen
      .replace(/^-+/, '') // Trim hyphens from start
      .replace(/-+$/, ''); // Trim hyphens from end
  };
  
  /**
   * Generates a shop URL with ID and name as slug
   * @param {number|string} id - Shop ID
   * @param {string} name - Shop name
   * @returns {string} Shop URL path
   */
  export const getShopUrl = (id, name) => {
    if (!id || !name) return '/';
    
    const slug = createSlug(name);
    return `/shop/${id}/${slug}`;
  };