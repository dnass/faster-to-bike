import React, {Component} from 'react';
import Radium, {Style} from 'radium';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import Graph from './Graph'
import getTimeScale from '../helpers/getTimeScale';

const bold = {
  fontWeight: '700'
}

const transitionClasses = {
  '.slide-appear': {
    opacity: '0',
    transform: 'translate(-250px,0)',
  },
  '.slide-appear.slide-appear-active': {
    opacity: '1',
    transition: 'opacity .5s ease-in',
    transform: 'translate(0,0)',
    transitionProperty: 'transform, opacity',
    transitionDuration: '300ms',
    transitionTimingFunction: 'cubic-bezier(0.175, 0.665, 0.320, 1), linear'
  }
}

class Results extends Component {
  constructor(props) {
    super(props);
    this.getMessage = this.getMessage.bind(this);
  }

  //Message depends on whether the call was successful, and whether biking was indeed the fastest mode of transportation.
  getMessage() {
    if (this.props.data === 'error')
      return (
        <span><span style={bold}>Sorry</span>, we couldn't find information for that route.<br/>Try something else.</span>
      )
    else if (this.props.data[0].mode === 'bicycling')
      return (
        <span><span style={bold}>Yes!</span> Bicycling is the fastest way to get there.</span>
      )
    else if (this.props.data[1].mode === 'bicycling')
      return (
        <span><span style={bold}>Almost!</span> Bicycling is only {getTimeScale(this.props.data[1].time - this.props.data[0].time)} slower than {this.props.data[0].mode}.</span>
      )
    else
      return (
        <span><span style={bold}>Nope.</span> But it's probably cheaper.</span>
      )
  }

  render() {
    const data = this.props.data;
    return (
      //Only show the graph if our API call didn't return an error
      <div>
        <Style rules={transitionClasses}/>
        <ReactCSSTransitionGroup
          transitionName='slide'
          transitionAppear={true}
          transitionAppearTimeout={500}
          transitionEnterTimeout={500}
          transitionLeaveTimeout={300}>
          {this.getMessage()}
          {data !== 'error' && <Graph data={data} />}
        </ReactCSSTransitionGroup>
      </div>
    )
  }
}

export default Radium(Results);
