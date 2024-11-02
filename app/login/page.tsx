import LoginForm from '@/components/login-form';
// import AUTH_OPTIONS from '@/lib/auth-options';
// import { getServerSession } from 'next-auth';
// import { redirect } from 'next/navigation';

async function Login() {
  // const session = await getServerSession(AUTH_OPTIONS);

  // if (session) {
  //   redirect('/dashboard');
  // }

  return (
    <div className="w-full min-h-screen flex flex-col items-center justify-center">
      <LoginForm />
    </div>
  );
}

export default Login;