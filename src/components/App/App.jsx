import React, { useReducer, useState, useEffect } from 'react';
import axios from 'axios';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { Network } from 'vis';

import NavBar from '../navBar/navBar';
import MenuBar from '../menuBar/menuBar';
import { AppContainer, ContentContainerStyle } from '../__styles__/styles';
import MenuContext from './MenuContext';
import ModalContext from './ModalContext';
import GraphModal from '../modal/graphModal';
import Graph from '../Graph/Graph';

const InsertIPSchema = Yup.object().shape({
  // IP Validation very rough
  ipToInsert: Yup.string().matches(/^([0-9]{1,3}\.)*[0-9]{1,3}$/, 'Only allowed to insert IPv4 Addresses')
});

function UpdateGraph(data) {
  const { nodes } = data.Neo4j[0][0];
  const { edges } = data.Neo4j[1][0];
  const dataObject = { nodes, edges };

  const options = { layout: { improvedLayout: false } };
  const container = document.getElementById('mynetwork');
  (() => new Network(container, dataObject, options))();
}

const App = () => {
  /**
   * We should make it so that when we insert a node, we check /export
   * until we find that the data updated.
   */

  const [isExpanded, dispatchExpand] = useReducer((_, action) => {
    if (action === 'left' || action === 'right' || action === 'bottom') {
      return action;
    }
    return 'none';
  }, 'none');

  const [isShowingModal, dispatchModal] = useReducer((state, action) => {
    if (state === action) {
      return state;
    }
    return action;
  }, false);

  const [neo4jData, setNeo4jData] = useState('');

  function handleInsertIP(values, actions) {
    const { ipToInsert } = values;
    if (ipToInsert !== '') {
      axios.get(`/neo4j/insert/IP/${ipToInsert}`).then(() => {
        axios.get('neo4j/export').then(({ data }) => {
          setNeo4jData(data);
        });
      });
    }
    actions.resetForm();
  }

  function handleEnrichIP(values, actions) {
    const { enrichmentType, ipToEnrich } = values;
    if (ipToEnrich !== 'none') {
      axios.get(`/enrich/${enrichmentType}/${ipToEnrich}`).then(() => {
        axios.get('neo4j/export').then(({ data }) => {
          setNeo4jData(data);
        });
      });
    }
    actions.resetForm();
  }

  // Get data on first render
  useEffect(() => {
    axios.get('/neo4j/export').then(({ data }) => {
      setNeo4jData(data);
    });
  }, []);

  // Update graph whenever data updates
  useEffect(() => {
    if (neo4jData !== '') {
      UpdateGraph(neo4jData);
    }
  }, [neo4jData]);

  return (
    <MenuContext.Provider value={{ isExpanded, dispatchExpand }}>
      <ModalContext.Provider value={{ isShowingModal, dispatchModal }}>
        <AppContainer>
          <ContentContainerStyle
            onClick={() => {
              dispatchExpand('none');
            }}
            side={isExpanded}
          >
            <Graph />
            <GraphModal title="example" contentLabel="Example Modal">
              <div>Content will go here soon!</div>
            </GraphModal>
            <GraphModal title="Neo4j Data" contentLabel="Neo4j Data">
              <div>{JSON.stringify(neo4jData)}</div>
            </GraphModal>
          </ContentContainerStyle>
          <NavBar />
          <MenuBar side="left" icon="search">
            <button
              type="button"
              onClick={() => {
                dispatchModal('example');
              }}
            >
              Press to make a modal appear
            </button>
            <Formik
              onSubmit={handleInsertIP}
              validationSchema={InsertIPSchema}
              initialValues={{ ipToInsert: '' }}
              render={({ handleChange, errors, values, handleSubmit }) => (
                <form onSubmit={handleSubmit}>
                  <input name="ipToInsert" value={values.ipToInsert} onChange={handleChange} />
                  <button type="submit" disabled={!(errors.ipToInsert === undefined)}>
                    Insert IP
                  </button>
                  <div>{errors.ipToInsert}</div>
                </form>
              )}
            />
            <Formik
              onSubmit={handleEnrichIP}
              initialValues={{ ipToEnrich: '', enrichmentType: 'asn' }}
              render={({ values, handleChange, handleSubmit }) => (
                <form onSubmit={handleSubmit}>
                  <select name="enrichmentType" value={values.enrichmentType} onChange={handleChange}>
                    <option value="asn">asn</option>
                    <option value="gip">gip</option>
                    <option value="hostname">hostname</option>
                    <option value="whois">whois</option>
                  </select>
                  <select name="ipToEnrich" value={values.ipToEnrich} onChange={handleChange}>
                    <option value="none">None</option>
                    {neo4jData &&
                      neo4jData.Neo4j[0].map(({ nodes }) =>
                        nodes.map(({ properties, id }) => {
                          return (
                            properties.IP && (
                              <option key={id} value={properties.IP} label={properties.IP}>
                                {properties.IP}
                              </option>
                            )
                          );
                        })
                      )}
                  </select>
                  <br />
                  <button type="submit">Enrich IP</button>
                </form>
              )}
            />
          </MenuBar>
          <MenuBar side="right" icon="history">
            <div>Hello</div>
          </MenuBar>
          <MenuBar side="bottom" icon="list">
            <button type="button" onClick={() => dispatchModal('Neo4j Data')}>
              Neo4j Data
            </button>
            <button
              type="button"
              onClick={() => {
                axios.get('/neo4j/wipe');
              }}
            >
              Wipe DB
            </button>
          </MenuBar>
        </AppContainer>
      </ModalContext.Provider>
    </MenuContext.Provider>
  );
};

export default App;
