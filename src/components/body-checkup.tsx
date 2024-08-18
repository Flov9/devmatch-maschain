import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { CalendarIcon } from "lucide-react";

interface BodyCheckupProps {
  selectedHospital: string;
  selectedDate: string;
  selectedTime: string;
}

const BodyCheckup: React.FC<BodyCheckupProps> = ({
  selectedHospital,
  selectedDate,
  selectedTime,
}) => {
  return (
    <Card className="w-full max-w-md bg-primary text-primary-foreground">
      <CardContent className="flex items-center gap-4 my-2">
        <CalendarIcon className="h-8 w-8" />
        <div>
          <div className="text-lg font-medium">
            You have a scheduled body checkup on {selectedTime} on
            {selectedDate}
          </div>
          <div className="text-sm">at {selectedHospital}.</div>
        </div>
      </CardContent>
    </Card>
  );
};

export default BodyCheckup;
