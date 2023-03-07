import styles from './modal.module.css';
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';

const Modal = ({ modalActive, children }) => {
  return (
    <div className={`${modalActive ? `${styles.modal} ${styles.modal_active} ` : `${styles.modal}`}`} onClick={evt => evt.stopPropagation()}>
      {children}
    </div>
  );
}

export default Modal;