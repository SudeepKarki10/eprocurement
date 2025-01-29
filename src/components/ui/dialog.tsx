import * as React from "react";
import { createContext, useContext } from "react";

interface DialogContextType {
  open: boolean;
  setOpen: (open: boolean) => void;
}

const DialogContext = createContext<DialogContextType | undefined>(undefined);

interface DialogProps {
  children: React.ReactNode;
  defaultOpen?: boolean;
}

const Dialog = ({ children, defaultOpen = false }: DialogProps) => {
  const [open, setOpen] = React.useState(defaultOpen);

  return (
    <DialogContext.Provider value={{ open, setOpen }}>
      {children}
    </DialogContext.Provider>
  );
};

interface DialogTriggerProps {
  children: React.ReactNode;
  asChild?: boolean;
}

const DialogTrigger = ({ children, asChild }: DialogTriggerProps) => {
  const context = useContext(DialogContext);
  if (!context) throw new Error("DialogTrigger must be used within Dialog");

  const Comp = asChild ? "span" : "button";

  return <Comp onClick={() => context.setOpen(true)}>{children}</Comp>;
};

interface DialogContentProps {
  children: React.ReactNode;
  className?: string;
}

const DialogContent = ({ children, className = "" }: DialogContentProps) => {
  const context = useContext(DialogContext);
  if (!context) throw new Error("DialogContent must be used within Dialog");

  if (!context.open) return null;

  return (
    <>
      <div
        className="fixed inset-0 bg-black/50 z-50 transition-opacity"
        onClick={() => context.setOpen(false)}
      />
      <div className="fixed left-[50%] top-[50%] z-50 translate-x-[-50%] translate-y-[-50%]">
        <div
          className={`
          bg-white rounded-lg shadow-lg
          max-h-[85vh] w-[90vw] max-w-[500px]
          p-6 relative
          ${className}
        `}
        >
          {children}
        </div>
      </div>
    </>
  );
};

const DialogHeader = ({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) => (
  <div className={`space-y-1.5 text-center sm:text-left ${className}`}>
    {children}
  </div>
);

const DialogTitle = ({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) => <h3 className={`font-semibold text-lg ${className}`}>{children}</h3>;

const DialogDescription = ({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) => <p className={`text-sm text-gray-500 ${className}`}>{children}</p>;

const DialogFooter = ({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) => (
  <div
    className={`
    flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2
    ${className}
  `}
  >
    {children}
  </div>
);

export {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
};
