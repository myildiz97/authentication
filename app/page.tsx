import Link from 'next/link';

async function Home() {

  return (
    <div className="w-full min-h-screen flex flex-col items-center justify-center gap-y-4">
      <Link href="/login" className="text-blue-500">
        Login
      </Link>
      <Link href="/register" className="text-blue-500">
        Register
      </Link>
    </div>
  )
}

export default Home;