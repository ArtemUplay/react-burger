import styles from './modal.module.css';
import PropTypes from 'prop-types';
import React from 'react';
import ReactDOM from 'react-dom';
import ModalOverlay from '../modal-overlay/modal-overlay';
import { useNavigate } from 'react-router-dom';
import { PATH_CONSTRUCTOR_PAGE } from '../../constants/constants';
import { useDispatch } from 'react-redux';
import { DELETE_CURRENT_INGREDIENT } from '../../services/actions/ingredient-details';
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';

const Modal = ({ children }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onClose = () => {
    navigate(PATH_CONSTRUCTOR_PAGE);
    dispatch({ type: DELETE_CURRENT_INGREDIENT });
  };

  React.useEffect(() => {
    document.addEventListener('keydown', keyEscHandler);
    return () => document.removeEventListener('keydown', keyEscHandler);
  }, []);

  const keyEscHandler = ({ key }) => {
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
    document.getElementById('modals-root')
  );
};

Modal.propTypes = {
  children: PropTypes.element,
};

export default Modal;
