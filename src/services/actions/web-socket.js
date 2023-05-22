export const WS_CONNECTION_START = 'WS_CONNECTION_START';
export const WS_CONNECTION_SUCCESS = 'WS_CONNECTION_SUCCESS';
export const WS_CONNECTION_ERROR = 'WS_CONNECTION_ERROR';
export const WS_CONNECTION_CLOSED = 'WS_CONNECTION_CLOSED';
export const WS_GET_MESSAGE = 'WS_GET_MESSAGE';
export const WS_SEND_MESSAGE = 'WS_SEND_MESSAGE';
export const WS_CLOSE_CONNECTION = 'WS_CLOSE_CONNECTION';

export const socketMiddleware = (wsUrl, wsActions) => {
  return (store) => {
    let socket = null;

    return (next) => (action) => {
      const { dispatch } = store;
      const { type, accessToken } = action;
      const { wsInit, onOpen, onError, onMessage, onClose } = wsActions;
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
          dispatch({ type: onOpen, payload: event });
        };

        // функция, которая вызывается при ошибке соединения
        socket.onerror = (event) => {
          dispatch({ type: onError, payload: event });
        };

        // функция, которая вызывается при получении события от сервера
        socket.onmessage = (event) => {
          const data = JSON.parse(event.data);

          dispatch({ type: onMessage, payload: data });
        };

        // функция, которая вызывается при закрытии соединения
        socket.onclose = (event) => {
          dispatch({ type: onClose, payload: event });
        };
      }

      next(action);
    };
  };
};
