import { Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

const Loading = ({
  message = "Loading...",
  className,
}: {
  message?: string;
  className?: string;
}) => {
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center gap-3 py-16 text-muted-foreground",
        className
      )}
    >
      <div className="relative">
        <Loader2 className="h-8 w-8 animate-spin" />
        <div className="absolute inset-0 animate-ping rounded-full bg-muted opacity-30" />
      </div>
      <p className="text-sm animate-pulse">{message}</p>
    </div>
  );
};

export default Loading;
