import styles from './modal-overlay.module.css';
import PropTypes from 'prop-types';

const ModalOverlay = ({ setModalActive }) => {
  return <div className={styles.overlay} onClick={() => setModalActive(false)}></div>;
};

ModalOverlay.propTypes = {
  setModalActive: PropTypes.func.isRequired,
};

export default ModalOverlay;
