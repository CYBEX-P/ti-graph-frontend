import React, { useReducer, useState, useEffect } from 'react';
import axios from 'axios';
import { Formik } from 'formik';
import * as Yup from 'yup';

import NavBar from '../navBar/navBar';
import MenuBar from '../menuBar/menuBar';
import { AppContainer, ContentContainerStyle } from '../__styles__/styles';
import MenuContext from './MenuContext';
import ModalContext from './ModalContext';
import GraphModal from '../modal/graphModal';

const InsertIPSchema = Yup.object().shape({
  // IP Validation very rough
  ipToInsert: Yup.string().matches(/^([0-9]{1,3}\.)*[0-9]{1,3}$/, 'Only allowed to insert IPv4 Addresses')
});

const App = () => {
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

  useEffect(() => {
    if (isShowingModal === 'Neo4j Data' || isExpanded === 'left') {
      axios.get('/neo4j/export').then(({ data }) => {
        setNeo4jData(data);
      });
    }
  }, [isShowingModal, isExpanded]);

  function handleInsertIP(event) {
    const { ipToInsert } = event;
    if (ipToInsert !== '') {
      axios.get(`/neo4j/insert/IP/${ipToInsert}`).catch(err => console.error(err));
    }
  }

  function handleEnrichIP(event) {
    console.log(event);
    const { enrichmentType, ipToEnrich } = event;
    if (ipToEnrich !== 'none') {
      axios.get(`/enrich/${enrichmentType}/${ipToEnrich}`);
    }
  }

  return (
    <MenuContext.Provider value={{ isExpanded, dispatchExpand }}>
      <ModalContext.Provider value={{ isShowingModal, dispatchModal }}>
        <AppContainer>
          {/* Important to have content rendered under navbar and menubar */}
          <ContentContainerStyle
            onClick={() => {
              dispatchExpand('none');
            }}
          >
            <p>Graph will go here!</p>
            {/* Modals go here */}
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
                  {/* Have to find a better way to show this */}
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
