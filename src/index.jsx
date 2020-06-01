import React from 'react';
import ReactDOM from 'react-dom';
import configureStore from './state/store/store';
import Root from './routes/root';
// const imagePaths = JSON.parse(rootElement.dataset.images);
// import fetchNotebooks from "./state/actions/notebook"
// import fetchNotebooks from "./state/util/notebookApi";

document.addEventListener('DOMContentLoaded', () => {
  let store;
  
  // checks if user is logged in already for configuration of store
  if(window.currentUser) {
    const preloadedState = {
      entities: {
        users: { [window.currentUser.id]: window.currentUser }
      },
      session: { id: window.currentUser.id }
    };
    store = configureStore(preloadedState);
    delete window.currentUser;
  } else {
    store = configureStore();
  }

  window.getState = store.getState;

  const root = document.getElementById('root');
  ReactDOM.render(<Root store={store} />, root);
});
