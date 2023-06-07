import styles from './modal-overlay.module.css';
import { IModalOverlayProps } from './modal-overlay.types';

const ModalOverlay = ({ onClose }: IModalOverlayProps) => {
  return <div className={styles.overlay} onClick={() => onClose()}></div>;
};

export default ModalOverlay;
