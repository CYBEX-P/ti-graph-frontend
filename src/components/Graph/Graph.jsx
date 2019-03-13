/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useState, useContext, useEffect } from 'react';
import axios from 'axios';

import NetworkContext from '../App/NetworkContext';

const Graph = () => {
  const { network } = useContext(NetworkContext);
  const [selection, setSelection] = useState({ nodes: [], edges: [] });
  const [selectedNodeData, setSelectedNodeData] = useState(null);
  useEffect(() => {
    if (selection.nodes.length !== 0) {
      // Returns the id of the current node selected, not the index
      const selectedNode = selection.nodes[0];
      axios.get(`/details/${selectedNode}`).then(({ data }) => setSelectedNodeData(JSON.stringify(data)));
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
