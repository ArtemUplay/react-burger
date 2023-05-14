import { useEffect } from 'react';
import styles from './app.module.css';
import AppHeader from '../app-header/app-header';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import {
  PATH_LOGIN_PAGE,
  PATH_CONSTRUCTOR_PAGE,
  PATH_REGISTER_PAGE,
  PATH_FORGOT_PASSWORD_PAGE,
  PATH_RESET_PASSWORD_PAGE,
  PATH_PROFILE_PAGE,
  PATH_PROFILE_PAGE_ROUTES,
} from '../../constants/constants';
import Home from '../../pages/home/home';
import Login from '../../pages/login/login';
import Register from '../../pages/register/register';
import ForgotPassword from '../../pages/forgot-password/forgot-password';
import ResetPassword from '../../pages/reset-password/reset-password';
import Profile from '../../pages/profile/profile';
import ProtectedRouteProfile from '../protected-route-profile/protected-route-profile';
import { useDispatch, useSelector } from 'react-redux';
import { getProfileData, updateToken } from '../../services/actions/profile';
import { getCookie } from '../utils/utils';
import IngredientsDetails from '../ingredient-details/ingredient-details';
import Modal from '../modal/modal';
import ProtectedRouteAuthorization from '../protected-route-authorization/protected-route-authorization';

const App = () => {
  const { accessToken } = useSelector((store) => store.profile);
  const dispatch = useDispatch();
  const refreshToken = getCookie('refreshToken');

  useEffect(() => {
    if (accessToken) {
      dispatch(getProfileData(accessToken));
    } else if (refreshToken) {
      dispatch(updateToken());
    }
  }, [accessToken]);

  return (
    <>
      <BrowserRouter>
        <AppHeader />
        <main className={styles.main}>
          <Routes>
            <Route path={PATH_CONSTRUCTOR_PAGE} element={<Home />} />
            <Route
              path={PATH_LOGIN_PAGE}
              element={<ProtectedRouteAuthorization element={<Login />} />}
            />
            <Route
              path={PATH_REGISTER_PAGE}
              element={<ProtectedRouteAuthorization element={<Register />} />}
            />
            <Route
              path={PATH_FORGOT_PASSWORD_PAGE}
              element={<ForgotPassword />}
            />
            <Route
              path={PATH_RESET_PASSWORD_PAGE}
              element={<ResetPassword />}
            />
            <Route
              path={PATH_PROFILE_PAGE_ROUTES}
              element={<ProtectedRouteProfile element={<Profile />} />}
            />
            <Route
              path="ingredients/:id"
              element={
                <Modal>
                  <IngredientsDetails />
                </Modal>
              }
            />
          </Routes>
        </main>
      </BrowserRouter>
    </>
  );
};

export default App;
