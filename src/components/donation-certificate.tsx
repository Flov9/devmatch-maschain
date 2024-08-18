import React, { FormEvent, useEffect, useState } from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "./ui/card";

const DonationCertificate = () => {
  const walletAddress = sessionStorage.getItem("walletAddress");
  const [dates, setDates] = useState<String[]>([]);

  useEffect(() => {
    const fetchTokenBalance = async () => {
      try {
        const response = await fetch(
          `${
            process.env.NEXT_PUBLIC_API_URL
          }/api/certificate/get-certificate?to=${walletAddress}&contract_address=${String(
            process.env.CERTIFICATE_SERVICE_SMART_CONTRACT_ADDRESS
          )}`,
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

        console.log("certificate", result);

        if (response.ok) {
          const timestamps = result.result.map(
            (obj: { created_at: String }) => obj.created_at
          );

          const humanReadableDates = timestamps.map(
            (timestamp: string | number | Date) => {
              const date = new Date(timestamp);
              return date.toLocaleString("en-US", {
                month: "long",
                day: "numeric",
                year: "numeric",
              });
            }
          );

          setDates(humanReadableDates);
        }
      } catch (error) {
        if (error instanceof Error) console.log(error.message);
      }
    };

    fetchTokenBalance();
  }, [walletAddress]);

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle>Blood Donation Certifications</CardTitle>
      </CardHeader>
      <CardContent className="max-h-[300px] overflow-auto">
        <ul className="space-y-4">
          {dates.map((date, index) => (
            <li key={index} className="flex items-center gap-4">
              <AwardIcon className="h-6 w-6 text-primary" />
              <div>
                <div className="font-medium">Certified Blood Donor</div>
                <div className="text-sm text-muted-foreground">
                  Donated on {date}
                </div>
              </div>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
};

function AwardIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m15.477 12.89 1.515 8.526a.5.5 0 0 1-.81.47l-3.58-2.687a1 1 0 0 0-1.197 0l-3.586 2.686a.5.5 0 0 1-.81-.469l1.514-8.526" />
      <circle cx="12" cy="8" r="6" />
    </svg>
  );
}

export default DonationCertificate;
