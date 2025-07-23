'use client';

import { useRouter } from 'next/navigation';

export default function Home() {
  const router = useRouter();

  const handleLogin = () => router.push('/login');
  const handleRegister = () => router.push('/register');

  return (
    <main style={{ padding: '2rem' }}>
      <h1 style={{ textAlign: 'center', fontSize: '2.5rem'}}>Welcome to the Social Network</h1>
      <p style={{ textAlign: 'center' }}>Login or Register to get started.</p>

      <div style={{
        display: 'flex',
        justifyContent: 'flex-end',
        gap: '1rem',
        marginTop: '2rem'
      }}>
        <button onClick={handleLogin} style={buttonStyle}>
          Login
        </button>
        <button onClick={handleRegister} style={buttonStyle}>
          Register
        </button>
      </div>
    </main>
  );
}

const buttonStyle = {
  backgroundColor: '#0070f3',
  color: 'white',
  padding: '10px 20px',
  border: 'none',
  borderRadius: '5px',
  cursor: 'pointer'
};
