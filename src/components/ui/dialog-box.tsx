import useScrollControl from "@/hooks/use-scroll-control";
import { cn } from "@/utils/cn";
import React, { createContext, useContext, useState, ReactNode, useEffect } from "react";

// Define the context type
interface DialogBoxContextType {
  isOpen: boolean;
  toggleDialogBox: () => void;
  closeDialogBox: () => void; // New function for closing the dialog
}

interface BodyProps {
  children: ReactNode;
  className?: string; // Optional custom className prop
}

// Create the context with a default value
const DialogBoxContext = createContext<DialogBoxContextType | undefined>(
  undefined
);

// Define props for the DialogBox component
interface DialogBoxProps {
  children: ReactNode; // ReactNode allows any valid React children
}

// References for controlled toggling
let externalToggleDialogBox: (() => void) | null = null;
let externalCloseDialogBox: (() => void) | null = null;

// Exported functions for external control
export const useToggleDialogBox = () => {
  if (!externalToggleDialogBox) {
    throw new Error(
      "toggleDialogBox can only be used after the DialogBox has been mounted."
    );
  }
  return externalToggleDialogBox;
};

export const useCloseDialogBox = () => {
  if (!externalCloseDialogBox) {
    throw new Error(
      "closeDialogBox can only be used after the DialogBox has been mounted."
    );
  }
  return externalCloseDialogBox;
};

export const DialogBox: React.FC<DialogBoxProps> = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const { startScroll, stopScroll } = useScrollControl();

  const toggleDialogBox = () => {
    isOpen ? startScroll() : stopScroll();
    setIsOpen((prev) => !prev);
  };

  const closeDialogBox = () => {
    if (isOpen) {
      startScroll();
      setIsOpen(false);
    }
  };

  useEffect(() => {
    if (isOpen) {
      stopScroll();
    } else {
      startScroll();
    }
  
    return () => {
      startScroll();
    };
  }, [isOpen]);
  

  // Assign functions to external references
  externalToggleDialogBox = toggleDialogBox;
  externalCloseDialogBox = closeDialogBox;

  return (
    <DialogBoxContext.Provider value={{ isOpen, toggleDialogBox, closeDialogBox }}>
      <div className="relative">{children}</div>
      {isOpen && (
        <div
          className="fixed inset-0 -top-2 h-[110vh] w-full bg-black opacity-25 z-20"
          onClick={closeDialogBox} // Close the dialog on backdrop click
        ></div>
      )}
    </DialogBoxContext.Provider>
  );
};

// Hook to use DialogBox context
export const useDialogBox = (): DialogBoxContextType => {
  const context = useContext(DialogBoxContext);
  if (!context) {
    throw new Error("useDialogBox must be used within an DialogBox");
  }
  return context;
};

// Trigger component
export const Trigger: React.FC<{ children: ReactNode; disabled?: boolean }> = ({
  children,
  disabled = false,
}) => {
  const { toggleDialogBox } = useDialogBox();

  return (
    <div
      onClick={disabled ? undefined : toggleDialogBox}
      className="cursor-pointer"
    >
      {children}
    </div>
  );
};

// Body component
export const Body: React.FC<BodyProps> = ({ children, className = "" }) => {
  const { isOpen } = useDialogBox();

  if (!isOpen) return null;

  return (
    <div
      className={cn(
        className,
        "fixed inset-0 top-1/2 translate-y-[-50%] left-1/2 translate-x-[-50%] bg-white rounded-xl max-w-full w-[95%] xs:max-w-[28rem] xl:max-w-[30rem] h-fit max-h-[95vh] hide-scroll z-30"
      )}
    >
      <div className="p-5 xl:p-6">{children}</div>
    </div>
  );
};
