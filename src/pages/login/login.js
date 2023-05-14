import { useState, useEffect } from 'react';

import {
  PasswordInput,
  EmailInput,
  Button,
} from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './login.module.css';

import { Link, useNavigate } from 'react-router-dom';
import {
  PATH_CONSTRUCTOR_PAGE,
  PATH_FORGOT_PASSWORD_PAGE,
  PATH_REGISTER_PAGE,
} from '../../constants/constants';
import { sendLoginData } from '../../services/actions/login';
import { useDispatch, useSelector } from 'react-redux';

const Login = () => {
  const { isAuth } = useSelector((store) => store.profile);
  const [emailValue, setEmailValue] = useState('');
  const [passwordValue, setPasswordValue] = useState('');

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onEmailChange = (evt) => {
    setEmailValue(evt.target.value);
  };

  const onPasswordChange = (evt) => {
    setPasswordValue(evt.target.value);
  };

  const submitHandler = (evt) => {
    evt.preventDefault();

    dispatch(sendLoginData({ 'email': emailValue, 'password': passwordValue }));
  };

  useEffect(() => {
    const success = isAuth;

    if (success) {
      navigate(PATH_CONSTRUCTOR_PAGE);
    }
  }, [isAuth, navigate]);

  return (
    <div className={styles.wrapper}>
      <h2 className={`text text_type_main-medium mb-6 ${styles.title}`}>
        Вход
      </h2>
      <form className={`${styles.form} mb-20`}>
        <EmailInput
          extraClass="mb-6"
          type="email"
          value={emailValue}
          placeholder="E-mail"
          onChange={onEmailChange}
        />
        <PasswordInput
          extraClass="mb-6"
          name={'password'}
          value={passwordValue}
          placeholder="Пароль"
          icon="ShowIcon"
          onChange={onPasswordChange}
        />
        <Button
          extraClass={`${styles.button}`}
          htmlType="submit"
          type="primary"
          onClick={submitHandler}>
          Войти
        </Button>
      </form>
      <span className="text text_type_main-default text_color_inactive mb-4">
        Вы — новый пользователь?{'\u00A0'}
        <Link className={styles.link} to={PATH_REGISTER_PAGE}>
          Зарегистрироваться
        </Link>
      </span>
      <span className="text text_type_main-default text_color_inactive">
        Забыли пароль?{'\u00A0'}
        <Link className={styles.link} to={PATH_FORGOT_PASSWORD_PAGE}>
          Восстановить пароль
        </Link>
      </span>
    </div>
  );
};

export default Login;
