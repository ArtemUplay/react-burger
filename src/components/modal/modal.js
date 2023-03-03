import styles from './modal.module.css';
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';

const Modal = (props) => {
  return (
    <div className={styles.modal}>
      {props.children}
    </div>
  );
}

export default Modal;