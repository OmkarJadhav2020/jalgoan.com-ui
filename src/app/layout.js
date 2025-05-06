import './globals.css';
import Providers from './providers';

export const metadata = {
  title: 'Jalgaon.com',
  description: 'Discover Jalgaon businesses and services',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link href='https://unpkg.com/boxicons@2.1.4/css/boxicons.min.css' rel='stylesheet' />
      </head>
      <body>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}