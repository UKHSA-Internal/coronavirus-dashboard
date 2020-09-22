import 'react-app-polyfill/ie11';
import 'react-app-polyfill/ie9';
import 'react-app-polyfill/stable';

import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import { initAll } from 'govuk-frontend'
import { hydrate, render } from "react-dom";

import App from './App';
import * as serviceWorker from './serviceWorker';


import './index.scss';

initAll()


const rootElement = document.querySelector('.app-root');

rootElement.hasChildNodes()
    ? hydrate(<Router basename={ "/details" }><App /></Router>, rootElement)
    : render(<Router basename={ "/details" }><App /></Router>, rootElement);


// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
