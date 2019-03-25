import React, { useContext } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { NavBarStyle, UnstyledButton } from '../__styles__/styles';
import MenuContext from '../App/MenuContext';

const NavBar = () => {
  const { isExpanded, dispatchExpand } = useContext(MenuContext);
  return (
    <>
      <NavBarStyle>
        <UnstyledButton
          onClick={() => {
            dispatchExpand(isExpanded === 'top' ? 'none' : 'top');
          }}
        >
          <FontAwesomeIcon size="lg" icon="bars" color="#e0e0e0" />
        </UnstyledButton>
        <div style={{ flexGrow: 2, textAlign: 'center' }}>ti-graph</div>
        <UnstyledButton onClick={() => {}}>
          <FontAwesomeIcon size="lg" icon="user" color="#e0e0e0" />
        </UnstyledButton>
      </NavBarStyle>
      {isExpanded === 'top' && (
        <div
          style={{
            gridColumn: '1 / span 5',
            gridRow: 2,
            width: '100%',
            height: '100%',
            backgroundColor: '#0277bd',
            boxShadow: '0px 2px 4px #22222233',
            zIndex: 7
          }}
        >
          This is a test
        </div>
      )}
    </>
  );
};

export default NavBar;
