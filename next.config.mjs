/** @type {import('next').NextConfig} */
const nextConfig = {
    async redirects() {
      return [
        // The redirect will be handled by our redirector page component,
        // so we won't define redirects here that would bypass our logic
        
        // This is a placeholder for any future static redirects we might need
      ];
    },
  };
  
  export default nextConfig;