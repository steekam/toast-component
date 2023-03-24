import React from "react";

export const ToastContext = React.createContext()

function ToastProvider({ children }) {
  const [toasts, setToasts] = React.useState([]);

  function popToast(message, variant) {
    setToasts([
      ...toasts,
      {
        id: crypto.randomUUID(),
        message,
        variant
      }
    ]);
  }

  function dismissToast(id) {
    setToasts(
      toasts.filter(item => item.id !== id)
    );
  }

  return <ToastContext.Provider value={{toasts, popToast, dismissToast}}>
    {children}
  </ToastContext.Provider>;
}

export default ToastProvider;
