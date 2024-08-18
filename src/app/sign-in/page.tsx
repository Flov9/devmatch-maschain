"use client";

import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import WalletAddressAlert from "@/components/wallet-address-alert";

export default function SignIn() {
  const router = useRouter();
  const [walletAddress, setWalletAddress] = useState("");

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/wallet/wallet/${walletAddress}`,
        {
          method: "GET",
          headers: {
            client_id: String(process.env.NEXT_PUBLIC_CLIENT_ID),
            client_secret: String(process.env.NEXT_PUBLIC_CLIENT_SECRET),
            "Content-Type": "application/json",
          },
        }
      );

      const result = await response.json();

      if (response.ok) {
        // Store the wallet address in local storage or session storage
        sessionStorage.setItem("walletAddress", walletAddress);
        console.log(result.result);
        // User is authenticated, redirect to protected route
        router.push("/");
      } else {
        console.log(`Error: ${result.message || "No such wallet address"}`);
      }
    } catch (error) {
      if (error instanceof Error) console.log(error.message);
    }
  };

  return (
    <>
      {sessionStorage.getItem("walletAddress") && (
        <WalletAddressAlert
          walletAddress={sessionStorage.getItem("walletAddress") ?? ""}
        />
      )}
      <form onSubmit={handleSubmit}>
        <div className="flex min-h-[100dvh] flex-col items-center justify-center bg-background px-4 py-12 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-md space-y-6">
            <div className="space-y-2 text-center">
              <h1 className="text-3xl font-bold">Login</h1>
              <p className="text-muted-foreground">
                Enter your wallet address to access your account.
              </p>
            </div>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="identifier">Wallet Address</Label>
                <Input
                  id="identifier"
                  type="text"
                  value={walletAddress}
                  onChange={(e) => setWalletAddress(e.target.value)}
                  placeholder="x123456789"
                  required
                />
              </div>
              <Button type="submit" className="w-full">
                Login
              </Button>
            </div>
            <div className="mt-4 text-center text-sm">
              Don&apos;t have an account?{" "}
              <Link href="/sign-up" className="underline" prefetch={false}>
                Sign up
              </Link>
            </div>
          </div>
        </div>
      </form>
    </>
  );
}
