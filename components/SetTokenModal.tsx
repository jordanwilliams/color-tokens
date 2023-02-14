import { useState, useId, ChangeEvent, FormEvent } from 'react';
import Portal from './Portal';
import Overlay from './Overlay';
import { Token } from './ColorToken';

import styles from './SetTokenModal.module.css';

type Props = {
  addToken: (token: Token) => void;
  closeAddTokenModal: () => void;
  className: string;
};

function SetTokenModal({ addToken, closeAddTokenModal, className }: Props) {
  const id = useId();

  const [formState, setFormState] = useState<Token>({
    id,
    name: '',
    color: '',
    darkModeColor: '',
    description: '',
  });

  const canSubmit: boolean =
    Boolean(formState.name) && Boolean(formState.color);

  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    setFormState({
      ...formState,
      [event.target.name]: event.target.value,
    });
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    console.log('JORDAN');
    event.preventDefault();

    if (!canSubmit) return;

    addToken(formState);

    closeAddTokenModal();
  }

  return (
    <Portal>
      <Overlay>
        <div className={`${styles.modal} ${className}`}>
          <h1 className={styles.heading}>Set token</h1>
          <form className={styles.form} onSubmit={handleSubmit}>
            <label className={styles.label}>
              Name
              <input
                name="name"
                type="text"
                value={formState.name}
                onChange={handleChange}
                autoFocus
                required
              />
            </label>
            <label className={styles.label}>
              Color
              <input
                name="color"
                type="text"
                value={formState.color}
                onChange={handleChange}
                required
              />
            </label>
            <label className={styles.label}>
              Dark mode color (optional)
              <input
                name="darkModeColor"
                type="text"
                value={formState.darkModeColor}
                onChange={handleChange}
              />
            </label>
            <label className={styles.label}>
              Description (optional)
              <input
                name="description"
                type="text"
                value={formState.description}
                onChange={handleChange}
              />
            </label>
            <div className={styles.controls}>
              <button
                type="button"
                className={styles.cancel}
                onClick={closeAddTokenModal}
              >
                Cancel
              </button>
              <input
                className={styles.submit}
                type="submit"
                value="Add token"
              />
            </div>
          </form>
        </div>
      </Overlay>
    </Portal>
  );
}

export default SetTokenModal;
