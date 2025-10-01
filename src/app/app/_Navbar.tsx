"use client";
import { Bot } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/ui/ThemeToggle";
import { SignOutButton, useClerk } from "@clerk/nextjs";
import Link from "next/link";
import { UserAvatar } from "@/components/UserAvatar";

export function Navbar({ user }: { user: { name: string; imageUrl: string } }) {
  const { openUserProfile } = useClerk();

  return (
    <nav className="h-header  border-b ">
      <div className="flex h-full items-center justify-between px-4">
        {/* Left side - Application name and logo */}
        <Link href="/app" className="flex items-center space-x-2">
          <Bot className="h-8 w-8 text-primary" />
          <span className="text-xl font-semibold">Preply</span>
        </Link>

        {/* Right side - Theme toggle and user dropdown */}
        <div className="flex items-center space-x-4">
          <ThemeToggle />

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                <UserAvatar user={user} />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="end">
              <DropdownMenuItem
                onClick={() => openUserProfile()}
                className="cursor-pointer"
              >
                Profile
              </DropdownMenuItem>
              <SignOutButton>
                <DropdownMenuItem className="cursor-pointer">
                  Logout
                </DropdownMenuItem>
              </SignOutButton>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </nav>
  );
}
