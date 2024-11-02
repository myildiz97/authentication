import RegisterForm from '@/components/register-form';
import AUTH_OPTIONS from '@/lib/auth-options';
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';

async function Register() {
  const session = await getServerSession(AUTH_OPTIONS);

  if (session) {
    redirect('/dashboard');
  }
  return (
    <div className="w-full min-h-screen flex flex-col items-center justify-center">
      <RegisterForm />
    </div>
  );
}

export default Register;
