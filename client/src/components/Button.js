import React from 'react';
import Radium from 'radium';
import colors from '../colors'

const styles = {
  color: colors.primary,
  cursor: 'pointer',
  backgroundColor: 'transparent',
  border: 'none',
  fontSize: '3em',
  fontFamily: 'inherit',
  padding: '4px',
  margin: '0 auto 12px',
  display: 'block',
  transition: 'transform 0.3s',

  '@media (min-width: 768px)': {
    display: 'inline-block',
    margin: '8px 0 0 30px'
  },

  ':hover': {
    transform: 'translateX(6px)'
  },

  ':focus': {
    outline: 'none'
  }
}

const Button = (props) => (
  <button type='submit' style={styles}>{props.text}</button>
)

export default Radium(Button)
