import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { NavBarStyle, UnstyledButton } from '../__styles__/styles';

const NavBar = () => {
  return (
    <NavBarStyle>
      <UnstyledButton onClick={() => {}}>
        <FontAwesomeIcon size="lg" icon="bars" color="#e0e0e0" />
      </UnstyledButton>
      <div style={{ flexGrow: 2, textAlign: 'center' }}>ti-graph</div>
    </NavBarStyle>
  );
};

export default NavBar;
