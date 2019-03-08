/* eslint-disable react/no-array-index-key */
import React from 'react';
import PropTypes from 'prop-types';
import { StyledButton, StyledButtonChild } from '../__styles__/styles';

const Button = props => {
  const { onClickFunction, children, type, hasIcon } = props;
  return (
    <StyledButton type={type} onClick={onClickFunction}>
      {children.map((child, index) => (
        <StyledButtonChild key={`${child}__${index}`} hasIcon={hasIcon} index={index}>
          {child}
        </StyledButtonChild>
      ))}
    </StyledButton>
  );
};

Button.propTypes = {
  children: PropTypes.node,
  onClickFunction: PropTypes.func.isRequired,
  type: PropTypes.oneOf(['submit', 'button']),
  hasIcon: PropTypes.bool
};

Button.defaultProps = {
  children: <></>,
  type: 'button',
  hasIcon: false
};

export default Button;
