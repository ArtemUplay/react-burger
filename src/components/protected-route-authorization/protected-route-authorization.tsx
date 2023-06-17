import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { PATH_PROFILE_PAGE } from '../../constants/constants';
import { IProtectedRouteAuthorizationProps } from './protected-route-authorization.types';
import { useSelector } from '../../types/hooks';

const ProtectedRouteAuthorization = ({
  element,
}: IProtectedRouteAuthorizationProps) => {
  const { accessToken } = useSelector((store) => store.profile);

  const navigate = useNavigate();

  useEffect(() => {
    if (accessToken) {
      navigate(PATH_PROFILE_PAGE);
    }
  }, [accessToken]);

  return accessToken ? <React.Fragment></React.Fragment> : <>{element}</>;
};

export default ProtectedRouteAuthorization;
