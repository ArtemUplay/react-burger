import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getProfileData, updateToken } from '../../services/actions/profile';
import { PATH_LOGIN_PAGE } from '../../constants/constants';
import Loader from 'react-js-loader';

import styles from './protected-route-profile.module.css';

const ProtectedRouteProfile = ({ element }) => {
  const dispatch = useDispatch();
  const [userLoaded, setUserLoaded] = useState(false);
  const { accessToken } = useSelector((store) => store.profile);
  const refreshToken = localStorage.getItem('refreshToken');
  const navigate = useNavigate();

  const init = () => {
    if (accessToken) {
      dispatch(getProfileData(accessToken, refreshToken));
      setUserLoaded(true);
    } else if (refreshToken) {
      dispatch(updateToken());
    } else {
      navigate(PATH_LOGIN_PAGE);
    }
  };

  useEffect(() => {
    init();
  }, [accessToken]);

  if (!userLoaded) {
    return (
      <div className={styles.loader}>
        <Loader />
        <p className="text text_type_main-default">
          Загрузка... Пожалуйста подождите
        </p>
      </div>
    );
  }

  return element;
};

export default ProtectedRouteProfile;
