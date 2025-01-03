"use client"

import { Loader, LogOut, Settings, User } from 'lucide-react'

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { signOut, useSession } from 'next-auth/react';
import toast from 'react-hot-toast';
import Link from 'next/link';
import { useState } from 'react';

export function UserNav() {
  const { data: session } = useSession();
  const [isLoading, setIsLoading] = useState(false);
  

  const handleLogout = async () => {
    setIsLoading(true);
    toast.success('See you soon!');
    setTimeout(async () => {
      await signOut();
      setIsLoading(false);
    }, 1000);
  };

  return (
    <DropdownMenu> 
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size={'icon'} className="h-10 w-10 px-0 ml-auto">
          <User />
          <span className="sr-only">Open user menu</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="max-w-56" align="end">
        <DropdownMenuLabel>
          {session?.user.full_name}
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          {/* <DropdownMenuItem asChild>
            <Link href="/profile" className='flex'>
              <User className="mr-2 h-4 w-4" />
              <span>Profile</span>
            </Link>
          </DropdownMenuItem> */}
          <DropdownMenuItem asChild>
            <Link href="/settings" className='flex'>
              <Settings className="mr-2 h-4 w-4" />
              <span>Settings</span>
            </Link>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem 
          onClick={handleLogout}
          disabled={isLoading}
        >
          <LogOut className="mr-2 h-4 w-4" />
          {
            isLoading ? (
              <Loader className="h-4 w-4 animate-spin" />
            ): (
              <span>Log out</span>
            )
          }
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

