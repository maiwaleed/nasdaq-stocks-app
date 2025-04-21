import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertTriangle } from "lucide-react";
import { cn } from "@/lib/utils";

const Error = ({
  message = "Something went wrong!",
  className,
}: {
  message?: string;
  className?: string;
}) => {
  return (
    <Alert
      variant="destructive"
      className={cn(
        "my-6 max-w-lg mx-auto flex flex-col items-center text-center gap-4 p-6",
        className
      )}
    >
      <AlertTriangle className="!w-16 !h-16 text-red-600" />
      <div>
        <AlertTitle className="text-2xl font-semibold">Error</AlertTitle>
        <AlertDescription className="text-md text-gray-800 mt-2">
          {message}
        </AlertDescription>
      </div>
    </Alert>
  );
};

export default Error;
