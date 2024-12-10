'use client';
import { signOut, useSession } from 'next-auth/react';
import * as React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import toast from 'react-hot-toast';

export default function DashboardCard() {
  const { data: session } = useSession();
  const handleLogout = async () => {
    toast.success('See you soon!');
    setTimeout(async () => {
      await signOut();
    }, 1000);
  };


  return (
    <Card className="bg-foreground text-background">
      <CardHeader>
        <CardTitle>Authenticated User</CardTitle>
        <CardDescription>This is a protected route.</CardDescription>
      </CardHeader>
      <CardContent className='w-full'>
        <p className="text-wrap">
          Welcome, <strong>{session?.user.full_name}</strong>
        </p>
        <p className="text-wrap">
          You are logged in as <strong>{session?.user?.email}</strong>
        </p>
      </CardContent>
      <CardFooter>
        <Button className="bg-background text-foreground hover:bg-accent" onClick={handleLogout} size={'lg'}>
          Logout
        </Button>
      </CardFooter>
    </Card>
  );
}