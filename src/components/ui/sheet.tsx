import * as React from "react";
import { createContext, useContext } from "react";

interface SheetContextType {
  open: boolean;
  setOpen: (open: boolean) => void;
  side: "left" | "right" | "top" | "bottom";
}

const SheetContext = createContext<SheetContextType | undefined>(undefined);

interface SheetProps {
  children: React.ReactNode;
  side?: "left" | "right" | "top" | "bottom";
  defaultOpen?: boolean;
}

export function Sheet({
  children,
  side = "right",
  defaultOpen = false,
}: SheetProps) {
  const [open, setOpen] = React.useState(defaultOpen);

  return (
    <SheetContext.Provider value={{ open, setOpen, side }}>
      {children}
    </SheetContext.Provider>
  );
}

// Add after existing interfaces
export interface SheetTriggerProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  className?: string;
}

export function SheetTrigger({ children }: { children: React.ReactNode }) {
  const context = useContext(SheetContext);
  if (!context) throw new Error("SheetTrigger must be used within Sheet");

  return (
    <button onClick={() => context.setOpen(!context.open)}>{children}</button>
  );
}

export function SheetContent({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const context = useContext(SheetContext);
  if (!context) throw new Error("SheetContent must be used within Sheet");
  if (!context.open) return null;

  const sideStyles = {
    left: "left-0 h-full",
    right: "right-0 h-full",
    top: "top-0 w-full",
    bottom: "bottom-0 w-full",
  };

  return (
    <>
      <div
        className="fixed inset-0 bg-black/50 z-50"
        onClick={() => context.setOpen(false)}
      />
      <div
        className={`
          fixed ${sideStyles[context.side]} z-50
          w-full max-w-md p-6 bg-white shadow-lg
          transform transition-transform duration-300
          ${
            context.open
              ? "translate-x-0"
              : context.side === "right"
              ? "translate-x-full"
              : context.side === "left"
              ? "-translate-x-full"
              : ""
          }
          ${className}
        `}
      >
        {children}
      </div>
    </>
  );
}

export function SheetHeader({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={`space-y-2 text-center sm:text-left ${className}`}>
      {children}
    </div>
  );
}

export function SheetTitle({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return <h3 className={`text-lg font-semibold ${className}`}>{children}</h3>;
}

export function SheetDescription({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return <p className={`text-sm text-gray-500 ${className}`}>{children}</p>;
}

export function SheetFooter({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`
      flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2
      ${className}
    `}
    >
      {children}
    </div>
  );
}
