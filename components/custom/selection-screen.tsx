"use client"

import Link from "next/link"
import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import toast from 'react-hot-toast'
import { useState } from 'react'
import { Loader } from 'lucide-react'

export default function SelectionScreen() {
  const [goingTo, setGoingTo] = useState<boolean>(false)
  const onSelect = (text: string) => {
    setGoingTo(true)
    toast.success(`Directing you to ${text}...`)
    setTimeout(() => {
      setGoingTo(false)
    }, 6000)
  }

  return (
    <div className="h-full my-auto p-4 md:p-8">
      <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8">
        <Link href="/vendors" onClick={() => onSelect('Vendors Page')} className={goingTo ? 'pointer-events-none opacity-70' : ''}>
          <Card className="h-full transition-transform hover:scale-105 bg-white text-background">
            <CardContent className="p-6 flex flex-col items-center text-center space-y-6">
              <h2 className="text-2xl font-semibold">Suspended food</h2>
              <div className="relative w-48 h-48 rounded-md flex items-center justify-center">
                {
                  goingTo ? (
                    <Loader size={48} className='animate-spin' />
                  ) : (
                    <Image
                      src="/image1.png"
                      alt="Illustration of a person holding a food donations box"
                      fill
                      className="object-fill rounded-lg"
                      priority
                    />
                  )
                }
              </div>
            </CardContent>
          </Card>
        </Link>

        <Link href="/swap" onClick={() => onSelect('Swap & Share Page')} className={goingTo ? 'pointer-events-none opacity-70' : ''}>
          <Card className="h-full transition-transform hover:scale-105 bg-white text-background">
            <CardContent className="p-6 flex flex-col items-center text-center space-y-6">
              <h2 className="text-2xl font-semibold">Swap & Share</h2>
              <div className="relative w-48 h-48 rounded-md flex items-center justify-center">
                {
                  goingTo ? (
                    <Loader size={48} className='animate-spin' />
                  ) : (
                    <Image
                      src="/image2.png"
                      alt="Illustration of a person holding a food donations box"
                      fill
                      className="object-fill rounded-lg"
                      priority
                    />
                  )
                }
              </div>
            </CardContent>
          </Card>
        </Link>
      </div>
    </div>
  )
}

