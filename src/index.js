import 'react-app-polyfill/ie11';
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import { initAll } from 'govuk-frontend'

import App from './App';
import * as serviceWorker from './serviceWorker';

import 'react-app-polyfill/ie9';
import 'react-app-polyfill/ie11';
import 'react-app-polyfill/stable';

import './index.scss';

initAll()

ReactDOM.render(
    <Router>
      <App />
    </Router>,

  // Bind via a class selector, to leave the element's id available for in-page
  // navigation.
  document.querySelector('.app-root'),
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
