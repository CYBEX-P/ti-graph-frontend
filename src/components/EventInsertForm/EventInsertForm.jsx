import React, { useContext } from 'react';
import { Input, Label } from 'reactstrap';
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
                >
                {props.config.types.map(item => (
                    <option value={item} label={item} key={item}>
                    {item}
                    </option>
                ))}
                </select>
            </Col>
            <Col sm={{size: 6, offset: 1}}>
                <Input placeholder="Value" name="ipToInsert" style={{marginTop:'5px'}}/>
            </Col>
        </Row> 
   ); 
};

const EventInsertForm = props => {
  const { neo4jData, setNeo4jData } = useContext(NetworkContext);

  function handleInsertIP(values, actions) {
    const { ipToInsert } = values;
    if (ipToInsert !== '') {
      axios.get(`/neo4j/insert/IP/${ipToInsert}`).then(() => {
        axios
          .get('neo4j/export')
          .then(({ data }) => {
            setNeo4jData(data);
          })
          .catch(() => {});
      });
    }
    actions.resetForm();
  }
 
  return (
    <>
      <Row>
        <Label>Event Name:</Label>
        <Input type="text" placeholder="Enter Event Name Here" style={{width:'81%', marginLeft: '15px'}}/>
      </Row>
      <br/>
      <FormRow config = {props.config} id = '1'/>
      <FormRow config = {props.config} id = '2'/>
      <FormRow config = {props.config} id = '3'/>
      <br/>
      <Row>
        <Col sm={{size: 3}}>
            <Button width="80%" onClickFunction={() => {alert("Button Clicked")}}>
                <div>Add Row</div>
            </Button>     
        </Col>

        <Col sm={{size: 6, offset: 6}}>
            <Button width="80%" hasIcon type="submit" onClickFunction={() => {}}>
                <FontAwesomeIcon size="lg" icon="plus-circle" />
                <div>Start Investigation</div>
            </Button>   
        </Col> 
      </Row>
    </>
  );
};

export default EventInsertForm;
