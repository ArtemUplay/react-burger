import { useEffect, useState } from 'react';

import {
  PasswordInput,
  Button,
  Input,
} from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './reset-password.module.css';
import {
  pathForgotPasswordPage,
  pathLoginPage,
} from '../../constants/constants';

import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { resetPasswordRequest } from '../../services/actions/reset-password';

const ResetPassword = () => {
  const { forgotPasswordSuccess, resetPasswordSuccess } = useSelector(
    (store) => store.resetPassword
  );
  const [passwordValue, setPasswordValue] = useState('');
  const [codeValue, setCodeValue] = useState('');

  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();

  const onPasswordChange = (evt) => {
    setPasswordValue(evt.target.value);
  };

  const onCodeChange = (evt) => {
    setCodeValue(evt.target.value);
  };

  useEffect(() => {
    if (!forgotPasswordSuccess || location.state === '/forgot-password') {
      navigate(pathForgotPasswordPage);
    }
  }, []);

  const submitHandler = async (evt) => {
    evt.preventDefault();

    dispatch(resetPasswordRequest(passwordValue, codeValue));

    if (resetPasswordSuccess) {
      navigate(pathLoginPage);
    }
  };

  return (
    <div className={styles.wrapper}>
      <h2 className={`text text_type_main-medium mb-6 ${styles.title}`}>
        Восстановление пароля
      </h2>
      <form className={`${styles.form} mb-20`}>
        <PasswordInput
          extraClass="mb-6"
          name={'password'}
          value={passwordValue}
          placeholder="Введите новый пароль"
          icon="ShowIcon"
          onChange={onPasswordChange}
        />
        <Input
          extraClass="mb-6"
          type="text"
          value={codeValue}
          placeholder="Введите код из письма"
          onChange={onCodeChange}
        />
        <Button
          extraClass={`${styles.button}`}
          htmlType="submit"
          type="primary"
          onClick={submitHandler}>
          Сохранить
        </Button>
      </form>
      <span className="text text_type_main-default text_color_inactive mb-4">
        Вспомнили пароль?{'\u00A0'}
        <Link className={styles.link} to={pathLoginPage}>
          Войти
        </Link>
      </span>
    </div>
  );
};

export default ResetPassword;
