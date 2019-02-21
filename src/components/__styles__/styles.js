import styled from 'styled-components';

// Theme colors
const primaryBlue = '#1565cd';
const secondaryGrey = '#e0e0e0';

const GridBody = styled.div`
  display: grid;
  grid-template-columns: ${() => (window.innerWidth < 500 ? '16px 4fr 16px' : '1fr 4fr 1fr')};
  justify-items: center;
  line-height: 1.4;
  margin-bottom: 56px;
`;

const SplashScreenBody = styled.div`
  display: grid;
  grid-template-rows: minmax(200px, 50vh) minmax(200px, 50vh);
  align-items: center;
  background-color: ${primaryBlue};
  color: ${secondaryGrey};
  line-height: 1.4;
  text-align: center;
  grid-columns: 100vw;
  justify-items: center;
  cursor: wait;
`;

const NavBarStyle = styled.nav`
  width: 100%;
  background-color: ${primaryBlue};
  height: 56px;
  position: absolute;
  display: flex;
  align-items: center;
  color: ${secondaryGrey};
`;

const UnstyledButton = styled.button`
  display: inline-block;
  border: none;
  padding: none;
  margin: none;
  background: ${props => props.color || 'none'};
  text-align: center;
`;

export { GridBody, SplashScreenBody, NavBarStyle, UnstyledButton };
