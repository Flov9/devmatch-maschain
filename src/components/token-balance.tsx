import { format } from "date-fns";

import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import React, { FormEvent, useEffect, useState } from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "./ui/card";
import BodyCheckup from "./body-checkup";

const TokenBalance = () => {
  const walletAddress = sessionStorage.getItem("walletAddress");
  const [tokenBalance, setTokenBalance] = useState("");
  const [selectedHospital, setSelectedHospital] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const [showBodyCheckup, setShowBodyCheckup] = useState(false);
  const [date, setDate] = React.useState<Date>();

  const handleSelectChange = (
    value: React.SetStateAction<string>,
    type: string
  ) => {
    switch (type) {
      case "hospital":
        setSelectedHospital(value);
        break;
      case "date":
        setSelectedDate(value);
        break;
      case "time":
        setSelectedTime(value);
        break;
      default:
        break;
    }
  };

  useEffect(() => {
    const fetchTokenBalance = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/token/balance`,
          {
            method: "POST",
            headers: {
              client_id: String(process.env.NEXT_PUBLIC_CLIENT_ID),
              client_secret: String(process.env.NEXT_PUBLIC_CLIENT_SECRET),
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              wallet_address: walletAddress,
              contract_address: "0x21f7fb0AB36A3a3A4ddC77Ca3f3802Fa6007D1f5",
            }),
          }
        );

        const result = await response.json();

        console.log("token", result);

        if (response.ok) {
          console.log(result);
          setTokenBalance(result.result);
        }
      } catch (error) {
        if (error instanceof Error) console.log(error.message);
      }
    };

    fetchTokenBalance();
  }, [walletAddress]);

  return (
    <>
      {showBodyCheckup && (
        <BodyCheckup
          selectedHospital={selectedHospital}
          selectedDate={selectedDate}
          selectedTime={selectedTime}
        />
      )}
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>VTL Token Balance</CardTitle>
        </CardHeader>
        <CardContent className="flex items-center justify-center gap-4">
          <WalletIcon className="h-8 w-8 text-primary" />
          <div className="text-4xl font-bold">{tokenBalance}</div>
        </CardContent>
        <CardFooter>
          <Dialog>
            <DialogTrigger asChild>
              <Button className="w-full">Redeem Body Checkup</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[600px]">
              <DialogHeader>
                <DialogTitle>Redeem Body Checkup</DialogTitle>
                <DialogDescription>
                  Select a hospital and schedule your appointment.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-6">
                <div className="grid gap-2">
                  <Label htmlFor="hospital">Hospital</Label>
                  <Select
                    onValueChange={(value) =>
                      handleSelectChange(value, "hospital")
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select hospital" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="hospital1">
                        Hospital 1 - Downtown
                      </SelectItem>
                      <SelectItem value="hospital2">
                        Hospital 2 - Uptown
                      </SelectItem>
                      <SelectItem value="hospital3">
                        Hospital 3 - Midtown
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="date">Date</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button variant="outline" className="justify-start">
                        {date ? format(date, "PPP") : <span>Pick a date</span>}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="p-0">
                      <Calendar
                        mode="single"
                        selected={date}
                        onSelect={setDate}
                      />
                    </PopoverContent>
                  </Popover>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="time">Time</Label>
                  <Select
                    onValueChange={(value) =>
                      handleSelectChange(value, "hospital")
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select time" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="9am">9:00 AM</SelectItem>
                      <SelectItem value="10am">10:00 AM</SelectItem>
                      <SelectItem value="11am">11:00 AM</SelectItem>
                      <SelectItem value="12pm">12:00 PM</SelectItem>
                      <SelectItem value="1pm">1:00 PM</SelectItem>
                      <SelectItem value="2pm">2:00 PM</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <DialogFooter>
                <div>
                  <Button variant="ghost">Cancel</Button>
                </div>
                <DialogClose>
                  <Button
                    type="submit"
                    onClick={() => {
                      handleSelectChange(selectedHospital, "hospital");
                      handleSelectChange(selectedDate, "date");
                      handleSelectChange(selectedTime, "time");
                      setShowBodyCheckup(true);
                    }}
                  >
                    Redeem
                  </Button>
                </DialogClose>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </CardFooter>
      </Card>
    </>
  );
};

function WalletIcon(props: React.SVGProps<SVGSVGElement>) {
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
      <path d="M19 7V4a1 1 0 0 0-1-1H5a2 2 0 0 0 0 4h15a1 1 0 0 1 1 1v4h-3a2 2 0 0 0 0 4h3a1 1 0 0 0 1-1v-2a1 1 0 0 0-1-1" />
      <path d="M3 5v14a2 2 0 0 0 2 2h15a1 1 0 0 0 1-1v-4" />
    </svg>
  );
}

export default TokenBalance;
