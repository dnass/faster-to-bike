import React from 'react';
import Radium from 'radium';
import colors from '../colors';

const footerStyle = {
  position: 'absolute',
  bottom: '4px',
  width: '100%'
}

const aStyle = {
  color: colors.secondary,
  fontWeight: '700',
  textDecoration: 'none'
}

const Footer = () => (
  <footer style={footerStyle}>Made by <a style={aStyle} href='https://dnass.xyz'>Daniel Nass</a></footer>
)

export default Radium(Footer);
