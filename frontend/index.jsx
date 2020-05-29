import React from 'react';
import ReactDOM from 'react-dom';
import * as APIUtil from './util/session_api_util';

document.addEventListener('DOMContentLoaded', () => {
  window.login = APIUtil.login;
  window.logout = APIUtil.logout;

  const root = document.getElementById('root');

  ReactDOM.render(<div>welcome</div>, root);
});
