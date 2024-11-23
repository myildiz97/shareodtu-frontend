'use client';
import { signOut, useSession } from 'next-auth/react';
import * as React from 'react';
import { Button } from '../ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../ui/card';
import toast from 'react-hot-toast';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
// import { SettingsForm } from './settings-form';

export default function DashboardCard() {
  const { data: session } = useSession();
  const handleLogout = async () => {
    toast.success('See you soon!');
    setTimeout(async () => {
      await signOut();
    }, 1000);
  };


  return (
    <Card className="bg-foreground text-background w-[300px]">
      <CardHeader>
        <Link href="/vendors" className='ml-auto text-blue-400 hover:text-blue-500 text-sm'>
          Go to Vendors
          <ArrowRight className='inline-block ml-1' />
        </Link>
        <CardTitle className='flex items-center justify-between'>
          Settings
        </CardTitle>
        <CardDescription>
          Manage your account settings.
        </CardDescription>
      </CardHeader>
      <CardContent className='w-full'>
        <p className="text-wrap">
          Welcome, <strong>{session?.user.full_name}</strong>
        </p>
        <p className="text-wrap">
          You are logged in as <strong>{session?.user?.email}</strong>
        </p>
        {/* <SettingsForm email={session?.user.email as string} fullName={session?.user.full_name as string} /> */}
      </CardContent>
      <CardFooter>
        <Button className="bg-background text-foreground hover:bg-accent ml-auto" onClick={handleLogout} size={'lg'}>
          Logout
        </Button>
      </CardFooter>
    </Card>
  );
}