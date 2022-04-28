import { createGlobalStyle } from 'styled-components';

export const lightTheme = {
  primary: '#fff',
  body: '#f5f5f5',
  fontColor: '#444'
};

export const darkTheme = {
  // primary: '#202124',
  primary: '#252525',
  body: '#171717',
  fontColor: '#fff'
};

export const themes = {
  light: lightTheme,
  dark: darkTheme
};

export const GlobalStyles = createGlobalStyle`

  body {
    background-color: ${props => props.theme.body};
    transition: all .5s ease;
  }

`;
