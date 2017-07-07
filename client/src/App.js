import React, {Component} from 'react';
import Radium from 'radium';
import Loader from 'halogen/FadeLoader';
import AddressField from './components/AddressField';
import Button from './components/Button';
import Results from './components/Results';
import Footer from './components/Footer';
import Client from './Client';
import colors from './colors';

//Dummy routes to prefill form on load
const dummy = [
  {
    origin: 'Empire State Building',
    destination: 'Chinatown NYC'
  },
  {
    origin: 'Buckingham Palace',
    destination: 'Westminster Abbey'
  },
  {
    origin: 'White House',
    destination: 'Lincoln Memorial'
  },
  {
    origin: 'Eiffel Tower',
    destination: 'Louvre'
  }
]

const topSectionStyle = {
  backgroundColor: colors.secondary,
  color: colors.primary,
  margin: '0 0 12px',
  padding: '0 10px',
  display: 'inline-block',
  width: '100%',

  '@media (min-width: 768px)': {
    margin: '48px auto 60px',
    borderRadius: '6px',
    padding: '8px 24px',
    width: 'auto'
  }
}

const addressBlockStyle = {
  display: 'inline-block',
  margin: '12px auto',
  maxWidth: '600px',
  '@media (min-width: 768px)': {
    maxWidth: 'inherit'
  }
}

const loaderStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%,-50%)'
}

const bottomSectionStyle = {
  margin: '0 auto',
  maxWidth: '700px'
}

class App extends Component {
  constructor(props) {
    super(props);
    this.handleOriginChange = this.handleOriginChange.bind(this);
    this.handleDestinationChange = this.handleDestinationChange.bind(this);
    this.submitAddress = this.submitAddress.bind(this);
    const dummyRoute = dummy[Math.floor(Math.random() * dummy.length)];
    this.state = {
      origin: dummyRoute.origin,
      destination: dummyRoute.destination,
      loading: false,
      data: []
    }
  }

  handleOriginChange(origin) {
    this.setState({origin});
  }

  handleDestinationChange(destination) {
    this.setState({destination});
  }

  submitAddress(event) {
    event.preventDefault();
    this.setState({loading: true});
    //Query the travel times for specified origin and destination
    Client.search(this.state.origin, this.state.destination)
      .then(({data}) => {
        let stateData;
        //Pass data to state if we got some response that includes bicycling
        if (data.length > 0 && data.map(d => d.mode).indexOf('bicycling') !== -1)
          stateData = data;
        //Otherwise state is error, which is handled by Results
        else
          stateData = 'error';

        this.setState({
          data: stateData,
          loading: false
        });
      });
  }

  render() {
    return (
      <div>
        <form style={topSectionStyle} onSubmit={this.submitAddress}>
          <div style={addressBlockStyle}>
            <span>Is bicycling the fastest way to get from</span>
            <div style={{display: 'block'}}>
              <span style={{display: 'inline-block'}}>
                <AddressField
                  id='origin'
                  placeholder='Origin'
                  value={this.state.origin}
                  onAddressChange={this.handleOriginChange}
                />
              to</span>
              <span style={{display: 'inline-block'}}>
                <AddressField
                  id='destination'
                  placeholder='Destination'
                  value={this.state.destination}
                  onAddressChange={this.handleDestinationChange}
                />?</span>
              </div>
          </div>
          <Button text='➭' />

        </form>
        <section style={bottomSectionStyle}>
          {this.state.loading &&
            <div style={loaderStyle}>
              <Loader />
            </div>}
          {/* Only render the results if we have some data */}
          {this.state.data.length > 0 && <Results data={this.state.data} />}
        </section>
        <Footer />
      </div>
    )
  }
}

export default Radium(App)
