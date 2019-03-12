/* eslint-disable react/no-array-index-key */
import React from 'react';
import PropTypes from 'prop-types';
import { StyledButton, StyledButtonChild } from '../__styles__/styles';

const Button = props => {
  const { onClickFunction, children, type, hasIcon, width } = props;
  return (
    <StyledButton width={width} type={type} onClick={onClickFunction}>
      {Array.isArray(children)
        ? children.map((child, index) => (
            // eslint-disable-next-line react/jsx-indent
            <StyledButtonChild key={`${child}__${index}`} hasIcon={hasIcon} index={index}>
              {child}
            </StyledButtonChild>
          ))
        : children}
    </StyledButton>
  );
};

Button.propTypes = {
  children: PropTypes.node,
  onClickFunction: PropTypes.func.isRequired,
  type: PropTypes.oneOf(['submit', 'button']),
  hasIcon: PropTypes.bool,
  width: PropTypes.string
};

Button.defaultProps = {
  children: <></>,
  type: 'button',
  hasIcon: false,
  width: '80%'
};

export default Button;
