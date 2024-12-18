import * as React from "react"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { LoginForm } from './login-form'
import Image from 'next/image'
import { VerificationDialog } from './verification-dialog'

export function LoginCard() {
  return (
    <Card className="w-[300px] shadow-md bg-foreground text-background">
      <CardHeader className='p-4'>
        <CardTitle className="flex items-center justify-center gap-x-2">
          <Image src="/logos/odtu-logo.svg" alt="ODTU Logo" width={48} height={48} />
          <span>Welcome Home</span>
        </CardTitle>
        <CardDescription className='text-center text-lg text-background'>
          Log in to connect, share, and support fellow university members.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <LoginForm />
      </CardContent>
    </Card>
  )
}
