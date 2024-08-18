"use client";

import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import React, { FormEvent, useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const SignUp = () => {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [ic, setIc] = useState("");
  const [phone, setPhone] = useState("");

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const props = { name, email, ic, phone };

    sessionStorage.setItem("userData", JSON.stringify(props));

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/wallet/create-user`,
        {
          method: "POST",
          headers: {
            client_id: String(process.env.NEXT_PUBLIC_CLIENT_ID),
            client_secret: String(process.env.NEXT_PUBLIC_CLIENT_SECRET),
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name,
            email,
            ic,
            phone,
          }),
        }
      );

      const result = await response.json();

      if (response.ok) {
        const walletAddress = result.result.wallet.wallet_address;

        sessionStorage.setItem("walletAddress", walletAddress);

        router.push("/sign-in");
      } else {
        console.log(`Error: ${result.message || "Something went wrong"}`);
      }
    } catch (error) {
      if (error instanceof Error) console.log(error.message);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="flex min-h-[100dvh] flex-col items-center justify-center bg-background px-4 py-12 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-md space-y-6">
          <div className="space-y-2 text-center">
            <h1 className="text-3xl font-bold">Sign Up</h1>
            <p className="text-muted-foreground">
              Enter your information to create an account.
            </p>
          </div>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  name="name"
                  placeholder="John Doe"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="identification-number">
                  Identification Number
                </Label>
                <Input
                  id="identification-number"
                  name="ic"
                  placeholder="123456789"
                  value={ic}
                  onChange={(e) => setIc(e.target.value)}
                  required
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                name="email"
                placeholder="m@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">Phone</Label>
              <Input
                id="phone"
                type="tel"
                name="phone"
                placeholder="+60 12 345-5555"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                required
              />
            </div>
            <Button type="submit" className="w-full">
              Sign Up
            </Button>
          </div>
          <div className="mt-4 text-center text-sm">
            Already have an account?{" "}
            <Link href="/sign-in" className="underline" prefetch={false}>
              Login
            </Link>
          </div>
        </div>
      </div>
    </form>
  );
};

export default SignUp;
