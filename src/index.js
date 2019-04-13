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
  faInfoCircle,
  faProjectDiagram
} from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import App from './components/App/App';
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
  faInfoCircle,
  faProjectDiagram
);

let YAMLConfig = {};

axios.get(`/admin/config`).then(({ data }) => {
  YAMLConfig = data;
  ReactDOM.render(<App config={YAMLConfig} />, document.getElementById('root'));
});
