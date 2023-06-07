import styles from './modal.module.css';
import PropTypes from 'prop-types';
import React from 'react';
import ReactDOM from 'react-dom';
import ModalOverlay from '../modal-overlay/modal-overlay';
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { IModalProps } from './modal.types';

const Modal = ({ children, onClose }: IModalProps) => {
  React.useEffect(() => {
    document.addEventListener('keydown', keyEscHandler);
    return () => document.removeEventListener('keydown', keyEscHandler);
  }, []);

  const keyEscHandler = ({ key }: { key: string }) => {
    if (key === 'Escape') {
      onClose();
    }
  };

  return ReactDOM.createPortal(
    <div className={styles.modals}>
      <div
        className={`${styles.modal}`}
        onClick={(evt) => evt.stopPropagation()}>
        <button
          className={styles['close-button']}
          type="button"
          onClick={onClose}>
          <CloseIcon type="primary" />
        </button>
        {children}
      </div>
      <ModalOverlay onClose={onClose} />
    </div>,
    document.getElementById('modals-root') as HTMLElement
  );
};

export default Modal;
