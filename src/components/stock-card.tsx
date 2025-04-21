import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Card, CardHeader, CardTitle, CardDescription } from "./ui/card";
import { cn } from "@/lib/utils";

interface Iprops {
  ticker: string;
  name: string;
  width?: string;
  onClick: (ticker: string) => void;
}

const StockCard = ({ ticker, name, width, onClick }: Iprops) => {
  const shortName =
    name.split(" ").length > 4
      ? name.split(" ").slice(0, 4).join(" ") + "..."
      : name;

  const classes = cn(
    width,
    "hover:shadow-lg transition-shadow border-gray-200",
    "cursor-pointer"
  );

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Card
            className={classes}
            onClick={() => {
              onClick(ticker);
            }}
          >
            <CardHeader>
              <CardTitle className="text-lg font-semibold text-gray-900">
                {ticker}
              </CardTitle>
              <CardDescription className="text-gray-600 truncate">
                {shortName}
              </CardDescription>
            </CardHeader>
          </Card>
        </TooltipTrigger>
        <TooltipContent>
          <p>{name}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default StockCard;
