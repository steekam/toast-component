import React from 'react';

import Button from '../Button';
import { VARIANT_OPTIONS } from '../Toast';
import ToastShelf from '../ToastShelf/ToastShelf';

import styles from './ToastPlayground.module.css';

function ToastPlayground() {
  const [message, setMessage] = React.useState("");
  const [variant, setVariant] = React.useState("notice");

  const [toasts, setToasts] = React.useState([]);

  function createToast(event) {
    event.preventDefault();

    setToasts([
      ...toasts,
      {
        id: crypto.randomUUID(),
        message,
        variant
      }
    ]);

    setMessage("");
    setVariant("notice");
  }

  function dismissToast(id) {
    setToasts(
      toasts.filter(item => item.id !== id)
    );
  }

  return (
    <div className={styles.wrapper}>
      <header>
        <img alt="Cute toast mascot" src="/toast.png" />
        <h1>Toast Playground</h1>
      </header>

      {toasts.length > 0 && <ToastShelf toasts={toasts} dismissToast={dismissToast} />}

      <form onSubmit={createToast} className={styles.controlsWrapper}>
        <div className={styles.row}>
          <label
            htmlFor="message"
            className={styles.label}
            style={{ alignSelf: 'baseline' }}
          >
            Message
          </label>
          <div className={styles.inputWrapper}>
            <textarea id="message" className={styles.messageInput} value={message} onChange={(e) => setMessage(e.target.value)} required />
          </div>
        </div>

        <div className={styles.row}>
          <div className={styles.label}>Variant</div>
          <div
            className={`${styles.inputWrapper} ${styles.radioWrapper}`}
          >
            {VARIANT_OPTIONS.map(option => (
              <label key={option}>
                <input
                  type="radio"
                  name="variant"
                  value={option}
                  checked={variant === option}
                  onChange={(e) => setVariant(option)}
                  required
                />
                {option}
              </label>
            ))}
          </div>
        </div>

        <div className={styles.row}>
          <div
            className={`${styles.inputWrapper} ${styles.radioWrapper}`}
          >
            <Button type="submit">Pop Toast!</Button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default ToastPlayground;
