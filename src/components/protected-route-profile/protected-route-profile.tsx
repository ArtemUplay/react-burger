import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getProfileData, updateToken } from '../../services/actions/profile';
import { PATH_LOGIN_PAGE } from '../../constants/constants';

import styles from './protected-route-profile.module.css';
import Loader from '../loader/loader';
import { IProtectedRouteProfileProps } from './protected-route-profile.types';
import { useSelector } from '../../types/hooks';
import { ThunkDispatch } from 'redux-thunk';
import { AnyAction } from 'redux';
import { RootState } from '../../types';

const ProtectedRouteProfile = ({ element }: IProtectedRouteProfileProps) => {
  const dispatch: ThunkDispatch<RootState, any, AnyAction> = useDispatch();
  const [userLoaded, setUserLoaded] = useState(false);
  const { accessToken } = useSelector((store) => store.profile);
  const refreshToken = localStorage.getItem('refreshToken');
  const navigate = useNavigate();

  const init = () => {
    if (accessToken) {
      dispatch(getProfileData(accessToken));
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

  return (
    <>
      {userLoaded ? (
        element
      ) : (
        <div className={styles.loader}>
          <Loader text="Загрузка... Пожалуйста, подождите" />
        </div>
      )}
    </>
  );
};

export default ProtectedRouteProfile;
