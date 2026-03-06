import React from 'react';
import ReactDOM from 'react-dom';
import configureStore from './state/store/store';
import Root from './routes/root';
import { checkSession } from './state/util/sessionApi';
import './styles/index.scss';

document.addEventListener('DOMContentLoaded', async () => {
  let store;

  try {
    const currentUser = await checkSession();
    if (currentUser && currentUser.id) {
      const preloadedState = {
        entities: {
          users: { [currentUser.id]: currentUser }
        },
        session: { id: currentUser.id }
      };
      store = configureStore(preloadedState);
    } else {
      store = configureStore();
    }
  } catch (e) {
    store = configureStore();
  }

  window.getState = store.getState;

  const root = document.getElementById('root');
  ReactDOM.render(<Root store={store} />, root);
});
