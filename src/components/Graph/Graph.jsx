import React, { useState, useContext, useEffect } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { FadeLoader } from 'react-spinners';

import NetworkContext from '../App/NetworkContext';
import Button from '../Button/Button';

const NodeInfoDiv = styled.div`
  background-color: #c0c0c0cc;
  height: 200px;
  width: 250px;
  position: absolute;
  top: ${({ position }) => Math.round(position.y)}px;
  left: ${({ position }) => Math.round(position.x) + 50}px;
  display: grid;
  grid-template-rows: auto 70px;
  border-radius: 4px;
  border: 1px solid #c0c0c0;
  justify-content: center;
  z-index: 2;
  pointer-events: none;
  box-shadow: 1px 1px 4px 2px #11111155;
`;

const Graph = ({ isLoading }) => {
  const { network, neo4jData } = useContext(NetworkContext);
  const [selection, setSelection] = useState({ nodes: [], edges: [] });
  const [infoPositions, setInfoPositions] = useState(null);
  const [selectedNodeData, setSelectedNodeData] = useState(null);
  useEffect(() => {
    if (selection.nodes.length !== 0) {
      // Returns the id of the current node selected, not the index
      const selectedNode = selection.nodes[0];
      const canvasPositions = network.getPositions(selection.nodes)[selectedNode];
      const domPositions = network.canvasToDOM(canvasPositions);
      // Find the nodes in Neo4jData where the selected node === id
      // There should only be one node returned -- might behave weird otherwise
      const matchingNeo4jData = neo4jData.Neo4j[0][0].nodes.filter(properties => {
        return properties.id === selectedNode;
      })[0];

      const { properties } = matchingNeo4jData;
      if (infoPositions !== null && domPositions.x === infoPositions.x && domPositions.y === infoPositions.y) {
        setInfoPositions(null);
      } else {
        setInfoPositions(domPositions);
      }
      return setSelectedNodeData(`${JSON.stringify(properties)}`);
    }
    setInfoPositions(null);
    return setSelectedNodeData(null);
  }, [selection]);
  return (
    <div style={{ display: 'grid', gridTemplateRows: '56px auto' }}>
      <div
        id="mynetwork"
        role="presentation"
        style={{
          width: '100%',
          height: '99vh',
          gridRow: '1 / span 2',
          gridColumn: 1,
          zIndex: 2,
          display: 'grid'
        }}
        onClick={() => network !== null && setSelection(network.getSelection())}
      />
      {isLoading && (
        <div
          style={{
            gridRow: '2',
            gridColumn: 1,
            backgroundColor: '#e0e0e0dd',
            zIndex: 10,
            display: 'grid'
          }}
        >
          <div style={{ justifySelf: 'center', alignSelf: 'end', fontSize: '24px', width: '80px' }}>Loading</div>
          <div
            style={{
              alignSelf: 'start',
              justifySelf: 'center'
            }}
          >
            <FadeLoader color="#00cbcc" />
          </div>
        </div>
      )}
      {infoPositions && (
        <NodeInfoDiv position={infoPositions}>
          <div style={{ backgroundColor: '#d0d0d0ce', width: '250px' }}>{selectedNodeData}</div>
          <div style={{ pointerEvents: 'auto', justifySelf: 'center' }}>
            <Button width="100%" onClickFunction={() => {}}>
              Enrich Node
            </Button>
          </div>
        </NodeInfoDiv>
      )}
    </div>
  );
};

Graph.propTypes = {
  isLoading: PropTypes.bool.isRequired
};

export default Graph;
