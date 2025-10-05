import * as React from "react";
import { cn } from "@/lib/utils";

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "secondary" | "outline";
}

export function Badge({ className, variant = "default", ...props }: BadgeProps) {
  return (
    <div
      className={cn(
        "inline-flex items-center rounded-full px-3 py-1 text-sm font-medium transition-colors",
        variant === "default" &&
          "bg-blue-600 text-white hover:bg-blue-700",
        variant === "secondary" &&
          "bg-gray-700 text-gray-100 hover:bg-gray-600",
        variant === "outline" &&
          "border border-gray-400 text-gray-200 hover:bg-gray-800",
        className
      )}
      {...props}
    />
  );
}
