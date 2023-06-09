import React from 'react';
import useEscapeKey from '../../hooks/use-escape-key';

import Toast from '../Toast';
import { ToastContext } from '../ToastProvider';
import styles from './ToastShelf.module.css';

function ToastShelf() {
  const { toasts, dismissToast, dismissAll } = React.useContext(ToastContext);

  useEscapeKey(React.useCallback(() => {
    dismissAll();
  }, [dismissAll]))

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
    <ol className={styles.wrapper}
    role="region"
    aria-live='polite'
    aria-label='Notification'
    >
      {toasts.map((toast) => (
        <li key={toast.id} className={styles.toastWrapper}>
          <Toast variant={toast.variant} message={toast.message} dismissToast={() => dismissToast(toast.id)} />
        </li>
      ))}
    </ol>
  );
}

export default ToastShelf;
