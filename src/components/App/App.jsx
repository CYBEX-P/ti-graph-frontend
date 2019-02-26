import React from 'react';
// import SplashScreen from '../SplashScreen/SplashScreen';
import NavBar from '../navBar/navBar';
import MenuBar from '../menuBar/menuBar';
import { AppContainer } from '../__styles__/styles';

/**
 * @notes
 * - We will want to create a context of some sort to tell if the menus are expanded or not
 * - There should only be one menubar able to be expanded at a time.
 * - We will need to determine how to have a pannable canvas with the current set up
 * - Should we render a div with a button or just make the button expand (I'm in favor of the latter I think)
 * - We want to create a dropdown for the hamburger menu. Shouldn't be too hard to do
 */

const App = () => (
  <AppContainer>
    <NavBar />
    <MenuBar side="left" icon="search" />
    <MenuBar side="right" icon="history" />
    <MenuBar side="bottom" icon="list" />
  </AppContainer>
);

export default App;
