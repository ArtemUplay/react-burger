import React from 'react';
import ReactDOM from 'react-dom/client';
import 'normalize.css';
import './index.css';
import App from './components/app/app';
import { applyMiddleware, compose, Store, Dispatch } from 'redux';
import { configureStore } from '@reduxjs/toolkit';
import { rootReducer } from './services/reducers';
import { Provider } from 'react-redux';
import thunk, { ThunkDispatch } from 'redux-thunk';
import { BrowserRouter } from 'react-router-dom';
import { socketMiddleware } from './services/actions/web-socket';

import {
  WS_FEED_CONNECTION_START,
  WS_FEED_CONNECTION_SUCCESS,
  WS_FEED_CONNECTION_CLOSED,
  WS_FEED_CONNECTION_ERROR,
  WS_FEED_CONNECTION_MESSAGE,
} from './services/actions/feed';
import {
  WS_ORDERS_HISTORY_CONNECTION_START,
  WS_ORDERS_HISTORY_CONNECTION_SUCCESS,
  WS_ORDERS_HISTORY_CONNECTION_CLOSED,
  WS_ORDERS_HISTORY_CONNECTION_ERROR,
  WS_ORDERS_HISTORY_CONNECTION_MESSAGE,
} from './services/actions/orders-history';

export const wsFeedActions = {
  wsInit: WS_FEED_CONNECTION_START,
  onOpen: WS_FEED_CONNECTION_SUCCESS,
  onClose: WS_FEED_CONNECTION_CLOSED,
  onError: WS_FEED_CONNECTION_ERROR,
  onMessage: WS_FEED_CONNECTION_MESSAGE,
};

export const wsOrdersHistoryActions = {
  wsInit: WS_ORDERS_HISTORY_CONNECTION_START,
  onOpen: WS_ORDERS_HISTORY_CONNECTION_SUCCESS,
  onClose: WS_ORDERS_HISTORY_CONNECTION_CLOSED,
  onError: WS_ORDERS_HISTORY_CONNECTION_ERROR,
  onMessage: WS_ORDERS_HISTORY_CONNECTION_MESSAGE,
};

const wsFeedUrl = 'wss://norma.nomoreparties.space/orders/all' as const;
const wsOrdersHistoryUrl = 'wss://norma.nomoreparties.space/orders' as const;

declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
  }
}

export const composeEnhancers =
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export const store: Store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat([
      socketMiddleware(wsFeedUrl, wsFeedActions),
      socketMiddleware(wsOrdersHistoryUrl, wsOrdersHistoryActions),
    ]),
});

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>
);
