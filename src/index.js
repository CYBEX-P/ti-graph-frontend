/* eslint react/jsx-filename-extension: 0 */
import React from 'react';
import ReactDOM from 'react-dom';
import { library } from '@fortawesome/fontawesome-svg-core';
import {
  faChartBar,
  faBars,
  faSearch,
  faHistory,
  faList,
  faChevronCircleRight,
  faChevronCircleLeft,
  faChevronCircleDown,
  faTimes
} from '@fortawesome/free-solid-svg-icons';
import App from './components/App/App';

library.add(
  faChartBar,
  faBars,
  faSearch,
  faHistory,
  faList,
  faChevronCircleRight,
  faChevronCircleLeft,
  faChevronCircleDown,
  faTimes
);

ReactDOM.render(<App />, document.getElementById('root'));
