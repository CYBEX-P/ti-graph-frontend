import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import NetworkContext from '../App/NetworkContext';

const NodeInfoDiv = styled.div`
  background-color: #c0c0c0;
  height: ${({ scale }) => Math.round(scale * 250)}px;
  width: ${({ scale }) => Math.round(scale * 250)}px;
  position: absolute;
  top: ${({ position, scale }) => Math.round(position.y) - Math.round(scale * 125)}px;
  left: ${({ position, scale }) => Math.round(position.x) - Math.round(scale * 125)}px;
  border-radius: 50%;
  border: 1px solid #c0c0c0;
  justify-content: center;
  z-index: 2;
  pointer-events: none;
  box-shadow: 1px 1px 4px 2px #11111155;
  /* overflow: hidden; */
`;

const Child = styled.div`
  height: 100%;
  width: 0%;
  left: 50%;
  position: absolute;
  transform-origin: center;
  border-right: 1px solid #aaaaaa;

  :nth-child(2) {
    transform: rotate(45deg);
  }
  :nth-child(3) {
    transform: rotate(90deg);
  }
  :nth-child(4) {
    transform: rotate(135deg);
  }
  :nth-child(5) {
    transform: rotate(180deg);
  }
  :nth-child(6) {
    transform: rotate(225deg);
  }
  :nth-child(7) {
    transform: rotate(270deg);
  }
  :nth-child(8) {
    transform: rotate(315deg);
  }
`;

const RadialMenu = ({ position }) => {
  const { network } = useContext(NetworkContext);
  const scale = network.getScale();
  return (
    <NodeInfoDiv scale={scale} position={position}>
      <Child />
      <Child />
      <Child />
      <Child />
    </NodeInfoDiv>
  );
};

RadialMenu.propTypes = {
  position: PropTypes.shape({ x: PropTypes.number, y: PropTypes.number }).isRequired
};

export default RadialMenu;
