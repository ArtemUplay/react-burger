import styles from './modal-overlay.module.css';
import ReactDOM from 'react-dom';

const ModalOverlay = ({ isOpenModal, children }) => {
  return isOpenModal && ReactDOM.createPortal((
    <div className={`${styles.overlay} ${isOpenModal ? `${styles.overlay_show}` : ''}`}>{children}</div>
  ), document.getElementById('modals'));
}

export default ModalOverlay;