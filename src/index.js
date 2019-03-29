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
  faMeh
} from '@fortawesome/free-solid-svg-icons';
import App from './components/App/App';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';

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
  faMeh
);

let YAMLConfig = {}; 

axios.get(`/admin/config`).then(({data}) => {
  YAMLConfig = data;
  ReactDOM.render(<App config={YAMLConfig}/>, document.getElementById('root'));
});

