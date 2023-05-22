import { useState, useEffect } from 'react';
import {
  EmailInput,
  PasswordInput,
  Input,
  Button,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { useDispatch, useSelector } from 'react-redux';
import {
  getProfileData,
  patchProfileData,
} from '../../services/actions/profile';
import styles from './profile-form.module.css';

const ProfileForm = () => {
  const { profileUserData, accessToken } = useSelector(
    (store) => store.profile
  );
  const dispatch = useDispatch();
  const refreshToken = localStorage.getItem('refreshToken');

  const [userNameValue, setUserNameValue] = useState('');
  const [emailValue, setEmailValue] = useState('');
  const [passwordValue, setPasswordValue] = useState('');

  const onClickSaveButton = () => {
    dispatch(
      patchProfileData(
        { 'name': userNameValue, 'email': emailValue },
        accessToken
      )
    );
  };

  const onClickCancelButton = () => {
    dispatch(getProfileData(accessToken, refreshToken));
  };

  useEffect(() => {
    if (profileUserData) {
      setUserNameValue(profileUserData.name);
      setEmailValue(profileUserData.email);
    }
  }, [profileUserData]);

  const onUserNameChange = (evt) => {
    setUserNameValue(evt.target.value);
  };
  const onEmailChange = (evt) => {
    setEmailValue(evt.target.value);
  };

  const onPasswordChange = (evt) => {
    setPasswordValue(evt.target.value);
  };

  return (
    <form className={styles.form}>
      <Input
        extraClass="mb-6"
        type="text"
        placeholder="Имя"
        value={userNameValue}
        icon="EditIcon"
        onChange={onUserNameChange}
      />
      <EmailInput
        extraClass="mb-6"
        type="email"
        value={emailValue}
        placeholder="E-mail"
        icon="EditIcon"
        onChange={onEmailChange}
      />
      <PasswordInput
        name={'password'}
        disabled={false}
        value={passwordValue}
        placeholder="Пароль"
        icon="EditIcon"
        onChange={onPasswordChange}
      />
      <div className={styles.buttons}>
        <Button
          extraClass="mr-8"
          htmlType="button"
          type="secondary"
          onClick={onClickCancelButton}>
          Отмена
        </Button>
        <Button htmlType="button" type="primary" onClick={onClickSaveButton}>
          Изменить
        </Button>
      </div>
    </form>
  );
};

export default ProfileForm;
