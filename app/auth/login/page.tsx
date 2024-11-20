import * as React from 'react';
import { authOptions } from '@/lib/auth-options';
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import { LoginCard } from '@/components/auth/login/login-card';

async function Login() {
  const session = await getServerSession(authOptions);

  if (session) {
    redirect('/dashboard');
  }

  return (
    <div className="w-full min-h-screen flex flex-col items-center justify-center">
      <LoginCard />
    </div>
  );
}

export default Login;