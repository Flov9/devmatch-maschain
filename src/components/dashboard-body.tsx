import React, { FormEvent, useEffect, useState } from "react";
import TokenBalance from "./token-balance";
import DonationCertificate from "./donation-certificate";
import BodyCheckup from "./body-checkup";

export function DashboardBody() {
  return (
    <div className="flex min-h-[100dvh] flex-col items-center justify-center bg-background px-4 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-md text-center">
        <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
          Your VTL Wallet and Certifications
        </h1>
        <div className="mt-6 flex flex-col items-center justify-center gap-8">
          <TokenBalance />
          <DonationCertificate />
        </div>
      </div>
    </div>
  );
}
