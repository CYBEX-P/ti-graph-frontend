import React, { useState, useContext, useEffect } from 'react';
import PropTypes from 'prop-types';
import { CircleLoader } from 'react-spinners';

import NetworkContext from '../App/NetworkContext';
import RadialMenu from '../radialMenu/radialMenu';

const Graph = ({ isLoading }) => {
  const { network, neo4jData } = useContext(NetworkContext);
  const [selection, setSelection] = useState({ nodes: [], edges: [] });
  const [infoPositions, setInfoPositions] = useState(null);
  const [selectedNodeData, setSelectedNodeData] = useState(null);
  const [isShowingNodeData, setShowingNodeData] = useState(false);
  useEffect(() => {
    if (selection.nodes.length !== 0) {
      // Returns the id of the current node selected, not the index
      const selectedNode = selection.nodes[0];
      const canvasPositions = network.getPositions(selection.nodes)[selectedNode];
      const domPositions = network.canvasToDOM(canvasPositions);
      // Find the nodes in Neo4jData where the selected node === id
      // There should only be one node returned -- might behave weird otherwise
      const matchingNeo4jData = neo4jData.Neo4j[0][0].nodes.filter(properties => properties.id === selectedNode)[0];

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
          height: '100vh',
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
            <CircleLoader color="#00cbcc" />
          </div>
        </div>
      )}
      {infoPositions && (
        <RadialMenu
          icons={['info-circle', 'edit']}
          position={infoPositions}
          onClickFunctions={[
            () => setShowingNodeData(!isShowingNodeData),
            () => console.log(2),
            () => console.log(3),
            () => console.log(4),
            () => console.log(5),
            () => console.log(6),
            () => console.log(7),
            () => console.log(8)
          ]}
        />
      )}
      {isShowingNodeData && infoPositions && (
        <div
          style={{
            position: 'absolute',
            left: `${infoPositions.x}px`,
            top: `${infoPositions.y}px`,
            zIndex: 5,
            backgroundColor: '#111',
            color: '#fff',
            pointerEvents: 'none'
          }}
        >
          {selectedNodeData}
        </div>
      )}
    </div>
  );
};

Graph.propTypes = {
  isLoading: PropTypes.bool.isRequired
};

export default Graph;
