import React, { createContext, useState, useContext, useMemo } from "react";

interface ToastOptions {
  message: string;
  position?: "top" | "bottom" | "left" | "right";
  color?: string;
}

interface ToastContextType {
  toast: {
    message: string;
    visible: boolean;
    position: ToastOptions["position"];
    color: string;
  };
  showToast: (options: ToastOptions) => void;
}

const ToastContext = createContext<ToastContextType>({} as ToastContextType);

export const ToastProvider = ({ children }: { children: React.ReactNode }) => {
  const [toast, setToast] = useState({
    message: "",
    visible: false,
    position: "bottom" as ToastOptions["position"],
    color: "#275338",
  });

  const showToast = ({
    message,
    position = "bottom",
    color = "#275338",
  }: ToastOptions) => {
    setToast({ message, visible: true, position, color });
    setTimeout(() => setToast((prev) => ({ ...prev, visible: false })), 3000);
  };

  const getToastStyle = () => {
    const baseStyle = {
      position: "fixed" as const,
      backgroundColor: toast.color ?? "#275338",
      color: "#fff",
      padding: "10px 20px",
      borderRadius: "5px",
      zIndex: 1000,
    };

    switch (toast.position) {
      case "top":
        return {
          ...baseStyle,
          top: "20px",
          left: "50%",
          transform: "translateX(-50%)",
        };
      case "bottom":
        return {
          ...baseStyle,
          bottom: "20px",
          left: "50%",
          transform: "translateX(-50%)",
        };
      case "left":
        return {
          ...baseStyle,
          left: "20px",
          top: "50%",
          transform: "translateY(-50%)",
        };
      case "right":
        return {
          ...baseStyle,
          right: "20px",
          top: "50%",
          transform: "translateY(-50%)",
        };
      default:
        return baseStyle;
    }
  };

  const values = useMemo(() => ({ toast, showToast }), [toast]);

  return (
    <ToastContext.Provider value={values}>
      {children}
      {toast.visible && (
        <div style={getToastStyle()} className="toast">
          {toast.message}
        </div>
      )}
    </ToastContext.Provider>
  );
};

export const useToast = () => useContext(ToastContext);
