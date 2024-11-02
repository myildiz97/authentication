import LoginForm from '@/components/login-form';
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import { authOptions } from './api/auth/[...nextauth]/route';

export async function Home() {
  const session = await getServerSession(authOptions);

  if (session) {
    redirect('/dashboard');
  }
  return (
    <div className="w-full min-h-screen flex flex-col items-center justify-center">
      <LoginForm />
    </div>
  );
}

export default Home;