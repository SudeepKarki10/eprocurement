import * as React from "react";

interface ScrollAreaProps {
  children: React.ReactNode;
  className?: string;
  orientation?: "vertical" | "horizontal" | "both";
  style?: React.CSSProperties;
}

export function ScrollArea({
  children,
  className = "",
  orientation = "vertical",
}: ScrollAreaProps) {
  return (
    <div className={`relative overflow-hidden ${className}`}>
      <div
        className={`
          h-full w-full overflow-auto
          scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent
          ${orientation === "vertical" ? "overflow-x-hidden" : ""}
          ${orientation === "horizontal" ? "overflow-y-hidden" : ""}
        `}
      >
        {children}
      </div>
    </div>
  );
}

export function ScrollBar() {
  return (
    <div className="absolute right-0 top-0 h-full w-2 hover:w-3 transition-all">
      <div className="rounded-full bg-gray-300 w-full h-full" />
    </div>
  );
}

export function Viewport({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return <div className={`h-full w-full ${className}`}>{children}</div>;
}
