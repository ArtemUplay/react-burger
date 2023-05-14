import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getProfileData, updateToken } from '../../services/actions/profile';
import { getCookie } from '../utils/utils';
import { pathLoginPage } from '../../constants/constants';

const ProtectedRouteElement = ({ element }) => {
  const dispatch = useDispatch();
  const [userLoaded, setUserLoaded] = useState(false);
  const { accessToken } = useSelector(
    (store) => store.profile
  );
  const refreshToken = getCookie('refreshToken');
  const navigate = useNavigate();

  const init = () => {
    if (accessToken) {
      dispatch(getProfileData(accessToken));
      setUserLoaded(true);
    } else if (refreshToken) {
      dispatch(updateToken(refreshToken));
    } else {
      navigate(pathLoginPage);
    }
  };

  useEffect(() => {
    init();
  }, [accessToken]);

  if (!userLoaded) {
    return <h1 className="text text_type_main-medium mt-10">Загрузка...</h1>;
  }

  // return profileUserData ? element : <Navigate to={'/login'} replace />;
  return element;
};

export default ProtectedRouteElement;
