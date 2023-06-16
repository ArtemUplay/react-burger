import { useEffect, useState, ChangeEvent, FormEvent } from 'react';

import {
  EmailInput,
  Button,
} from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './forgot-password.module.css';
import { useNavigate, Link } from 'react-router-dom';
import {
  PATH_LOGIN_PAGE,
  PATH_RESET_PASSWORD_PAGE,
} from '../../constants/constants';
import { useDispatch } from 'react-redux';
import { forgotPasswordRequest } from '../../services/actions/reset-password';
import { useSelector } from '../../types/hooks';
import { ThunkDispatch } from 'redux-thunk';
import { AnyAction } from 'redux';
import { AppDispatch, RootState } from '../../types';

const ForgotPassword = () => {
  const { forgotPasswordSuccess } = useSelector((store) => store.resetPassword);
  const [emailValue, setEmailValue] = useState('');
  const navigate = useNavigate();
  const dispatch: AppDispatch = useDispatch();

  const onEmailChange = (evt: ChangeEvent<HTMLInputElement>) => {
    setEmailValue(evt.target.value);
  };

  const submitHandler = async (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();

    dispatch(forgotPasswordRequest(emailValue));
  };

  useEffect(() => {
    if (forgotPasswordSuccess) {
      navigate(PATH_RESET_PASSWORD_PAGE, {
        state: { url: '/forgot-password' },
      });
    }
  }, [navigate, forgotPasswordSuccess]);

  return (
    <div className={styles.wrapper}>
      <h2 className={`text text_type_main-medium mb-6 ${styles.title}`}>
        Восстановление пароля
      </h2>
      <form className={`${styles.form} mb-20`} onSubmit={submitHandler}>
        <EmailInput
          extraClass="mb-6"
          value={emailValue}
          placeholder="Укажите e-mail"
          onChange={onEmailChange}
        />
        <Button
          extraClass={`${styles.button}`}
          htmlType="submit"
          type="primary">
          Восстановить
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

export default ForgotPassword;
