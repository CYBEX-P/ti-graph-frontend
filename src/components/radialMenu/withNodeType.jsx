/**
 * This is a HOC for the radial menu.
 * See:
 * https://reactjs.org/docs/higher-order-components.html
 */

import React from 'react';
import axios from 'axios';

function withNodeType(RadialMenuComponent, nodeType, setNeo4jData) {
  if (nodeType === null) {
    return <></>;
  }

  // TODO: Add Error Handling to these somehow
  function EnrichIPbyType(type) {
    axios.get(`/enrich/${type}/${nodeType.IP}`).then(({ data }) => {
      if (data['insert status'] !== 0) {
        axios.get('neo4j/export').then(response => {
          setNeo4jData(response.data);
        });
      }
    });
  }

  let icons = [];
  let onClickFns = [];
  let titles = [];
  if (Object.keys(nodeType)[0] === 'IP') {
    icons = ['server'];
    onClickFns = [
      () => {
        EnrichIPbyType('asn');
      }
    ];
    titles = ['asn'];
  }
  return props => {
    return <RadialMenuComponent titles={titles} icons={icons} onClickFunctions={onClickFns} {...props} />;
  };
}

export default withNodeType;
