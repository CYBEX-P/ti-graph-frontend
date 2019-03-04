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
    if (isShowingModal === 'Neo4j Data') {
      axios.get('/neo4j/export').then(({ data }) => {
        setNeo4jData(data);
      });
    }
  }, [isShowingModal]);

  function handleInsertIP({ ipToInsert }) {
    console.log(ipToInsert);
    axios.get(`/neo4j/insert/IP/${ipToInsert}`).catch(err => console.error(err));
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
            <div id="mynetwork">Graph will go here!</div>
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
