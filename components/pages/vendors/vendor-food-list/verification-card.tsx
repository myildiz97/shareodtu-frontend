import * as React from "react"

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { CollectionVerificationOTPForm } from './collection-verification-otp-form'
import { IFoodData } from '@/lib/types'

export function VerificationCard({ foodData }: { foodData: IFoodData[] }) {
  return (
    <Card className='w-[96%] xl:w-full mx-auto mt-4 bg-foreground text-background'>
      <CardHeader>
        <CardTitle>
          Verify collection code.
        </CardTitle>
        <CardDescription>
          Please enter the collection code provided by the user selecting the food.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <CollectionVerificationOTPForm foodData={foodData} />
      </CardContent>
    </Card>
  )
}
