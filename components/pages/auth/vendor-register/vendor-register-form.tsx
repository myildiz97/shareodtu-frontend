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

const MAX_FILE_SIZE = 500000;
const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/jpg", "image/png", "image/webp"];

const VendorRegisterFormSchema = z.object({
    fullName: z.string().min(2, 'Full Name should be at least 2 characters.'),
    email: z.string().email({
        message: 'Please enter a valid email.',
    }),
    password: z.string().min(1, {
        message: 'Password is required.',
    }).min(8, {
        message: 'Password must be at least 8 characters long.',
    }),
    vendorAddress: z.string().min(10, 'Enter a valid address.'),
    facilityName: z.string().min(1, 'Facility Name is required.'),
    vendorPhone: z.string().min(10, 'Enter a valid phone number.'),
    vendorIdentityNo: z.string().min(11, 'Enter a valid identity number.'),
    image: z
    .instanceof(File)
    .refine((file) => file.size !== 0, "Please upload an image")
    .refine((file) => file.size <= MAX_FILE_SIZE, `Max file size is 5MB.`)
    .refine(
      (file) => ACCEPTED_IMAGE_TYPES.includes(file.type),
      ".jpg, .jpeg, .png and .webp files are accepted."
    ),
});

export function VendorRegisterForm() {
    const router = useRouter();

    const form = useForm<z.infer<typeof VendorRegisterFormSchema>>({
      resolver: zodResolver(VendorRegisterFormSchema),
      defaultValues: {
        fullName: '',
        email: '',
        password: '',
        vendorAddress: '',
        facilityName: '',
        vendorPhone: '',
        vendorIdentityNo: '',
        image: new File([""], "filename"),
      },
    });

    async function onSubmit(data: z.infer<typeof VendorRegisterFormSchema>) {
        const { fullName, email, password, vendorAddress, facilityName, vendorPhone, vendorIdentityNo, image } = data;

        try {
            const formData = new FormData(); // Use FormData instead of URLSearchParams
            formData.append("full_name", fullName);
            formData.append("email", email);
            formData.append("password", password);
            formData.append("vendor_address", vendorAddress);
            formData.append("facility_name", facilityName);
            formData.append("vendor_phone", vendorPhone);
            formData.append("vendor_identity_no", vendorIdentityNo);
            formData.append("image", image); // Append the file here

            const baseURL = process.env.NEXT_PUBLIC_SHARE_ODTU_API_URL;
            const response = await fetch(`${baseURL}/users/register_vendor`, {
                method: 'POST',
                body: formData,
            });

            if (response.ok) {
                toast.success('Thank you for registration request! We will contact you soon.');
                form.reset();
                router.push('/auth/login');
            } else if (response.status === 409) {
                toast.error('User already registered');
            } else {
                toast.error('Error registering user');
            }
        } catch (error) {
            console.error(error);
            toast.error('Error registering user');
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
                        name="vendorIdentityNo"
                        render={({ field }) => (
                            <FormItem className="w-full">
                                <FormLabel className="font-bold text-xl">Identity No</FormLabel>
                                <FormControl>
                                    <Input
                                        className="text-lg px-4 py-2 bg-foreground text-background"
                                        placeholder="12345678910"
                                        {...field}
                                    />
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
                    <FormField
                        control={form.control}
                        name="facilityName"
                        render={({ field }) => (
                            <FormItem className="w-full">
                                <FormLabel className="font-bold text-xl">Facility Name</FormLabel>
                                <FormControl>
                                    <Input
                                        className="text-lg px-4 py-2 bg-foreground text-background"
                                        placeholder="Kumpir Cafe"
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="vendorAddress"
                        render={({ field }) => (
                            <FormItem className="w-full">
                                <FormLabel className="font-bold text-xl">Facility Address</FormLabel>
                                <FormControl>
                                    <Input
                                        className="text-lg px-4 py-2 bg-foreground text-background"
                                        placeholder="Informatics Institute Building, 7th Floor, Room 705"
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="vendorPhone"
                        render={({ field }) => (
                            <FormItem className="w-full">
                                <FormLabel className="font-bold text-xl">Phone</FormLabel>
                                <FormControl>
                                    <Input
                                        className="text-lg px-4 py-2 bg-foreground text-background"
                                        placeholder="03122223344"
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="image"
                        render={({ field }) => (
                            <FormItem className="w-full">
                                <FormLabel className="font-bold text-xl">Image</FormLabel>
                                <FormControl>
                                    <Input
                                        className="text-lg px-4 py-2 bg-foreground text-background"
                                        type="file"
                                        onChange={(e) => {
                                            if (!e.target?.files?.[0]) return;
                                            form.setValue('image', e.target?.files?.[0]);
                                        }}
                                        onBlur={field.onBlur}
                                        name={field.name}
                                        ref={field.ref}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <Button type="submit" size={'lg'} className="text-lg bg-background text-foreground hover:bg-accent hover:text-foreground">
                        Register
                    </Button>
                </form>
            </Form>
            <Link href="/auth/login" className="text-background hover:text-accent">
                I have an account.
            </Link>
        </div>
    );
}