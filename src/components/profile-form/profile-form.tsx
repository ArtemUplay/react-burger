import { useState, useEffect, ChangeEvent } from 'react';
import {
  EmailInput,
  PasswordInput,
  Input,
  Button,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { useDispatch } from 'react-redux';
import {
  getProfileData,
  patchProfileData,
} from '../../services/actions/profile';
import styles from './profile-form.module.css';
import ProfileNavigationMenu from '../profile-navigation-menu/profile-navigation-menu';
import { useSelector } from '../../types/hooks';
import { AppDispatch } from '../../types';

const ProfileForm = () => {
  const { profileUserData, accessToken } = useSelector(
    (store) => store.profile
  );
  const dispatch: AppDispatch = useDispatch();

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
    dispatch(getProfileData(accessToken));
  };

  useEffect(() => {
    if (profileUserData) {
      setUserNameValue(profileUserData.name);
      setEmailValue(profileUserData.email);
    }
  }, [profileUserData]);

  const onUserNameChange = (evt: ChangeEvent<HTMLInputElement>) => {
    setUserNameValue(evt.target.value);
  };
  const onEmailChange = (evt: ChangeEvent<HTMLInputElement>) => {
    setEmailValue(evt.target.value);
  };

  const onPasswordChange = (evt: ChangeEvent<HTMLInputElement>) => {
    setPasswordValue(evt.target.value);
  };

  return (
    <>
      <ProfileNavigationMenu />
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
          value={emailValue}
          placeholder="E-mail"
          isIcon
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
    </>
  );
};

export default ProfileForm;
