import 'react-app-polyfill/ie11';
import 'react-app-polyfill/ie9';
import 'react-app-polyfill/stable';

import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { initAll } from 'govuk-frontend'
import { render } from "react-dom";

import App from './App';
import * as serviceWorker from './serviceWorker';


initAll()


const rootElement = document.querySelector('.app-root');

render(<Router><App /></Router>, rootElement);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
