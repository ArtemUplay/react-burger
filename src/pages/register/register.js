import { useState, useEffect } from 'react';

import {
  PasswordInput,
  EmailInput,
  Button,
  Input,
} from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './register.module.css';
import {
  pathConstructorPage,
  pathLoginPage,
  pathProfilePage,
} from '../../constants/constants';

import { Link, useNavigate } from 'react-router-dom';
import { sendRegisterData } from '../../services/actions/register';
import { useDispatch, useSelector } from 'react-redux';

const Register = () => {
  const { profileUserData, isAuth } = useSelector((store) => store.profile);
  const [userNameValue, setUserNameValue] = useState('');
  const [emailValue, setEmailValue] = useState('');
  const [passwordValue, setPasswordValue] = useState('');
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onUserNameChange = (evt) => {
    setUserNameValue(evt.target.value);
  };
  const onEmailChange = (evt) => {
    setEmailValue(evt.target.value);
  };

  const onPasswordChange = (evt) => {
    setPasswordValue(evt.target.value);
  };

  const submitHandler = (evt) => {
    evt.preventDefault();
    dispatch(
      sendRegisterData({
        'email': emailValue,
        'password': passwordValue,
        'name': userNameValue,
      })
    );
  };

  useEffect(() => {
    if (profileUserData) {
      navigate(pathConstructorPage);
    }
  }, [profileUserData]);

  useEffect(() => {
    const success = isAuth;

    if (success) {
      navigate(pathProfilePage);
    }
  }, [isAuth, navigate]);

  return (
    <div className={styles.wrapper}>
      <h2 className={`text text_type_main-medium mb-6 ${styles.title}`}>
        Регистрация
      </h2>
      <form className={`${styles.form} mb-20`}>
        <Input
          extraClass="mb-6"
          type="text"
          placeholder="Имя"
          value={userNameValue}
          onChange={onUserNameChange}
        />
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
          Зарегистрироваться
        </Button>
      </form>
      <span className="text text_type_main-default text_color_inactive mb-4">
        Уже зарегистрированы?{'\u00A0'}
        <Link className={styles.link} to={pathLoginPage}>
          Войти
        </Link>
      </span>
    </div>
  );
};

export default Register;
