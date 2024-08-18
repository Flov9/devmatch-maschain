"use client";

import AuthenticatedPage from "@/components/Authentication";
import { DashboardBody } from "@/components/dashboard-body";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MountainIcon } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Home() {
  const walletAddress = sessionStorage.getItem("walletAddress");

  const router = useRouter();

  const handleClick = () => {
    sessionStorage.removeItem("walletAddress");
    router.push("/sign-in");
  };

  return (
    <AuthenticatedPage>
      <main className="flex min-h-[100dvh] flex-col bg-background">
        <header className="flex h-14 items-center justify-between border-b bg-muted/40 px-6">
          <Link
            href="#"
            className="flex items-center gap-2 font-semibold"
            prefetch={false}
          >
            <MountainIcon className="h-6 w-6" />
            <span className="sr-only">VTL</span>
          </Link>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="rounded-md border w-32 bg-black text-white"
              >
                <div className="text-sm font-medium">
                  {walletAddress?.slice(0, 6) +
                    "..." +
                    walletAddress?.slice(-4)}
                </div>
                <span className="sr-only">Toggle user menu</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>John Doe</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <div className="text-sm">john@example.com</div>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <Button variant="destructive" onClick={handleClick}>
                  Disconnect
                </Button>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </header>

        <DashboardBody />
      </main>
    </AuthenticatedPage>
  );
}
