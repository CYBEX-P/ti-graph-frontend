import React from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { MenuBarStyle } from '../__styles__/styles';

const MenuBar = props => {
  const { icon, side } = props;

  return (
    <MenuBarStyle side={side}>
      <FontAwesomeIcon icon={icon} color="#e0e0e0" size="lg" />
    </MenuBarStyle>
  );
};

MenuBar.propTypes = {
  icon: PropTypes.string,
  side: PropTypes.oneOf(['left', 'right', 'bottom']).isRequired
};

MenuBar.defaultProps = {
  icon: 'search'
};

export default MenuBar;
