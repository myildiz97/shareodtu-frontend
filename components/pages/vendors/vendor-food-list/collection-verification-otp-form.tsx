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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { makeRequest } from '@/lib/make-request'
import toast from 'react-hot-toast'
import { IFoodData } from '@/lib/types'

const FormSchema = z.object({
  pin: z.string().min(6, {
    message: "Your code must be 6 characters.",
  }),
  foodType: z.string()
})

export function CollectionVerificationOTPForm({ foodData }: { foodData: IFoodData[] }) {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      pin: "",
      foodType: ""
    },
  })

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    const { pin, foodType } = data
    const body = {
      food_type: foodType,
      collection_code: parseFloat(pin),
    }
    try {
      await makeRequest("/foods/validate_collection_code", "POST", body);
      toast.success("Collection code verified successfully");
      setTimeout(() => {
        form.reset();
        window.location.reload();
      }, 1000);
    } catch (error: any) {
      console.error('Error verifying collection code', error);
      toast.error('Invalid collection code');
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-fit grid grid-cols-1 gap-y-4">
        <div className="grid grid-cols-4 gap-x-2">
          <FormField
            control={form.control}
            name="foodType"
            render={({ field }) => (
              <FormItem className='w-full'>
                <FormLabel>
                  Food Name
                </FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a food" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {foodData.map((food) => (
                      <SelectItem key={food.food_type} value={food.food_type}>
                        {food.food_type}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
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
                      <InputOTPSlot index={0} className='ring-primary' />
                      <InputOTPSlot index={1} className='ring-primary' />
                      <InputOTPSlot index={2} className='ring-primary' />
                      <InputOTPSlot index={3} className='ring-primary' />
                      <InputOTPSlot index={4} className='ring-primary' />
                      <InputOTPSlot index={5} className='ring-primary' />
                    </InputOTPGroup>
                  </InputOTP>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <Button type="submit" className='w-fit bg-background text-foreground hover:bg-accent'>
          Verify Code
        </Button>
      </form>
    </Form>
  )
}
