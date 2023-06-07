import { useEffect, useState, ChangeEvent, FormEvent } from 'react';

import {
  PasswordInput,
  Button,
  Input,
} from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './reset-password.module.css';
import {
  PATH_FORGOT_PASSWORD_PAGE,
  PATH_LOGIN_PAGE,
} from '../../constants/constants';

import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { resetPasswordRequest } from '../../services/actions/reset-password';
import { useSelector } from '../../types/hooks';
import { ThunkDispatch } from 'redux-thunk';
import { AnyAction } from 'redux';
import { RootState } from '../../types';

const ResetPassword = () => {
  const { forgotPasswordSuccess, resetPasswordSuccess } = useSelector(
    (store) => store.resetPassword
  );
  const [passwordValue, setPasswordValue] = useState('');
  const [codeValue, setCodeValue] = useState('');

  const navigate = useNavigate();
  const location = useLocation();
  const dispatch: ThunkDispatch<RootState, any, AnyAction> = useDispatch();

  const onPasswordChange = (evt: ChangeEvent<HTMLInputElement>) => {
    setPasswordValue(evt.target.value);
  };

  const onCodeChange = (evt: ChangeEvent<HTMLInputElement>) => {
    setCodeValue(evt.target.value);
  };

  useEffect(() => {
    if (!forgotPasswordSuccess || location.state === '/forgot-password') {
      navigate(PATH_FORGOT_PASSWORD_PAGE);
    }
  }, []);

  const submitHandler = async (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();

    dispatch(resetPasswordRequest(passwordValue, codeValue));

    if (resetPasswordSuccess) {
      navigate(PATH_LOGIN_PAGE);
    }
  };

  return (
    <div className={styles.wrapper}>
      <h2 className={`text text_type_main-medium mb-6 ${styles.title}`}>
        Восстановление пароля
      </h2>
      <form className={`${styles.form} mb-20`} onSubmit={submitHandler}>
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
          type="primary">
          Сохранить
        </Button>
      </form>
      <span className="text text_type_main-default text_color_inactive mb-4">
        Вспомнили пароль?{'\u00A0'}
        <Link className={styles.link} to={PATH_LOGIN_PAGE}>
          Войти
        </Link>
      </span>
    </div>
  );
};

export default ResetPassword;
