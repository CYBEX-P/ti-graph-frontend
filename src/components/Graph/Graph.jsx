/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useState, useContext, useEffect } from 'react';
import axios from 'axios';

import NetworkContext from '../App/NetworkContext';

const Graph = () => {
  const { network, neo4jData } = useContext(NetworkContext);
  const [selection, setSelection] = useState({ nodes: [], edges: [] });
  const [selectedNodeData, setSelectedNodeData] = useState(null);
  useEffect(() => {
    if (selection.nodes.length !== 0) {
      // Returns the id of the current node selected, not the index
      const selectedNode = selection.nodes[0];

      // Find the nodes in Neo4jData where the selected node === id
      // There should only be one node returned -- might behave weird otherwise
      const matchingNeo4jData = neo4jData.Neo4j[0][0].nodes.filter(properties => {
        return properties.id === selectedNode;
      })[0];

      const { properties } = matchingNeo4jData;
      return setSelectedNodeData(JSON.stringify(properties));
    }
    return setSelectedNodeData(null);
  }, [selection]);
  return (
    <div style={{ display: 'grid', gridTemplateRows: 'auto 40px 36px' }}>
      <div
        id="mynetwork"
        style={{
          width: '100%',
          height: '99vh',
          gridRow: '1 / span 3',
          gridColumn: 1
        }}
        onClick={() => setSelection(network.getSelection())}
      />
      <div
        style={{
          gridRow: 2,
          gridColumn: 1,
          zIndex: 5,
          justifySelf: 'center',
          alignSelf: 'center'
        }}
      >
        {selectedNodeData}
      </div>
    </div>
  );
};

export default Graph;
