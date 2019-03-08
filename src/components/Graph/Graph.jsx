/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useState, useContext } from 'react';
import NetworkContext from '../App/NetworkContext';

const Graph = () => {
  const { network } = useContext(NetworkContext);
  const [selection, setSelection] = useState(null);
  return (
    <div
      id="mynetwork"
      style={{
        width: '100%',
        height: '98vh'
      }}
      onClick={() => setSelection(network.getSelection())}
    />
  );
};

export default Graph;
