"use client"

import { useState } from "react"
import { Menu, ChevronLeft } from 'lucide-react'
import Link from "next/link"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { Separator } from "@/components/ui/separator"
import { usePathname } from 'next/navigation'

interface MainNavProps extends React.HTMLAttributes<HTMLElement> {
  items?: {
    href: string
    title: string
  }[];
  homeActive: boolean;
}

export function MainNav({ className, items, homeActive, ...props }: MainNavProps) {
  const [open, setOpen] = useState(false)

  const pathname = usePathname();

  if (pathname === '/dashboard') {
    return null;
  }

  return (
    <nav
      className={cn("flex items-center gap-4", className)}
      {...props}
    >
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger asChild>
          <Button variant="ghost" className="mr-2 px-0 text-base hover:bg-transparent focus-visible:bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 sm:hidden">
            <Menu className="h-6 w-6" />
            <span className="sr-only">Toggle Menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="pr-0 max-w-[240px] sm:hidden">
          <SheetHeader>
            <SheetTitle className='text-left'>Menu</SheetTitle>
          </SheetHeader>
          <div className="grid gap-4 py-4">
            {
              homeActive && (
                <Link
                  href="/"
                  className="font-medium transition-colors"
                  onClick={() => setOpen(false)}
                >
                  Home
                </Link>
              )
            }
            {items?.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="font-medium transition-colors"
                onClick={() => setOpen(false)}
              >
                {item.title}
              </Link>
            ))}
          </div>
        </SheetContent>
      </Sheet>
      {
        homeActive && (
          <>
            <Link
              href="/"
              className="hidden sm:flex items-center space-x-2"
              >
              <ChevronLeft className="h-5 w-5" />
              <span className="font-bold sm:inline-block">
                Home
              </span>
            </Link>
            <Separator className="hidden sm:flex sm:h-6" orientation='vertical' />
          </>
        )
      }
      {items?.map((item, i) => (
        <Link
          key={item.href}
          href={item.href}
          className={cn(
            "hidden font-medium transition-colors hover:text-primary sm:inline-block",
            `${!homeActive && i === 0 ? 'sm:ml-3' : ''}`,
          )}
        >
          {item.title}
        </Link>
      ))}
    </nav>
  )
}

