"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp"
import { makeRequest } from '@/lib/make-request'
import toast from 'react-hot-toast'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { Loader } from 'lucide-react'

const FormSchema = z.object({
  pin: z.string().min(6, {
    message: "Your code must be 6 characters.",
  }),
})

export function OTPForm({ email, password, setOpen, setIsLoggingIn }: { email: string; password: string; setOpen: (open: boolean) => void; setIsLoggingIn: (loading: boolean) => void;  }) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  
  
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      pin: "",
    },
  })

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    setIsLoading(true);

    const { pin } = data
    const body = {
      email: email,
      code: parseFloat(pin),
    }
    try {
      await makeRequest("/verify", "POST", body);
      toast.success("Account verified successfully! Logging you in...");
      setOpen(false);

      setIsLoggingIn(true);
      await signIn('credentials', {
        email,
        password,
        redirect: false,
      });

      toast.success('Welcome back!');
      router.push('/vendors');

    } catch (error: any) {
      const errorMessage = error.toString().split(":")[1].trim();
      if (errorMessage === 'Verification code has expired') {
        toast.error('Verification code has expired! New code will be sent to your email in a few seconds...');
        setTimeout(async () => {
          await makeRequest(`/send_verification_email/${email}`, "POST", { email });
          toast.success("New verification code sent to your email");
        }, 3000);
      } else {
        toast.error('Invalid verification code');
      }
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="pin"
          render={({ field }) => (
            <FormItem className='w-full'>
              <FormLabel>
                Verification Code
              </FormLabel>
              <FormControl>
                <InputOTP maxLength={6} {...field}>
                  <InputOTPGroup>
                    <InputOTPSlot index={0} />
                    <InputOTPSlot index={1} />
                    <InputOTPSlot index={2} />
                    <InputOTPSlot index={3} />
                    <InputOTPSlot index={4} />
                    <InputOTPSlot index={5} />
                  </InputOTPGroup>
                </InputOTP>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button 
          type="submit" 
          className='w-full bg-foreground text-background hover:bg-accent'
          disabled={isLoading}
        >
          {
            isLoading ? (
              <Loader size={24} className='animate-spin' />
            ) : (
              'Verify Account'
            )
          }
        </Button>
      </form>
    </Form>
  )
}
