import React, { createContext, useState, useContext } from "react";

// Create ToastContext
const ToastContext = createContext({});

// ToastProvider component to provide context to its children
export const ToastProvider = ({ children }:any) => {
  const [toast, setToast] = useState({ message: "", visible: false });

  const showToast = (message:any) => {
    setToast({ message, visible: true });
    setTimeout(() => setToast({ ...toast, visible: false }), 3000); // Hide toast after 3 seconds
  };

  return (
    <ToastContext.Provider value={{ toast, showToast }}>
      {children}
      {toast.visible && <div className="toast">{toast.message}</div>}
    </ToastContext.Provider>
  );
};

// Custom hook to use ToastContext
export const useToast = () => useContext(ToastContext);
