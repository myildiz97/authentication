import Link from 'next/link';

async function Home() {

  return (
    <div className="w-full min-h-screen flex flex-col items-center justify-center">
      <Link href="/login" className="text-blue-500">
        Login
      </Link>
    </div>
  )
}

export default Home;