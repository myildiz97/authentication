import LoginForm from '@/components/login-form';
import AUTH_OPTIONS from '@/lib/auth-options';
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';

async function Home() {
  const session = await getServerSession(AUTH_OPTIONS);

  if (session) {
    console.log('Session found, redirecting to dashboard');
    redirect('/dashboard');
  }


  return (
    <div className="w-full min-h-screen flex flex-col items-center justify-center">
      <LoginForm />
    </div>
  );
}

export default Home;