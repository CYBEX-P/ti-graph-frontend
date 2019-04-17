import React, { useContext, useState } from 'react';
import { Input, Label, Form } from 'reactstrap';
import axios from 'axios';
import NetworkContext from '../App/NetworkContext';
import {Row, Col} from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Button from '../Button/Button';

const FormRow = (props) => {
   return (
        <Row>
            <Col sm={{size: 4}} style={{justifyContent: 'right'}}>
                <select
                style={{ width: '42%', height: '36px', backgroundColor: '#ffffff', color: '#222222', marginTop: 5, justifyContent: 'right' }}
                name="IOCType"
                id={`type-${props.id}`}
                >
                {props.config.types.map(item => (
                    <option value={item} label={item} key={item}>
                    {item}
                    </option>
                ))}
                </select>
            </Col>
            <Col sm={{size: 6, offset: 1}}>
                <Input placeholder="Value" name="ipToInsert" style={{marginTop:'5px'}} id={`ioc-${props.id}`}/>
            </Col>
        </Row> 
   ); 
};

const EventInsertForm = props => {
  const { neo4jData, setNeo4jData } = useContext(NetworkContext);
  const [ eventData, setEventData ]  = useState("");

  function handleEventInsert(Eventname) {
    axios.post('/event/start', {name: Eventname}).then(({ data }) => {
      console.log(data);
    });
  }
 
  return (
    <>
      <Form onSubmit = {(e) => {console.log(e)}}>
        <Row>
            <Label>Event Name:</Label>
            <Input type="text" placeholder="Enter Event Name Here" 
                   style={{width:'81%', marginLeft: '15px'}} 
                   id = "eventNameInput"/>
        </Row>
        <br/>
        <FormRow config = {props.config} id = 'event-row-1'/>
        <FormRow config = {props.config} id = 'event-row-2'/>
        <FormRow config = {props.config} id = 'event-row-3'/>
        <FormRow config = {props.config} id = 'event-row-4'/>
        <FormRow config = {props.config} id = 'event-row-5'/>
        <br/>
        <Row>
            <Col sm={{size: 3}}>
                <Button width="58%" onClickFunction={() => {alert("Add Row Button Clicked")}}>
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
      </Form>
    </>
  );
};

export default EventInsertForm;
