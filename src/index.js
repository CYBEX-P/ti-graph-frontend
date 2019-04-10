/* eslint react/jsx-filename-extension: 0 */
import React from 'react';
import ReactDOM from 'react-dom';
import { library } from '@fortawesome/fontawesome-svg-core';
import {
  faChartBar,
  faBars,
  faSearch,
  faEdit,
  faList,
  faChevronCircleRight,
  faChevronCircleLeft,
  faChevronCircleDown,
  faTimes,
  faUser,
  faPlusCircle,
  faServer,
  faMeh,
  faInfoCircle
} from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import App from './App';
import 'bootstrap/dist/css/bootstrap.min.css';

library.add(
  faChartBar,
  faBars,
  faSearch,
  faEdit,
  faList,
  faChevronCircleRight,
  faChevronCircleLeft,
  faChevronCircleDown,
  faTimes,
  faUser,
  faPlusCircle,
  faServer,
  faMeh,
  faInfoCircle
);

let YAMLConfig = {};

axios
  .get(`/admin/config`)
  .then(({ data }) => {
    YAMLConfig = data;
    ReactDOM.render(<App config={YAMLConfig} />, document.getElementById('root'));
  })
  .catch(() => {
    ReactDOM.render(
      <h1 className="text-center">Oops! We were not able to get a response from the server.</h1>,
      document.getElementById('root')
    );
  });
