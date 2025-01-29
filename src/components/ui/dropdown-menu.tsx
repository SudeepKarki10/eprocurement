import * as React from "react";
import { createContext, useContext, useEffect, useRef } from "react";

interface DropdownMenuContextType {
  open: boolean;
  setOpen: (open: boolean) => void;
}

const DropdownMenuContext = createContext<DropdownMenuContextType | undefined>(
  undefined
);

export function DropdownMenu({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = React.useState(false);
  return (
    <DropdownMenuContext.Provider value={{ open, setOpen }}>
      {children}
    </DropdownMenuContext.Provider>
  );
}

export function DropdownMenuTrigger({
  children,
}: {
  children: React.ReactNode;
}) {
  const context = useContext(DropdownMenuContext);
  if (!context)
    throw new Error("DropdownMenuTrigger must be used within DropdownMenu");

  return (
    <button onClick={() => context.setOpen(!context.open)}>{children}</button>
  );
}

export function DropdownMenuContent({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const context = useContext(DropdownMenuContext);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        context?.setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [context]);

  if (!context?.open) return null;

  return (
    <div
      ref={ref}
      className={`
        absolute right-0 mt-2 w-56 rounded-md shadow-lg
        bg-white ring-1 ring-black ring-opacity-5
        ${className}
      `}
    >
      {children}
    </div>
  );
}

export function DropdownMenuItem({
  children,
  onClick,
  className = "",
}: {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
}) {
  return (
    <button
      onClick={onClick}
      className={`
        w-full text-left px-4 py-2 text-sm
        hover:bg-gray-100 focus:bg-gray-100
        focus:outline-none
        ${className}
      `}
    >
      {children}
    </button>
  );
}

export function DropdownMenuLabel({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={`px-4 py-2 text-sm font-semibold ${className}`}>
      {children}
    </div>
  );
}

export function DropdownMenuSeparator({
  className = "",
}: {
  className?: string;
}) {
  return <div className={`h-px bg-gray-200 my-1 ${className}`} />;
}
