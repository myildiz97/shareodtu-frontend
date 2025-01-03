import * as React from "react"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import Image from 'next/image'
import { VendorRegisterForm } from './vendor-register-form'

export function RegisterCard() {
  return (
    <Card className="w-[300px] md:w-[720px] shadow-md bg-foreground text-background">
      <CardHeader className='p-4'>
        <CardTitle className="flex items-center justify-center gap-x-2">
          <Image src="/logos/odtu-logo.svg" alt="ODTU Logo" width={48} height={48} />
          <span>Join Us</span>
        </CardTitle>
        <CardDescription className='text-center text-lg text-background'>
            As soon as you fill the form, our team will review your application.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <VendorRegisterForm />
      </CardContent>
    </Card>
  )
}
