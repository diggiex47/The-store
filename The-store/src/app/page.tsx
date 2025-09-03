import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import PublicPage from './publicPage/page';

// 1. Make the component an async function
export default async function Home() {
  // 2. Use 'await' to get the actual cookie store
  const cookieStore = cookies();
  const authToken = (await cookieStore).get('token');

  if (authToken) {
    redirect('/dashboard');
  }

  return (
    <div>
      <PublicPage />
    </div>
  );
}