import React, { useContext, useState } from 'react';
import { Input, Label } from 'reactstrap';
import axios from 'axios';
import NetworkContext from '../App/NetworkContext';
import {Row, Col} from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Button from '../Button/Button';
import { Formik } from 'formik';
import ModalContext from '../App/ModalContext';


const EventInsertForm = props => {
  const { neo4jData, setNeo4jData } = useContext(NetworkContext);
  const [ isAddRow, setAddRow ] = useState(false);
  const { isShowingModal, dispatchModal } = useContext(ModalContext);

  function handleInsertIP(values, actions) {
    console.log(values);
    if (values.ipToInsert !== '') {
      axios.post(`/event/start`, values).then(() => {
        axios
          .get('neo4j/export')
          .then(({ data }) => {
            setNeo4jData(data);
          })
          .catch(() => {});
      });
    }
    actions.resetForm();
    dispatchModal(false);
  }

  const formRow = (props) => {
    return (
      <Formik
      onSubmit={handleInsertIP}
      initialValues={{ dataToInsert: '', IOCType: 'SrcIP', eventName: '' }}
      render={({ handleChange, errors, values, handleSubmit }) => ( 
        <form onSubmit={handleSubmit}>  
        <Row>
          <Col sm={{size: 4}} style={{justifyContent: 'right'}}>
            <select
            style={{ width: '42%', height: '36px', backgroundColor: '#ffffff', color: '#222222', marginTop: 5, justifyContent: 'right' }}
            name="IOCType"
            value={values.IOCType}
            id="type-1"
            onChange={handleChange}
            >
            {props.config.types.map(item => (
                <option value={item} label={item} key={item}>
                {item}
                </option>
            ))}
            </select>
          </Col>
          <Col sm={{size: 6, offset: 1}}>
            <Input placeholder="IP Address" name="dataToInsert" value={values.dataToInsert} onChange={handleChange} />
          </Col>
        </Row>
        </form>
      )}
      />
    );
  };

 
  return (
    <>
      <Formik
        onSubmit={handleInsertIP}
        initialValues={{ dataToInsert: '', IOCType: 'SrcIP', eventName: '' }}
        render={({ handleChange, errors, values, handleSubmit }) => ( 
          <form onSubmit={handleSubmit}>
            <Row>
                <Label>Event Name:</Label>
                <Input type="text" placeholder="Enter Event Name Here" 
                      style={{width:'81%', marginLeft: '15px'}} 
                      id = "eventNameInput"
                      name = "eventName"
                      value={values.eventName}
                      onChange={handleChange}
                      />
            </Row>
            <br/>
            <Row>
              <Col sm={{size: 4}} style={{justifyContent: 'right'}}>
                  <select
                  style={{ width: '42%', height: '36px', backgroundColor: '#ffffff', color: '#222222', marginTop: 5, justifyContent: 'right' }}
                  name="IOCType"
                  value={values.IOCType}
                  id="type-1"
                  onChange={handleChange}
                  >
                  {props.config.types.map(item => (
                      <option value={item} label={item} key={item}>
                      {item}
                      </option>
                  ))}
                  </select>
              </Col>
              <Col sm={{size: 6, offset: 1}}>
              <Input placeholder="IP Address" name="dataToInsert" value={values.dataToInsert} onChange={handleChange} />
              </Col>
            </Row>
            <br/>
            {
              isAddRow?<formRow config={props.config}/>:<div></div>
            }
            <Row>
              <Col sm={{size: 3}}>
                  <Button width="58%" onClickFunction={() => {}}>
                      <div>Add Row</div>
                  </Button>     
              </Col>

              <Col sm={{size: 6, offset: 3}}>
                  <Button width="60%" hasIcon type="submit" onClickFunction = {() => {setAddRow(true)}}>
                      <FontAwesomeIcon size="lg" icon="plus-circle" />
                      <div>Start Investigation</div>
                  </Button>   
              </Col> 
            </Row> 
          </form>
        )}
      /> 
    </>
  );
};

export default EventInsertForm;
