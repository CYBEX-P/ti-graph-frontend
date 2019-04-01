import React, { useContext } from 'react';
import { Formik } from 'formik';
import { Input } from 'reactstrap';
import axios from 'axios';
import * as Yup from 'yup';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Button from '../../Button/Button';
import NetworkContext from '../../App/NetworkContext';

const InsertIPSchema = Yup.object().shape({
  // IP Validation very rough
  ipToInsert: Yup.string().matches(/^([0-9]{1,3}\.)*[0-9]{1,3}$/, 'Only allowed to insert IPv4 Addresses')
});

const InsertForm = props => {
  const { setNeo4jData } = useContext(NetworkContext);

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
    <Formik
      onSubmit={handleInsertIP}
      validationSchema={InsertIPSchema}
      initialValues={{ ipToInsert: '', IOCType: 'SrcIP' }}
      render={({ handleChange, errors, values, handleSubmit }) => (
        <form onSubmit={handleSubmit}>
          <select
            style={{ width: '100%', height: '36px', backgroundColor: '#ffffff', color: '#222222' }}
            name="IOCType"
            value={values.IOCType}
            onChange={e => {
              handleChange(e);
            }}
          >
            {props.config.types.map(item => (
              <option value={item} label={item} key={item}>
                {item}
              </option>
            ))}
          </select>
          {}
          <Input placeholder="IP Address" name="ipToInsert" value={values.ipToInsert} onChange={handleChange} />
          <Button width="100%" hasIcon type="submit" onClickFunction={() => {}}>
            <FontAwesomeIcon size="lg" icon="plus-circle" />
            <div>Insert IP</div>
          </Button>
          <div style={{ color: '#ff4500' }}>{errors.ipToInsert}</div>
        </form>
      )}
    />
  );
};

export default InsertForm;
