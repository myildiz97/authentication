"use client"
import { signOut, useSession } from 'next-auth/react';
import * as React from 'react';

export default function UserInfo() {
  const { data: session } = useSession();
  return (
    <div>
      <h1>User Info</h1>
      <p>Name: <span>
        {session?.user?.name}
        </span></p>
      <p>Email: <span>
        {session?.user?.email}
        </span></p>
      <button className='bg-red-500 p-2 rounded-sm' onClick={() => signOut()}>
        Logout
      </button>
    </div>
  )
}