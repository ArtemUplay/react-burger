import { IWsAction, TWsActions } from '../types/web-socket';
import { updateToken } from './profile';
import { RootState } from '../../types';
import { Dispatch, Middleware, MiddlewareAPI } from 'redux';
import { AnyAction } from 'redux';

export const WS_CONNECTION_START = 'WS_CONNECTION_START' as const;
export const WS_CONNECTION_SUCCESS = 'WS_CONNECTION_SUCCESS' as const;
export const WS_CONNECTION_ERROR = 'WS_CONNECTION_ERROR' as const;
export const WS_CONNECTION_CLOSED = 'WS_CONNECTION_CLOSED' as const;
export const WS_GET_MESSAGE = 'WS_GET_MESSAGE' as const;
export const WS_SEND_MESSAGE = 'WS_SEND_MESSAGE' as const;
export const WS_CLOSE_CONNECTION = 'WS_CLOSE_CONNECTION' as const;

export const socketMiddleware =
  (wsUrl: string, wsActions: TWsActions): Middleware<{}, RootState> =>
  (store: MiddlewareAPI<Dispatch<AnyAction>, RootState>) =>
  (next: Dispatch<IWsAction>) =>
  (action: IWsAction) => {
    const { dispatch } = store;
    const { type, accessToken } = action;
    const { wsInit, onOpen, onError, onMessage, onClose } = wsActions;
    let socket: WebSocket | null = null;
    let isProfileRequest = null;

    if (type === wsInit && accessToken) {
      isProfileRequest = true;
      socket = new WebSocket(`${wsUrl}?token=${accessToken}`);
    }

    if (type === wsInit && !isProfileRequest) {
      socket = new WebSocket(`${wsUrl}`);
    }

    if (socket) {
      // функция, которая вызывается при открытии сокета
      socket.onopen = (event) => {
        dispatch({ type: onOpen, payload: event.type });
      };

      // функция, которая вызывается при ошибке соединения
      socket.onerror = (event) => {
        dispatch({ type: onError, payload: event });
      };

      // функция, которая вызывается при получении события от сервера
      socket.onmessage = (event) => {
        const data = JSON.parse(event.data);

        if (data.message === 'Invalid or missing token') {
          return updateToken();
        }

        dispatch({ type: onMessage, payload: data });
      };

      // функция, которая вызывается при закрытии соединения
      socket.onclose = (event) => {
        dispatch({ type: onClose, payload: event });
      };
    }

    return next(action);
  };
