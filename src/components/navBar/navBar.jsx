import React, { useContext } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';
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
        <a style={{ flexGrow: 2, textAlign: 'center', color: '#e3e3e3' }} href="/">
          <div>ti-graph</div>
        </a>
        <UnstyledButton onClick={() => {}}>
          <a style={{ flexGrow: 2, textAlign: 'center', color: '#e3e3e3' }} href="/login">
            <FontAwesomeIcon size="lg" icon="user" color="#e0e0e0" />
          </a>
        </UnstyledButton>
      </NavBarStyle>
      {isExpanded === 'top' && (
        <div
          style={{
            backgroundColor: '#0277bd',
            boxShadow: '0px 2px 4px #22222233',
            position: 'absolute',
            width: '100%',
            top: '56px',
            zIndex: 7
          }}
        >
          <ul style={{ marginLeft: '12px' }} className="navbar-nav">
            <li className="nav-item">
              <Link onClick={() => dispatchExpand('none')} className="nav-link text-light" to="/">
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link onClick={() => dispatchExpand('none')} className="nav-link text-light" to="/login">
                Login
              </Link>
            </li>
            <li className="nav-item">
              <Link onClick={() => dispatchExpand('none')} className="nav-link text-light" to="/register">
                Register
              </Link>
            </li>
            <li className="nav-item">
              <Link onClick={() => dispatchExpand('none')} className="nav-link text-light" to="/find">
                Find User
              </Link>
            </li>
            <li className="nav-item">
              <Link onClick={() => dispatchExpand('none')} className="nav-link text-light" to="/remove">
                Delete
              </Link>
            </li>
            <li className="nav-item">
              <Link onClick={() => dispatchExpand('none')} className="nav-link text-light" to="/update">
                Update
              </Link>
            </li>
          </ul>
        </div>
      )}
    </>
  );
};

export default NavBar;
