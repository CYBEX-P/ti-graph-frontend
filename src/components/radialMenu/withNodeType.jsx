/**
 * This is a HOC for the radial menu.
 * See:
 * https://reactjs.org/docs/higher-order-components.html
 */

import React from 'react';

function withNodeType(RadialMenuComponent, nodeType) {
  let icons = [];
  let onClickFns = [];
  if (nodeType === 'IP') {
    icons = ['info-circle'];
    onClickFns = [
      () => {
        console.log(nodeType);
      }
    ];
  }
  return props => {
    return <RadialMenuComponent icons={icons} onClickFunctions={onClickFns} {...props} />;
  };
}

export default withNodeType;
