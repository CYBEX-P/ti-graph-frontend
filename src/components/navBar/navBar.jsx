import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';
import { NavBarStyle, UnstyledButton } from '../__styles__/styles';

const NavBar = () => {
  const [apiData, setAPIData] = React.useState(null);

  axios
    .get('/api')
    .then(({ data }) => {
      setAPIData(data);
      return data;
    })
    .catch(err => console.error(err));
  return (
    <NavBarStyle>
      <UnstyledButton onClick={() => {}}>
        <FontAwesomeIcon size="lg" icon="bars" color="#e0e0e0" />
      </UnstyledButton>
      <div style={{ flexGrow: 2, textAlign: 'center' }}>ti-graph</div>
      {apiData !== null && apiData.bar}
    </NavBarStyle>
  );
};

export default NavBar;
