import React from 'react';

import Toast from '../Toast';
import { ToastContext } from '../ToastProvider';
import styles from './ToastShelf.module.css';

function ToastShelf() {
  const { toasts, dismissToast, dismissAll } = React.useContext(ToastContext);

  React.useEffect(() => {
    function dismissToatsOnEscape(event) {
      if (event.code === "Escape") {
        dismissAll();
      }
    }

    window.addEventListener('keydown', dismissToatsOnEscape);

    return () => {
      window.removeEventListener('keydown', dismissToatsOnEscape);
    }
  }, [dismissAll]);

  return (
    <ol className={styles.wrapper}>
      {toasts.map((toast) => (
        <li key={toast.id} className={styles.toastWrapper}>
          <Toast variant={toast.variant} message={toast.message} dismissToast={() => dismissToast(toast.id)} />
        </li>
      ))}
    </ol>
  );
}

export default ToastShelf;
