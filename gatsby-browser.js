import { initAll } from 'govuk-frontend'

import './src/index.scss';
import 'govuk-frontend/govuk/all.scss';

initAll();

export const onClientEntry = () => {
  window.addEventListener('load', () => {
    document.body.className += ' js-enabled';
  });
};
