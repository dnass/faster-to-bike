import React from 'react';
import ReactDOM from 'react-dom';
import {Style, StyleRoot} from 'radium';
import normalize from 'radium-normalize';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import colors from './colors';

const styles = {
  html: {
    fontFamily: '"Bitter", serif',
    fontSize: '100%',
    lineHeight: '1.5em',
    textAlign: 'center'
  },
  body: {
    background: colors.primary,
    color: colors.secondary
  },
  '::selection': {
    background: colors.primary,
    color: colors.secondary
  },
  '::placeholder': {
    color: colors.primary
  },
  mediaQueries: {
    '(min-width: 768px)': {
      html:  {
        fontSize: '130%',
        lineHeight: '1.8em'
      }
    }
  }
}

ReactDOM.render(
  <StyleRoot>
    <Style rules={normalize} />
    <Style rules={styles} />
    <App />
  </StyleRoot>,
  document.getElementById('root')
);

registerServiceWorker();
