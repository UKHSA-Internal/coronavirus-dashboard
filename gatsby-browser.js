import { initAll } from 'govuk-frontend'

import './src/index.scss';

initAll();

export const onClientEntry = () => {
  window.addEventListener('load', () => {
    document.body.className += ' js-enabled';
  });
};
