import React from 'react';
import ReactDOM from 'react-dom';
import App from './app';

const localTheme = JSON.parse(localStorage.getItem('theme'));

let theme;
if (!(localStorage.getItem('theme'))) {
  theme = 'light';
} else if (localTheme === 'light') {
  theme = 'light';
} else if (localTheme === 'dark') {
  theme = 'dark';
}

ReactDOM.render(
  <App theme={theme} />,
  document.querySelector('#root')
);
