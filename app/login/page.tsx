import * as React from 'react';
import { authOptions } from '@/lib/auth-options';
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';

async function Login() {
  const session = await getServerSession(authOptions);

  if (session) {
    redirect('/dashboard');
  }

  return (
    <div>
      Login
    </div>
  );
}

export default Login;
