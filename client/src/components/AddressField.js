import React, {Component} from 'react';
import Radium from 'radium';
import colors from '../colors';

const styles = {
  fontSize: '1em',
  fontFamily: 'inherit',
  fontWeight: '700',
  textAlign: 'center',
  width: '250px',
  background: 'none',
  margin: '4px',
  padding: '4px',
  textTransform: 'uppercase',
  color: colors.primary,
  borderTop: 'none',
  borderLeft: 'none',
  borderRight: 'none',
  borderBottom: `solid 3px ${colors.primary}`,

  '@media (min-width: 768px)': {
    margin: '8px',
    width: '275px'
  },

  ':focus': {
    outline: 'none',
  }
}

class AddressField extends Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    this.props.onAddressChange(e.target.value);
  }

  render() {
    return (
      <input
        type='text'
        style={styles}
        value={this.props.value}
        placeholder={this.props.placeholder}
        key={this.props.id}
        onChange={this.handleChange}
      ></input>
    )
  }
}

export default Radium(AddressField);
