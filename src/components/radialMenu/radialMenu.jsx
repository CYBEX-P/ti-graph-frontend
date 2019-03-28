import React, { useContext, useState } from 'react';
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
  fill: transparent;
`;

const Path = styled.path`
  fill: #aaa;
  :hover {
    fill: #e0e0e0;
  }
`;

const RadialMenu = ({ position, nodeData }) => {
  const { network } = useContext(NetworkContext);
  const scale = network.getScale();
  const [isShowingInfo, setShowingInfo] = useState(false);
  return (
    <div>
      <MenuSVG
        position={position}
        scale={scale}
        id="Layer_1"
        data-name="Layer 1"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 198.99 198.99"
      >
        <Path
          d="M135.45,63.84,170.09,29.2A99.19,99.19,0,0,0,100.5.5v49A50.29,50.29,0,0,1,135.45,63.84Z"
          transform="translate(-0.76 -0.5)"
          onClick={() => console.log(1)}
        />
        <Path
          d="M170.8,29.91,136.17,64.54a50.37,50.37,0,0,1,14.57,35h49A99.17,99.17,0,0,0,170.8,29.91Z"
          transform="translate(-0.76 -0.5)"
          onClick={() => console.log(2)}
        />
        <Path
          d="M150.74,100.5a50.29,50.29,0,0,1-14.33,34.7l34.64,34.64a99.19,99.19,0,0,0,28.69-69.34Z"
          transform="translate(-0.76 -0.5)"
          onClick={() => console.log(3)}
        />
        <Path
          d="M135.71,135.92a50.32,50.32,0,0,1-35.21,14.57v49a99.17,99.17,0,0,0,69.84-28.95Z"
          transform="translate(-0.76 -0.5)"
          onClick={() => console.log(4)}
        />
        <Path
          d="M64.79,135.92,30.16,170.55A99.16,99.16,0,0,0,99.5,199.49v-49A50.36,50.36,0,0,1,64.79,135.92Z"
          transform="translate(-0.76 -0.5)"
          onClick={() => console.log(5)}
        />
        <Path
          d="M49.76,100.5H.76a99.19,99.19,0,0,0,28.69,69.34L64.09,135.2A50.29,50.29,0,0,1,49.76,100.5Z"
          transform="translate(-0.76 -0.5)"
          onClick={() => console.log(6)}
        />
        <Path
          d="M.76,99.5h49a50.13,50.13,0,0,1,14.57-35L29.71,29.92A98.62,98.62,0,0,0,.76,99.5Z"
          transform="translate(-0.76 -0.5)"
          onClick={() => {
            console.log(7);
            setShowingInfo(!isShowingInfo);
            console.log(nodeData);
          }}
        />
        <Path
          d="M30.42,29.21,65,63.83A50.63,50.63,0,0,1,99.5,49.51V.51A100,100,0,0,0,30.42,29.21Z"
          transform="translate(-0.76 -0.5)"
          onClick={() => console.log(8)}
        />
      </MenuSVG>
      {isShowingInfo && (
        <div
          style={{
            position: 'absolute',
            top: `${position.y}px`,
            left: `${position.x}px`,
            zIndex: 200,
            backgroundColor: '#111111',
            color: '#e0e0e0'
          }}
        >
          {nodeData}
        </div>
      )}
    </div>
  );
};

RadialMenu.propTypes = {
  position: PropTypes.shape({ x: PropTypes.number, y: PropTypes.number }).isRequired,
  nodeData: PropTypes.string.isRequired
};

export default RadialMenu;
