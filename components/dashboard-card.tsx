'use client';
import { signOut, useSession } from 'next-auth/react';
import * as React from 'react';
import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from './ui/card';

export default function DashboardCard() {
  const { data: session } = useSession();
  const handleLogout = async () => {
    await signOut();
  };

  return (
    <Card className="bg-foreground text-background w-[320px] sm:1/2 lg:w-1/3 xl:1/2">
      <CardHeader>
        <CardTitle>Authenticated User</CardTitle>
        <CardDescription>This is a protected route.</CardDescription>
      </CardHeader>
      <CardContent>
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