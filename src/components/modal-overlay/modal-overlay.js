import styles from './modal-overlay.module.css';
import ReactDOM from 'react-dom';
import React from 'react';
import PropTypes from 'prop-types';

const ModalOverlay = ({ modalActive, setModalActive, children }) => {
  React.useEffect(() => {
    const closeModal = (evt) => {
      if (evt.keyCode === 27) {
        setModalActive(false);
      }
    }

    window.addEventListener('keydown', closeModal);

    return () => window.removeEventListener('keydown', closeModal);
  }, [])

  return modalActive && ReactDOM.createPortal((
    <div className={`${modalActive ? `${styles.overlay} ${styles.overlay_show}` : `${styles.overlay}`}`} onClick={() => setModalActive(false)}>{children}</div>
  ), document.getElementById('modals'));
}

ModalOverlay.propTypes = {
  modalActive: PropTypes.bool,
  setModalActive: PropTypes.func,
  children: PropTypes.element,
}

export default ModalOverlay;