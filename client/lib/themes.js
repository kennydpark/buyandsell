import { createGlobalStyle } from 'styled-components';

export const lightTheme = {
  primary: '#fff',
  body: '#f5f5f5',
  fontColor: '#444',
  inputBackground: 'fff'
};

export const darkTheme = {
  primary: '#292929',
  body: '#171717',
  fontColor: '#fff',
  inputBackground: '#353535'
};

export const themes = {
  light: lightTheme,
  dark: darkTheme
};

export const GlobalStyles = createGlobalStyle`
  body {
    background-color: ${props => props.theme.body};
    transition: all 0.5s ease;
  }
`;
