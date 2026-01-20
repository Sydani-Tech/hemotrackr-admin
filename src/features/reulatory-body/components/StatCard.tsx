
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface StatCardProps {
  label: string;
  value: string | number;
  action?: {
    label: string;
    onClick: () => void;
  };
}

export default function StatCard({ label, value, action }: StatCardProps) {
  return (
    <Card className="w-full shadow-sm border border-gray-100 rounded-md">
      <CardContent className="flex flex-col justify-between h-full">
        <div className="text-sm text-gray-500 mb-1 leading-snug">{label}</div>
        <div className="flex items-center justify-between mt-2">
          <span className="text-2xl font-bold text-gray-800">{value}</span>
          {action && (
            <Button
              variant="secondary"
              size="sm"
              onClick={action.onClick}
              className="h-7 text-xs bg-gray-100 hover:bg-gray-200 text-gray-600 px-3"
            >
              {action.label}
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
