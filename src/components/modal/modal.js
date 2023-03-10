import styles from './modal.module.css';
import PropTypes from 'prop-types';
import React from 'react';
import ReactDOM from 'react-dom';
import ModalOverlay from '../modal-overlay/modal-overlay';

const Modal = ({ modalActive, setModalActive, onClose, children }) => {
  React.useEffect(() => {
    document.addEventListener('keydown', keyEscHandler);
    return () => document.removeEventListener('keydown', keyEscHandler);
  })

  const keyEscHandler = ({ key }) => {
    if (key === 'Escape') {
      onClose();
    }
  }

  return modalActive && ReactDOM.createPortal((
    <div className={styles.modals}>
      <div className={`${styles.modal}`} onClick={evt => evt.stopPropagation()}>{children}
      </div>
      <ModalOverlay setModalActive={setModalActive} />
    </div>
  ), document.getElementById('modals-root'));
}

Modal.propTypes = {
  modalActive: PropTypes.bool.isRequired,
  children: PropTypes.element
}

export default Modal;