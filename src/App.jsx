import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import MainApp from './components/App/MainApp';
import Login from './pages/Login';
import Register from './pages/Register';
import Profile from './pages/Profile';
import Find from './pages/Find';
import Found from './pages/Found';
import Remove from './pages/Remove';
import Update from './pages/Update';

const App = ({ config }) => {
  return (
    <Router>
      <div className="App">
        <Route component={() => <MainApp config={config} />} />
        <div className="container">
          <Route exact path="/register" component={Register} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/profile" component={Profile} />
          <Route exact path="/remove" component={Remove} />
          <Route exact path="/update" component={Update} />
          <Route exact path="/find" component={Find} />
          <Route exact path="/found" component={Found} />
        </div>
      </div>
    </Router>
  );
};

export default App;
