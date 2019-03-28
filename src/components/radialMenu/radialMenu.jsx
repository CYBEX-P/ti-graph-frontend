import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import NetworkContext from '../App/NetworkContext';

const MenuSVG = styled.svg`
  height: ${({ scale }) => Math.round(scale * 200)}px;
  width: ${({ scale }) => Math.round(scale * 200)}px;
  position: absolute;
  top: ${({ position, scale }) => Math.round(position.y) - Math.round(scale * 100)}px;
  left: ${({ position, scale }) => Math.round(position.x) - Math.round(scale * 100)}px;
  z-index: 2;
`;

const InfoLogo = styled.div`
  height: ${({ scale }) => Math.round(scale * 50)}px;
  width: ${({ scale }) => Math.round(scale * 50)}px;
  background-color: #e0e0e0cc;
  position: absolute;
  top: ${({ position, scale }) => Math.round(position.y) - Math.round(scale * 50)}px;
  left: ${({ position, scale }) => Math.round(position.x) - Math.round(scale * 100)}px;
  z-index: 5;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const RadialMenu = ({ position }) => {
  const { network } = useContext(NetworkContext);
  const scale = network.getScale();
  return (
    <div>
      <MenuSVG
        position={position}
        scale={scale}
        id="Layer_1"
        data-name="Layer 1"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 200 200"
      >
        <title>radial-menu</title>
        <path
          d="M100,199.5A99.5,99.5,0,1,1,199.5,100,99.62,99.62,0,0,1,100,199.5Zm0-150A50.5,50.5,0,1,0,150.5,100,50.55,50.55,0,0,0,100,49.5Z"
          style={{ fill: '#aaa' }}
        />
        <path
          d="M100,1A99,99,0,1,1,1,100,99.11,99.11,0,0,1,100,1m0,150a51,51,0,1,0-51-51,51.06,51.06,0,0,0,51,51M100,0A100,100,0,1,0,200,100,100,100,0,0,0,100,0Zm0,150a50,50,0,1,1,50-50,50,50,0,0,1-50,50Z"
          style={{ fill: '#ccc' }}
        />
        <line
          x1="0.54"
          y1="100.49"
          x2="49.5"
          y2="100.49"
          style={{ fill: '#aaa', stroke: '#ccc', strokeMiterlimit: 10 }}
        />
        <line
          x1="199.5"
          y1="100.5"
          x2="150.5"
          y2="100.5"
          style={{ fill: '#aaa', stroke: '#ccc', strokeMiterlimit: 10 }}
        />
        <line x1="99.64" y1="0.5" x2="99.64" y2="49" style={{ fill: '#aaa', stroke: '#ccc', strokeMiterlimit: 10 }} />
        <line
          x1="100.5"
          y1="200.5"
          x2="100.5"
          y2="150.5"
          style={{ fill: '#aaa', stroke: '#ccc', strokeMiterlimit: 10 }}
        />
        <line x1="65" y1="63" x2="30.58" y2="28.58" style={{ fill: '#aaa', stroke: '#ccc', strokeMiterlimit: 10 }} />
        <line x1="136" y1="65" x2="171.07" y2="29.93" style={{ fill: '#aaa', stroke: '#ccc', strokeMiterlimit: 10 }} />
        <line x1="64" y1="136" x2="29.29" y2="170.71" style={{ fill: '#aaa', stroke: '#ccc', strokeMiterlimit: 10 }} />
        <line
          x1="136"
          y1="135"
          x2="171.11"
          y2="170.11"
          style={{ fill: '#aaa', stroke: '#ccc', strokeMiterlimit: 10 }}
        />
      </MenuSVG>
      <InfoLogo position={position} scale={scale}>
        <FontAwesomeIcon icon="info-circle" />
      </InfoLogo>
    </div>
  );
};

RadialMenu.propTypes = {
  position: PropTypes.shape({ x: PropTypes.number, y: PropTypes.number }).isRequired
};

export default RadialMenu;
