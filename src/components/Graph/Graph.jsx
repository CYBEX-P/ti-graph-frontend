import React, { useState, useContext, useEffect } from 'react';
import { Network } from 'vis';
import PropTypes from 'prop-types';
import { CircleLoader } from 'react-spinners';

import NetworkContext from '../App/NetworkContext';
import RadialMenu from '../radialMenu/radialMenu';

function InitializeGraph(data) {
  if (typeof data.Neo4j === 'undefined') {
    return null;
  }
  const { nodes } = data.Neo4j[0][0];
  const { edges } = data.Neo4j[1][0];
  const dataObject = { nodes, edges };

  const options = {
    layout: { improvedLayout: true },
    height: '99vh',
    nodes: {
      shape: 'circle',
      widthConstraint: 100
    },
    edges: {
      length: 200
    },
    interaction: {
      hover: true,
      hoverConnectedEdges: false
    }
  };
  const container = document.getElementById('mynetwork');
  const nw = new Network(container, dataObject, options);
  return nw;
}

const Graph = ({ isLoading }) => {
  const { neo4jData } = useContext(NetworkContext);
  const [hoverText, setHoverText] = useState(null);
  const [selection, setSelection] = useState({ nodes: [], edges: [] });
  const [radialPosition, setRadialPosition] = useState(null);
  const [eventListenersAdded, setEventListenersAdded] = useState(false);

  const [network, setNetwork] = useState(null);

  function UpdatePositions() {
    if (network === null) {
      return setRadialPosition(null);
    }
    if (typeof selection.nodes[0] === 'undefined') {
      return setRadialPosition(null);
    }
    // Returns the id of the current node selected, not the index
    const selectedNode = selection.nodes[0];
    const canvasPositions = network.getPositions(selection.nodes)[selectedNode];
    const domPositions = network.canvasToDOM(canvasPositions);
    return setRadialPosition(domPositions);
  }

  function AddEventListenersToNetwork(nw, data) {
    if (typeof data.Neo4j === 'undefined') {
      return false;
    }
    if (nw === null) {
      return false;
    }
    nw.on('hoverNode', e => {
      if (typeof data.Neo4j !== 'undefined') {
        return setHoverText({
          // Set the hover text to the properties of the data
          text: JSON.stringify(data.Neo4j[0][0].nodes.filter(properties => properties.id === e.node)[0].properties),
          x: e.event.clientX,
          y: e.event.clientY
        });
      }
      return setHoverText(null);
    });
    nw.on('blurNode', () => setHoverText(null));
    nw.on('deselectNode', () => setSelection(nw.getSelection()));
    nw.on('selectNode', () => {
      setSelection(nw.getSelection());
    });
    nw.on('dragStart', () => {
      setRadialPosition(null);
    });
    nw.on('dragEnd', () => {
      if (selection !== null) {
        setSelection(null);
        nw.unselectAll();
      }
    });
    nw.on('zoom', () => {
      setRadialPosition(null);
      if (selection !== null) {
        nw.unselectAll();
        setSelection(null);
      }
    });
    return true;
  }

  useEffect(() => {
    if (typeof neo4jData.Neo4j !== 'undefined') {
      setNetwork(InitializeGraph(neo4jData));
      setEventListenersAdded(false);
      setRadialPosition(null);
    }
  }, [neo4jData]);

  useEffect(() => {
    if (eventListenersAdded === false) {
      setEventListenersAdded(AddEventListenersToNetwork(network, neo4jData));
    }
  }, [network, neo4jData]);

  useEffect(() => {
    if (selection === null) {
      return setRadialPosition(null);
    }
    if (selection.nodes.length !== 0) {
      return UpdatePositions();
    }
    return setRadialPosition(null);
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
      {radialPosition && (
        <RadialMenu
          icons={['info-circle', 'edit']}
          position={radialPosition}
          onClickFunctions={[() => {}]}
          network={network}
          scale={network.getScale()}
        />
      )}
      {hoverText && (
        <div
          style={{
            position: 'absolute',
            zIndex: 1000,
            top: hoverText.y,
            left: hoverText.x,
            backgroundColor: '#111',
            color: '#fff',
            pointerEvents: 'none'
          }}
        >
          {hoverText.text}
        </div>
      )}
    </div>
  );
};

Graph.propTypes = {
  isLoading: PropTypes.bool.isRequired
};

export default Graph;
