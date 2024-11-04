"use client";
import * as React from 'react';
import Link from 'next/link';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';

export default function LoginForm() {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [error, setError] = React.useState('');

  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      setError('Please fill all fields');
      return;
    }

    try {
      const authRes = await signIn('credentials', {
        email,
        password,
        redirect: false,
      });

      if (authRes?.error) {
        setError('Invalid Credentials');
        return;
      }

      router.push('/dashboard');
    } catch (error) {
      console.error(error);
      setError('Error logging in');
    }
  }


  return (
    <form onSubmit={handleSubmit} className='flex flex-col items-center justify-center gap-y-4'>
      <input onChange={(e) => setEmail(e.target.value)} className='p-2 rounded-sm' type="email" placeholder="Email" />
      <input onChange={(e) => setPassword(e.target.value)} className='p-2 rounded-sm' type="password" placeholder="Password" />
      <button type="submit" className='bg-green-500 p-2 rounded-sm'>Login</button>
      {
        error && (
          <div className='text-red-500'>
            {error}
          </div>
        )
      }
      <Link href='/register' className='text-blue-500'>
        Register
      </Link>
    </form>
  );
}