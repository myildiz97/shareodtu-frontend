import * as React from 'react';
import { authOptions } from '@/lib/auth-options';
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import { RegisterCard } from '@/components/pages/auth/vendor-register/vendor-register-card';

async function VendorRegister() {
  const session = await getServerSession(authOptions);

  if (session) {
    redirect('/dashboard');
  }

  return (
    <div className="w-full min-h-screen flex flex-col items-center justify-center">
      <RegisterCard />
    </div>
  )
  
}

export default VendorRegister;
