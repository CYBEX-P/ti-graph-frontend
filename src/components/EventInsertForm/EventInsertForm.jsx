import React, { useContext, useState } from 'react';
import { Input, Label } from 'reactstrap';
import axios from 'axios';
import NetworkContext from '../App/NetworkContext';
import {Row, Col} from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Button from '../Button/Button';
import { Formik } from 'formik';
import ModalContext from '../App/ModalContext';
import EventContext from '../App/EventContext';


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
  
      axios.get(`/event/getName`).then(({data}) => {
        
      })

    }
    actions.resetForm();
    dispatchModal(false);
  }

  function handleInsertFile(values, actions) {
    console.log(values);
    const formData = new FormData();
    formData.append("file", values.file);

    axios.post(`/event/start/file`, formData)
    .then(({data}) => {
      console.log(data)
    })

    actions.resetForm();
    dispatchModal(false);
  } 




  const formRow = (props) => {
    return (
      <Formik
      onSubmit={handleInsertIP}
      initialValues={{ dataToInsert: '', IOCType: 'IP', eventName: '' }}
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
            <Input placeholder="IOC Value" name="dataToInsert" value={values.dataToInsert} onChange={handleChange} />
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
        initialValues={{ dataToInsert1: '', IOCType1: 'IP', dataToInsert2: '', IOCType2: 'IP', dataToInsert3: '', IOCType3: 'IP' }}
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
                  name="IOCType1"
                  value={values.IOCType1}
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
              <Input placeholder="IOC Value" name="dataToInsert1" value={values.dataToInsert1} onChange={handleChange} />
              </Col>
            </Row>
            <Row>
              <Col sm={{size: 4}} style={{justifyContent: 'right'}}>
                  <select
                  style={{ width: '42%', height: '36px', backgroundColor: '#ffffff', color: '#222222', marginTop: 5, justifyContent: 'right' }}
                  name="IOCType2"
                  value={values.IOCType2}
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
              <Input placeholder="IOC Value" name="dataToInsert2" value={values.dataToInsert2} onChange={handleChange} />
              </Col>
            </Row>
            <Row>
              <Col sm={{size: 4}} style={{justifyContent: 'right'}}>
                  <select
                  style={{ width: '42%', height: '36px', backgroundColor: '#ffffff', color: '#222222', marginTop: 5, justifyContent: 'right' }}
                  name="IOCType3"
                  value={values.IOCType3}
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
              <Input placeholder="IOC Value" name="dataToInsert3" value={values.dataToInsert3} onChange={handleChange} />
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
                  <Button width="60%" hasIcon type="submit" onClickFunction = {() => {}}>
                      <FontAwesomeIcon size="lg" icon="plus-circle" />
                      <div>Start Investigation</div>
                  </Button>   
              </Col> 
            </Row> 
          </form>
        )}
      />
      <br/>
      <Formik
        onSubmit={handleInsertFile}
        initialValues={{ file: '' }}
        render={({values, handleSubmit, setFieldValue }) => ( 
        <form onSubmit={handleSubmit}>
          <Row>
            <Col sm={{size: 3, offset: 3}}>
              <Label for="file">File</Label>
              <Input type="file" name="file" id="file" onChange={(event) => {
                setFieldValue("file", event.currentTarget.files[0]);
              }}/>
            </Col>
            <Col sm={{size: 6, offset: 3}}>
                  <Button width="60%" hasIcon type="submit" onClickFunction = {() => {}}>
                      <div>Start Investigation From File</div>
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
