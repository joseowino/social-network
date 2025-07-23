// app/page.js
'use client'; // required for using navigation hooks

import { useRouter } from 'next/navigation';
export default function Home() {
    const router = useRouter();

  const handleLogin = () => router.push('/login');
  const handleRegister = () => router.push('/register');
  return (
    <main style={{ textAlign: 'center', paddingTop: '2rem' }}>
      <h1>Welcome to the Social Network</h1>
      <p>Login or Register to get started.</p>

      <button onClick={handleLogin}
  style={{
    backgroundColor: '#0070f3',
    color: 'white',
    padding: '10px 20px',
    border: 'none',
    borderRadius: '5px',
    marginRight: '1rem',
    cursor: 'pointer'
  }}>
        Login
      </button>

      <button onClick={handleRegister}
  style={{
    backgroundColor: '#0070f3',
    color: 'white',
    padding: '10px 20px',
    border: 'none',
    borderRadius: '5px',
    marginRight: '1rem',
    cursor: 'pointer'
  }}>
        Register
      </button>
    </main>
  );
}
