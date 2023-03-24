import React from 'react';
import {
  AlertOctagon,
  AlertTriangle,
  CheckCircle,
  Info,
  X,
} from 'react-feather';

import VisuallyHidden from '../VisuallyHidden';

import styles from './Toast.module.css';

const ICONS_BY_VARIANT = {
  notice: Info,
  warning: AlertTriangle,
  success: CheckCircle,
  error: AlertOctagon,
};

export const VARIANT_OPTIONS = ['notice', 'warning', 'success', 'error'];

function Toast({ message, variant, dismissToast }) {
  if (!VARIANT_OPTIONS.includes(variant)) {
    throw Error(`Unrecognised variant: ${variant} Expected: ${VARIANT_OPTIONS}`);
  }

  const Icon = ICONS_BY_VARIANT[variant];

  return (
    <div className={`${styles.toast} ${styles[variant]}`}>
      <div className={styles.iconContainer}>
        <Icon size={24} />
      </div>
      <p className={styles.content}>
        <VisuallyHidden>{variant}</VisuallyHidden>
        {message}
      </p>
      <button aria-live="off" aria-label='Dismiss message' onClick={dismissToast} className={styles.closeButton}>
        <X size={24} />
      </button>
    </div>
  );
}

export default Toast;
