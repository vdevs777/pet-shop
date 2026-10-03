import { ReactNode } from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";
import { Button } from "../ui/button";

interface NavigationButtonProps {
  tooltipText: string;
  children: ReactNode;

  onClick: () => void;
}

export function NavigationButton({
  tooltipText,
  children,
  onClick,
}: NavigationButtonProps) {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            variant="outline"
            size="icon"
            onClick={onClick}
            className="size-10 bg-transparent border-border-primary text-content-primary 
            hover:bg-background-tertiary hover:border-border-secondary hover:text-content-primary 
            focus-visible:ring-offset-0 focus-visible:ring-1 focus-visible:ring-border-brand
            focus:border-brand focus-visible:border-brand"
          >
            {children}
          </Button>
        </TooltipTrigger>
        <TooltipContent className="bg-background-tertiary">
          <p>{tooltipText}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
