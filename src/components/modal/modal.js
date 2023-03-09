import styles from './modal.module.css';
import PropTypes from 'prop-types';

const Modal = ({ modalActive, children }) => {
  return (
    <div className={`${modalActive ? `${styles.modal} ${styles.modal_active} ` : `${styles.modal}`}`} onClick={evt => evt.stopPropagation()}>
      {children}
    </div>
  );
}

Modal.propTypes = {
  modalActive: PropTypes.bool,
  children: PropTypes.element
}

export default Modal;