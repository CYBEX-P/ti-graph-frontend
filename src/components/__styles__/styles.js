import styled from 'styled-components';

// Theme colors
const primaryBlue = '#1565cd';
const primaryDarkBlue = '#003c8f';
const secondaryGrey = '#e0e0e0';

const AppContainer = styled.div`
  height: 100vh;
  width: 100%;
  display: grid;
  grid-template-columns: 36px 300px auto 300px 36px;
  grid-template-rows: 56px 200px auto 200px 36px;
`;

const SplashScreenBody = styled.div`
  display: grid;
  grid-template-rows: minmax(200px, 50vh) minmax(200px, 50vh);
  align-items: center;
  background-color: ${primaryBlue};
  color: ${secondaryGrey};
  line-height: 1.4;
  text-align: center;
  justify-items: center;
  cursor: wait;
`;

const NavBarStyle = styled.nav`
  width: 100%;
  background-color: ${primaryBlue};
  height: 56px;
  grid-column: 1 / span 5;
  grid-row: 1;
  display: flex;
  align-items: center;
  color: ${secondaryGrey};
`;

const UnstyledButton = styled.button`
  display: inline-block;
  border: none;
  margin: 0;
  background: ${props => props.color || 'none'};
  text-align: center;
`;

const MenuBarStyle = styled(UnstyledButton)`
  background-color: ${primaryDarkBlue};
  ${props => {
    if (props.side === 'left') {
      return `
        height: 128px;
        width: 36px;
        border-top-right-radius: 16px;
        border-bottom-right-radius: 16px;
        align-self: center;
        grid-row: 2 / span 3;
        grid-column: 1;
        `;
    }
    if (props.side === 'right') {
      return `
        height: 128px;
        width: 36px;
        border-top-left-radius: 16px;
        border-bottom-left-radius: 16px;
        grid-column: 5;
        align-self: center;
        grid-row: 2 / span 3;
      `;
    }
    if (props.side === 'bottom') {
      return `
        height: 36px;
        width: 128px;
        border-top-left-radius: 16px;
        border-top-right-radius: 16px;
        grid-column: 2 / span 3;
        grid-row: 5;
        justify-self: center;
      `;
    }
    return ``;
  }};
`;

const ExpandedMenuBar = styled.div`
  background-color: ${primaryDarkBlue};
  ${props => {
    if (props.side === 'left') {
      return `
        display: grid;
        grid-column: 1 /span 2;
        grid-row: 2 /span 3;
        height: 100%;
        width: 100%;
        border-top-right-radius: 16px;
        border-bottom-right-radius: 16px;
        align-self: center;
        align-items: center;
        justify-items: end;
        `;
    }
    if (props.side === 'right') {
      return `
        display: grid;
        height: 100%;
        width: 100%;
        border-top-left-radius: 16px;
        border-bottom-left-radius: 16px;
        grid-column: 4 / span 2;
        grid-row: 2 / span 3;
        align-self: center;
        justify-self: end;
        align-items: center;
        `;
    }
    if (props.side === 'bottom') {
      return `
        justify-items: center;
        display: grid;
        height: 100%;
        width: 100%;
        border-top-left-radius: 16px;
        border-top-right-radius: 16px;
        grid-column: 2 / span 3;
        grid-row: 4 / span 2;
        justify-self: center;
        align-self: end;
      `;
    }
    return ``;
  }};
`;

const ContentContainerStyle = styled.div`
  grid-row: 1 / span 5;
  grid-column: 1 / span 5;
  background-color: #e0e0e0;
`;

export {
  AppContainer,
  SplashScreenBody,
  NavBarStyle,
  UnstyledButton,
  MenuBarStyle,
  ExpandedMenuBar,
  ContentContainerStyle
};
