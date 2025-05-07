import Link from 'next/link';

export default function NotFound() {
  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      height: '100vh',
      textAlign: 'center',
      padding: '20px'
    }}>
      <h2 style={{ fontSize: '2rem', marginBottom: '20px' }}>Page Not Found</h2>
      <p style={{ marginBottom: '30px' }}>The page you are looking for doesn&apos;t exist or has been moved.</p>
      <Link href="/" style={{
        backgroundColor: '#0081C7',
        color: 'white',
        padding: '10px 20px',
        borderRadius: '4px',
        textDecoration: 'none'
      }}>
        Return Home
      </Link>
    </div>
  );
}