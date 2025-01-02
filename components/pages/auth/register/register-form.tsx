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
import Link from 'next/link';
import { Loader } from 'lucide-react';

const RegisterFormSchema = z.object({
  fullName: z.string().min(2, 'Full Name should be at least 2 characters.'),
  email: z.string().email({
    message: 'Please enter a valid email.',
  }).refine((email) => email.endsWith('@metu.edu.tr'), {
    message: 'Email must be a metu.edu.tr email address.',
  }),
  password: z.string().min(1, {
    message: 'Password is required.',
  }).min(8, {
    message: 'Password must be at least 8 characters long.',
  }),
});

export function RegisterForm() {
  const router = useRouter();
  const [isLoading, setIsLoading] = React.useState(false);
  

  const form = useForm<z.infer<typeof RegisterFormSchema>>({
    resolver: zodResolver(RegisterFormSchema),
    defaultValues: {
      fullName: '',
      email: '',
      password: '',
    },
  });

  async function onSubmit(data: z.infer<typeof RegisterFormSchema>) {
    // console.log(data);
    setIsLoading(true);

    const { fullName, email, password } = data;

    try {
      const formData = new URLSearchParams();
      formData.append("full_name", fullName);
      formData.append("email", email);
      formData.append("password", password);

      const baseURL = process.env.NEXT_PUBLIC_SHARE_ODTU_API_URL;
      const response = await fetch(`${baseURL}/users/create`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: formData.toString(),
      });

      if (response.ok) {
        toast.success('Verification email sent! Check your inbox.');
        form.reset();
        router.push('/auth/login');
      } else if (response.status === 409) {
        toast.error('User already registered');
        setIsLoading(false);
      } else {
        toast.error('Error registering user');
        setIsLoading(false);
      }
    } catch (error) {
      console.error(error);
      toast.error('Error registering user');
      setIsLoading(false);
    }
  }

  return (
    <div className="w-full flex flex-col items-center justify-center gap-y-4">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-full flex flex-col justify-center items-center gap-y-4"
        >
          <FormField
            control={form.control}
            name="fullName"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel className="font-bold text-xl">Full Name</FormLabel>
                <FormControl>
                  <Input className="text-lg px-4 py-2 bg-foreground text-background" placeholder="Kumpir" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
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
                'Register'
              )
            }
          </Button>
        </form>
      </Form>
      <Link href="/auth/login" className="text-background hover:text-accent">
        I have an account.
      </Link>
    </div>
  );
}