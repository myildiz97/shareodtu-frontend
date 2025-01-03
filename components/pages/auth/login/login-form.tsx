'use client';
import * as React from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import toast from 'react-hot-toast';

import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useRouter } from 'next/navigation';
import { signIn } from 'next-auth/react';
import Link from 'next/link';
import { VerificationDialog } from './verification-dialog';
import { Loader } from 'lucide-react';

const LoginFormSchema = z.object({
  email: z.string().email({
    message: 'Please enter a valid email.',
  }),
  password: z.string().min(1, {
    message: 'Password is required.',
  }).min(8, {
    message: 'Password must be at least 8 characters long.',
  }),
});

export function LoginForm() {
  const router = useRouter();
  const [verificationDialogOpen, setVerificationDialogOpen] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);

  const form = useForm<z.infer<typeof LoginFormSchema>>({
    resolver: zodResolver(LoginFormSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  async function onSubmit(data: z.infer<typeof LoginFormSchema>) {
    // console.log(data);
    setIsLoading(true);

    const { email, password } = data;

    try {
      const authRes = await signIn('credentials', {
        email,
        password,
        redirect: false,
      }).catch(error => {
        console.error('Error during sign-in:', error);
        toast.error('Error during sign-in');
        setIsLoading(false);
        return null;
      });

      const formData = new URLSearchParams();
      formData.append("email", email);

      const baseURL = process.env.NEXT_PUBLIC_SHARE_ODTU_API_URL;
      const response = await fetch(`${baseURL}/users/type/${email}`, {
        method: 'GET'});
      const userType = await response.json();


      if (authRes?.error === 'NOT_VERIFIED') {
        if (userType === 'vendor') {
          toast.error('Please wait for approval');
          return;
        }
        else {
          toast.error('Please verify your account');
          setVerificationDialogOpen(true);
          return;
        }
      }

      if (authRes?.error) {
        toast.error('Invalid Credentials');
        setIsLoading(false);
        return;
      }

      toast.success('Welcome back!');
      router.push('/vendors');

    } catch (error: any) {
      console.error(error);
      toast.error('Error logging in');
      setIsLoading(false);
    } 
  }

  return (
    <div className="w-full flex flex-col items-center justify-center gap-y-4">
      <VerificationDialog 
        open={verificationDialogOpen} 
        setOpen={setVerificationDialogOpen}
        email={form.getValues('email')}
        password={form.getValues('password')}
        setIsLoggingIn={setIsLoading}
      />
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-full flex flex-col justify-center items-center gap-y-4"
        >
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel className="font-bold text-xl">Email</FormLabel>
                <FormControl>
                  <Input
                    className="text-lg px-4 py-2 bg-foreground text-background"
                    placeholder="kumpir@metu.edu.tr"
                    type="email"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel className="font-bold text-xl">Password</FormLabel>
                <FormControl>
                  <Input
                    className="text-lg px-4 py-2 bg-foreground text-background"
                    placeholder="********"
                    type="password"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {/* <Link href="/forgot-password" className="hover:text-accent">
            Forgot Password?
          </Link> */}
          <Button 
            type="submit" 
            size={'lg'} 
            className="text-lg bg-background text-foreground hover:bg-accent hover:text-foreground"
            disabled={isLoading}
          >
            {
              isLoading ? (
                <Loader size={24} className='animate-spin' />
              ): (
                'Log In'
              )
            }
          </Button>
        </form>
      </Form>
      <Link href="/auth/register" className="hover:text-accent">
        Register
      </Link>
      <Link href="/auth/vendor-register" className="hover:text-accent">
        Register as a vendor
      </Link>
    </div>
  );
}