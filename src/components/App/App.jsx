import React, { useReducer } from 'react';
import NavBar from '../navBar/navBar';
import MenuBar from '../menuBar/menuBar';
import { AppContainer, ContentContainerStyle } from '../__styles__/styles';
import MenuContext from './MenuContext';

const App = () => {
  const [isExpanded, dispatchExpand] = useReducer((_, action) => {
    if (action === 'left' || action === 'right' || action === 'bottom') {
      return action;
    }
    return 'none';
  }, 'none');
  return (
    <MenuContext.Provider value={{ isExpanded, dispatchExpand }}>
      <AppContainer>
        {/* Important to have content rendered under navbar and menubar */}
        <ContentContainerStyle>
          <p>Graph will go here!</p>
        </ContentContainerStyle>
        <NavBar />
        <MenuBar side="left" icon="search" />
        <MenuBar side="right" icon="history" />
        <MenuBar side="bottom" icon="list" />
      </AppContainer>
    </MenuContext.Provider>
  );
};

export default App;
