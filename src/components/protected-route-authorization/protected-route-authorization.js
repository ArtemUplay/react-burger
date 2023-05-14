import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { PATH_PROFILE_PAGE } from '../../constants/constants';

const ProtectedRouteAuthorization = ({ element }) => {
  const { accessToken } = useSelector((store) => store.profile);

  const navigate = useNavigate();

  const init = () => {
    if (accessToken) {
      navigate(PATH_PROFILE_PAGE);
    }
  };

  useEffect(() => {
    init();
  }, [accessToken]);

  return element;
};

export default ProtectedRouteAuthorization;
