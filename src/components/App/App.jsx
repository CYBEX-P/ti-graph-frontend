import React, { useReducer, useState, useEffect } from 'react';
import axios from 'axios';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { Network } from 'vis';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import NavBar from '../navBar/navBar';
import MenuBar from '../menuBar/menuBar';
import { AppContainer, ContentContainerStyle, GraphMenuInputStyle } from '../__styles__/styles';
import MenuContext from './MenuContext';
import ModalContext from './ModalContext';
import GraphModal from '../modal/graphModal';
import Graph from '../Graph/Graph';
import NetworkContext from './NetworkContext';
import Button from '../Button/Button';

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
  const network = new Network(container, dataObject, options);
  return network;
}

const App = () => {
  const [isExpanded, dispatchExpand] = useReducer((_, action) => {
    if (action === 'left' || action === 'right' || action === 'bottom' || action === 'top') {
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

  const [network, setNetwork] = useState(null);

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
      axios.get(`/enrich/${enrichmentType}/${ipToEnrich}`).then(({ data }) => {
        if (data['insert status'] !== 0) {
          axios.get('neo4j/export').then(response => {
            setNeo4jData(response.data);
          });
        } else {
          // Switch this to a modal
          alert(`${enrichmentType} lookup returned nothing.`);
        }
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
      setNetwork(UpdateGraph(neo4jData));
    }
  }, [neo4jData]);

  return (
    <MenuContext.Provider value={{ isExpanded, dispatchExpand }}>
      <ModalContext.Provider value={{ isShowingModal, dispatchModal }}>
        <NetworkContext.Provider value={{ network, neo4jData }}>
          <AppContainer>
            <ContentContainerStyle>
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
            </MenuBar>
            <MenuBar side="right" icon="edit">
              <div
                style={{
                  width: '100%',
                  height: '100%',
                  backgroundColor: '#e0e0e0',
                  display: 'grid',
                  gridTemplateRows: '150px 110px 70px auto',
                  justifyContent: 'center',
                  gridTemplateColumns: '80%'
                }}
              >
                <Formik
                  onSubmit={handleInsertIP}
                  validationSchema={InsertIPSchema}
                  initialValues={{ ipToInsert: '' }}
                  render={({ handleChange, errors, values, handleSubmit }) => (
                    <form onSubmit={handleSubmit}>
                      <GraphMenuInputStyle
                        placeholder="IP Address"
                        name="ipToInsert"
                        value={values.ipToInsert}
                        onChange={handleChange}
                      />
                      <Button width="100%" hasIcon type="submit" onClickFunction={() => {}}>
                        <FontAwesomeIcon size="lg" icon="plus-circle" />
                        <div>Insert IP</div>
                      </Button>
                      <div style={{ color: '#ff4500' }}>{errors.ipToInsert}</div>
                    </form>
                  )}
                />
                <Formik
                  onSubmit={handleEnrichIP}
                  initialValues={{ ipToEnrich: 'none', enrichmentType: 'asn' }}
                  render={({ values, handleChange, handleSubmit }) => (
                    <form onSubmit={handleSubmit}>
                      <select
                        style={{ width: '30%', height: '36px', backgroundColor: '#ffffff', color: '#222222' }}
                        name="enrichmentType"
                        value={values.enrichmentType}
                        onChange={handleChange}
                      >
                        <option value="asn">asn</option>
                        <option value="gip">gip</option>
                        <option value="hostname">hostname</option>
                        <option value="whois">whois</option>
                      </select>
                      <select
                        style={{ width: '70%', height: '36px', color: '#222222', backgroundColor: '#ffffff' }}
                        name="ipToEnrich"
                        value={values.ipToEnrich}
                        onChange={handleChange}
                      >
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
                      <Button width="100%" type="submit" onClickFunction={() => {}}>
                        Enrich IP
                      </Button>
                    </form>
                  )}
                />
                <Button width="100%" 
                onClickFunction={() => axios.get('/enrich/all').then(() => {
                          axios.get('/neo4j/export').then(({ data }) => {
                            setNeo4jData(data);
                          });
                  })}>
                  Enrich All
                </Button>
              </div>
            </MenuBar>
            <MenuBar side="bottom" icon="list">
              <div
                style={{
                  display: 'grid',
                  flexWrap: 'wrap',
                  height: '100%',
                  width: '100%',
                  backgroundColor: '#e0e0e0',
                  gridTemplateRows: '70px 70px auto',
                  gridTemplateColumns: '50% 50%',
                  justifyContent: 'center'
                }}
              >
                <div style={{ gridColumn: '1 / span 2' }}>
                  <Button width="100%" hasIcon onClickFunction={() => {}}>
                    <FontAwesomeIcon size="lg" icon="server" />
                    Database Management
                  </Button>
                </div>
                <div style={{ gridColumn: 1 }}>
                  <Button width="40%" type="button" onClickFunction={() => dispatchModal('Neo4j Data')}>
                    Neo4j Data
                  </Button>
                </div>
                <div style={{ gridColumn: 2 }}>
                  <Button
                    type="button"
                    onClickFunction={() => {
                      axios.get('/neo4j/wipe').then(() => {
                        axios.get('/neo4j/export').then(({ data }) => {
                          setNeo4jData(data);
                        });
                      });
                    }}
                    width="40%"
                  >
                    Wipe DB
                  </Button>
                </div>
              </div>
            </MenuBar>
          </AppContainer>
        </NetworkContext.Provider>
      </ModalContext.Provider>
    </MenuContext.Provider>
  );
};

export default App;
