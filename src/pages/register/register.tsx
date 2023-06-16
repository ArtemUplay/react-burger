import { useState, useEffect, ChangeEvent, FormEvent } from 'react';

import {
  PasswordInput,
  EmailInput,
  Button,
  Input,
} from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './register.module.css';
import { PATH_LOGIN_PAGE, PATH_PROFILE_PAGE } from '../../constants/constants';

import { Link, useNavigate } from 'react-router-dom';
import { sendRegisterData } from '../../services/actions/register';
import { useDispatch } from 'react-redux';
import { useSelector } from '../../types/hooks';
import { AnyAction } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import { AppDispatch, RootState } from '../../types';

const Register = () => {
  const { isAuth } = useSelector((store) => store.profile);
  const [userNameValue, setUserNameValue] = useState('');
  const [emailValue, setEmailValue] = useState('');
  const [passwordValue, setPasswordValue] = useState('');
  const navigate = useNavigate();
  const dispatch: AppDispatch = useDispatch();

  const onUserNameChange = (evt: ChangeEvent<HTMLInputElement>) => {
    setUserNameValue(evt.target.value);
  };
  const onEmailChange = (evt: ChangeEvent<HTMLInputElement>) => {
    setEmailValue(evt.target.value);
  };

  const onPasswordChange = (evt: ChangeEvent<HTMLInputElement>) => {
    setPasswordValue(evt.target.value);
  };

  const submitHandler = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    dispatch(
      sendRegisterData({
        email: emailValue,
        password: passwordValue,
        name: userNameValue,
      })
    );
  };

  useEffect(() => {
    const success = isAuth;

    if (success) {
      navigate(PATH_PROFILE_PAGE);
    }
  }, [isAuth, navigate]);

  return (
    <div className={styles.wrapper}>
      <h2 className={`text text_type_main-medium mb-6 ${styles.title}`}>
        Регистрация
      </h2>
      <form className={`${styles.form} mb-20`} onSubmit={submitHandler}>
        <Input
          extraClass="mb-6"
          type="text"
          placeholder="Имя"
          value={userNameValue}
          onChange={onUserNameChange}
        />
        <EmailInput
          extraClass="mb-6"
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
          type="primary">
          Зарегистрироваться
        </Button>
      </form>
      <span className="text text_type_main-default text_color_inactive mb-4">
        Уже зарегистрированы?{'\u00A0'}
        <Link className={styles.link} to={PATH_LOGIN_PAGE}>
          Войти
        </Link>
      </span>
    </div>
  );
};

export default Register;
