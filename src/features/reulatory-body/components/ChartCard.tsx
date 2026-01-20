import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import type { ReactNode } from "react";

interface ChartCardProps {
  title: string;
  children: ReactNode;
  filters?: {
    label?: string; // e.g. "Blood type"
    options: string[];
    value?: string;
    onChange?: (value: string) => void;
  }[];
  action?: {
    label: string;
    onClick: () => void;
  };
  className?: string; // Allow custom classes
}

export default function ChartCard({
  title,
  children,
  filters,
  action,
  className,
}: ChartCardProps) {
  return (
    <Card className={`w-full shadow-sm border border-gray-100 ${className}`}>
      <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
        <CardTitle className="text-sm font-semibold uppercase text-gray-500 tracking-wider">
          {title}
        </CardTitle>
        <div className="flex items-center gap-2">
          {filters?.map((filter, idx) => (
            <Select
              key={idx}
              defaultValue={filter.value}
              onValueChange={filter.onChange}
            >
              <SelectTrigger className="h-8 text-xs bg-blue-50/50 border-0 focus:ring-0 min-w-[100px]">
                <SelectValue placeholder={filter.label} />
              </SelectTrigger>
              <SelectContent>
                {filter.options.map((opt) => (
                  <SelectItem key={opt} value={opt} className="text-xs">
                    {opt}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          ))}
          {action && (
            <Button
              variant="outline"
              size="sm"
              onClick={action.onClick}
              className="h-8 text-xs"
            >
              {action.label}
            </Button>
          )}
        </div>
      </CardHeader>
      <CardContent>{children}</CardContent>
    </Card>
  );
}
