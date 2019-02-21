/* eslint react/jsx-filename-extension: 0 */
import React from 'react';
import ReactDOM from 'react-dom';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faChartBar, faBars } from '@fortawesome/free-solid-svg-icons';
import App from './components/App/App';

library.add(faChartBar, faBars);

ReactDOM.render(<App />, document.getElementById('root'));
