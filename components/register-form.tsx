"use client";
import * as React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function RegisterForm() {
  const [name, setName] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [error, setError] = React.useState('');

  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !password) {
      setError('Please fill all fields');
      return;
    }

    try {
      const res = await fetch('/api/userExists', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      const { user } = await res.json();
      if (user) {
        setError('User already exists');
        return;
      }

      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, password }),
      });

      if (response.ok) {
        const form = e.target as HTMLFormElement;
        form.reset();
        console.log('User registered');
        router.push('/');
      } else {
        setError('Error registering user');
      }
    } catch (error) {
      console.error(error);
      setError('Error registering user');
    }
  }

  return (
    <form className='flex flex-col items-center justify-center gap-y-4' onSubmit={handleSubmit}>
      <input 
        className='p-2 rounded-sm' 
        type="text" 
        placeholder="Name"
        onChange={(e) => setName(e.target.value)}
      />
      <input 
        className='p-2 rounded-sm' 
        type="email" 
        placeholder="Email"
        onChange={(e) => setEmail(e.target.value)}
      />
      <input 
        className='p-2 rounded-sm' 
        type="password" 
        placeholder="Password"
        onChange={(e) => setPassword(e.target.value)}
      />
      <button 
        type="submit" 
        className='bg-green-500 p-2 rounded-sm'
      >
      Register
      </button>
      {
        error && (
          <div className='text-red-500'>
            {error}
          </div>
        )
      }
      <Link 
        href='/login' 
        className='text-blue-500'
      >
        Login
      </Link>
    </form>
  );
} 