/**
 * This is a HOC for the radial menu.
 * See:
 * https://reactjs.org/docs/higher-order-components.html
 */

import React from 'react';
import axios from 'axios';

function withNodeType(RadialMenuComponent, nodeType, setNeo4jData, config) {
  if (nodeType === null) {
    return <></>;
  }

  function EnrichIPbyType(type) {
    axios.get(`/enrich/${type}/${nodeType.IP}`).then(({ data }) => {
      if (data['insert status'] !== 0) {
        axios.get('neo4j/export').then(response => {
          setNeo4jData(response.data);
        });
      }
    });
  }

  function EnrichIPAll() {
    config.enrichments.SrcIP.map(enrichmentType => {
      axios.get(`/enrich/${enrichmentType}/${nodeType.IP}`).then(({ data }) => {
        if (data['insert status'] !== 0) {
          axios.get('neo4j/export').then(response => {
            setNeo4jData(response.data);
          });
        }
      });
      return true;
    });
  }

  let icons = [];
  let onClickFns = [];
  let titles = [];
  if (Object.keys(nodeType)[0] === 'IP') {
    // We could probably find a way to do this by YAML instead of hardcoding it
    onClickFns = config.enrichments.SrcIP.map(enrichmentType => () => {
      return EnrichIPbyType(enrichmentType);
    });
    // Copy arrays
    titles = config.enrichments.SrcIP.map(val => val);
    icons = config.enrichments.SrcIP.map(val => val);
    titles.push('all');
    icons.push('all');
    onClickFns.push(() => EnrichIPAll());
  }
  return props => {
    return <RadialMenuComponent titles={titles} icons={icons} onClickFunctions={onClickFns} {...props} />;
  };
}

export default withNodeType;
