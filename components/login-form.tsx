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

const LoginFormSchema = z.object({
  email: z.string().email({
    message: 'Please enter a valid email.',
  }),
  password: z.string(),
});

export function LoginForm() {
  const router = useRouter();

  const form = useForm<z.infer<typeof LoginFormSchema>>({
    resolver: zodResolver(LoginFormSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  async function onSubmit(data: z.infer<typeof LoginFormSchema>) {
    // console.log(data);

    const { email, password } = data;

    try {
      const authRes = await signIn('credentials', {
        email,
        password,
        redirect: false,
      });

      if (authRes?.error) {
        toast.error('Invalid Credentials');
        return;
      }

      router.push('/dashboard');
    } catch (error) {
      console.error(error);
      toast.error('Error logging in');
    }
  }

  return (
    <div className="w-full flex flex-col items-center justify-center gap-y-4">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-[300px] sm:w-1/2 lg:1/3 flex flex-col justify-center items-center gap-y-4"
        >
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel className="font-bold text-foreground text-xl">Email</FormLabel>
                <FormControl>
                  <Input
                    className="text-lg px-4 py-2 bg-foreground text-background"
                    placeholder="myildizwork@gmail.com"
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
                <FormLabel className="font-bold text-foreground text-xl">Password</FormLabel>
                <FormControl>
                  <Input
                    className="text-lg px-4 py-2 bg-foreground text-background"
                    placeholder="Password"
                    type="password"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" size={'lg'} className="text-lg bg-foreground text-background hover:bg-accent">
            Login
          </Button>
        </form>
      </Form>
      <Link href="/register" className="text-foreground hover:text-accent">
        I do not have account
      </Link>
    </div>
  );
}