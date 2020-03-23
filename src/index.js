import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import { createGlobalStyle } from 'styled-components';
import { initAll } from 'govuk-frontend'

import App from './App';
import * as serviceWorker from './serviceWorker';

import './index.scss';

const GlobalStyles = createGlobalStyle`
  body {
    font-family: "GDS Transport", Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    background-color: #fff;
    color: #0b0c0c;
  }
`;

initAll()

ReactDOM.render(
    <Router>
      <>
        <GlobalStyles />
        <App />
      </>
    </Router>,
  document.getElementById('root'),
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
