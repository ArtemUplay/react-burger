import { useEffect } from 'react';
import styles from './app.module.css';
import AppHeader from '../app-header/app-header';
import { Routes, Route, useNavigate } from 'react-router-dom';
import {
  PATH_LOGIN_PAGE,
  PATH_CONSTRUCTOR_PAGE,
  PATH_REGISTER_PAGE,
  PATH_FORGOT_PASSWORD_PAGE,
  PATH_RESET_PASSWORD_PAGE,
  PATH_PROFILE_PAGE_ROUTES,
  PATH_INGREDIENTS_ID,
  PATH_FEED,
  PATH_FEED_ID,
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
import IngredientsDetails from '../ingredient-details/ingredient-details';
import Modal from '../modal/modal';
import ProtectedRouteAuthorization from '../protected-route-authorization/protected-route-authorization';
import Feed from '../../pages/feed/feed';
import { DELETE_CURRENT_INGREDIENT } from '../../services/actions/ingredient-details';
import { getItems } from '../../services/actions/burger-ingredients';
import { DELETE_CURRENT_ORDER_DETAILS } from '../../services/actions/order-item-details';
import {
  WS_FEED_CONNECTION_CLOSED,
  WS_FEED_CONNECTION_START,
} from '../../services/actions/feed';
import OrderItemFeedDetails from '../order-item-feed-details/order-item-feed-details';

const App = () => {
  const { accessToken } = useSelector((store) => store.profile);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const refreshToken = localStorage.getItem('refreshToken');

  useEffect(() => {
    dispatch(getItems());
  }, [dispatch]);

  useEffect(() => {
    if (accessToken) {
      dispatch(getProfileData(accessToken));
    } else if (refreshToken) {
      dispatch(updateToken());
    }
  }, [accessToken]);

  useEffect(() => {
    dispatch({
      type: WS_FEED_CONNECTION_START,
    });

    return () => {
      dispatch({
        type: WS_FEED_CONNECTION_CLOSED,
      });
    };
  }, [dispatch]);

  return (
    <>
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
          <Route path={PATH_RESET_PASSWORD_PAGE} element={<ResetPassword />} />
          <Route
            path={PATH_PROFILE_PAGE_ROUTES}
            element={<ProtectedRouteProfile element={<Profile />} />}
          />
          <Route
            path={PATH_INGREDIENTS_ID}
            element={
              <Modal
                onClose={() => {
                  navigate(PATH_CONSTRUCTOR_PAGE);
                  dispatch({
                    type: DELETE_CURRENT_INGREDIENT,
                  });
                }}>
                <IngredientsDetails />
              </Modal>
            }
          />
          <Route path={PATH_FEED} element={<Feed />} />
          <Route
            path={PATH_FEED_ID}
            element={
              <Modal
                onClose={() => {
                  dispatch({
                    type: DELETE_CURRENT_ORDER_DETAILS,
                  });
                  navigate(PATH_FEED);
                }}>
                <OrderItemFeedDetails />
              </Modal>
            }
          />
        </Routes>
      </main>
    </>
  );
};

export default App;
