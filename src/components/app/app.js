import { useEffect } from 'react';
import styles from './app.module.css';
import AppHeader from '../app-header/app-header';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import {
  pathLoginPage,
  pathConstructorPage,
  pathRegisterPage,
  pathForgotPasswordPage,
  pathResetPasswordPage,
  pathProfilePage,
} from '../../constants/constants';
import Home from '../../pages/home/home';
import Login from '../../pages/login/login';
import Register from '../../pages/register/register';
import ForgotPassword from '../../pages/forgot-password/forgot-password';
import ResetPassword from '../../pages/reset-password/reset-password';
import Profile from '../../pages/profile/profile';
import ProtectedRouteElement from '../protected-route-element/protected-route-element';
import { useDispatch, useSelector } from 'react-redux';
import { getProfileData, updateToken } from '../../services/actions/profile';
import { getCookie } from '../utils/utils';
import IngredientsDetails from '../ingredient-details/ingredient-details';
import Modal from '../modal/modal';

const App = () => {
  const { accessToken } = useSelector((store) => store.profile);
  const dispatch = useDispatch();
  const refreshToken = getCookie('refreshToken');

  // useEffect(() => {
  //   if (accessToken) {
  //     dispatch(getProfileData(accessToken));
  //   } else if (refreshToken) {
  //     dispatch(updateToken(refreshToken));
  //   }
  // }, []);
  useEffect(() => {
    if (accessToken) {
      dispatch(getProfileData(accessToken));
    } else if (refreshToken) {
      dispatch(updateToken(refreshToken));
    }
  }, [accessToken]);

  return (
    <>
      <BrowserRouter>
        <AppHeader />
        <main className={styles.main}>
          <Routes>
            <Route path={pathConstructorPage} element={<Home />} />
            <Route path={pathLoginPage} element={<Login />} />
            <Route path={pathRegisterPage} element={<Register />} />
            <Route path={pathForgotPasswordPage} element={<ForgotPassword />} />
            <Route path={pathResetPasswordPage} element={<ResetPassword />} />
            <Route
              path={pathProfilePage + '/*'}
              element={<ProtectedRouteElement element={<Profile />} />}
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
