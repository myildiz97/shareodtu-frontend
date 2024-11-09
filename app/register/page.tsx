import * as React from 'react';
import { authOptions } from '@/lib/auth-options';
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';

async function Register() {
  const session = await getServerSession(authOptions);

  if (session) {
    redirect('/dashboard');
  }

  return (
    <div>
      Register
    </div>
  );
}

export default Register;
