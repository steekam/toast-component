import React from "react";

export const ToastContext = React.createContext()

function ToastProvider({ children }) {
  const [toasts, setToasts] = React.useState([]);

  const popToast = React.useCallback((message, variant) => {
    setToasts((currentValue) => ([
      ...currentValue,
      {
        id: crypto.randomUUID(),
        message,
        variant
      }
    ]));
  }, []);

  const dismissToast = React.useCallback((id) => {
    setToasts((currentValue) => currentValue.filter(item => item.id !== id));
  }, [])

  function dismissAll() {
    setToasts([]);
  }

  const value = React.useMemo(() => ({
    toasts,
    popToast,
    dismissToast,
    dismissAll
  }), [dismissToast, popToast, toasts]);

  return <ToastContext.Provider value={value}>
    {children}
  </ToastContext.Provider>;
}

export default ToastProvider;
