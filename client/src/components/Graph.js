import React from 'react';
import {VictoryBar, VictoryChart, VictoryAxis} from 'victory';
import getTimeScale from '../helpers/getTimeScale';
import colors from '../colors';

const emoji = {
  'driving': '🚗',
  'walking': '🚶',
  'bicycling': '🚲',
  'transit': '🚆'
};

const Graph = (props) => (
  <svg width='450' height='300' viewBox='0 0 450 300' style={{height: '100%', width: '100%'}}>
    {/* Defining pattern for striped bars */}
    <defs>
      <pattern id='stripe' patternUnits='userSpaceOnUse' width='10' height='10' patternTransform="rotate(45)">
        <rect width="4" height="10" transform="translate(0,0)" fill="white"></rect>
      </pattern>
    </defs>
    <VictoryChart standalone={false} padding={{top: 0, bottom: 20, left: 50, right: 50}} domainPadding={50} animate={{ duration: 500, easing: 'quad' }}>
      <VictoryAxis dependentAxis
        tickFormat={/* Replace transportation name with emoji */ (mode) => emoji[mode]}
        style={{
          axis: {stroke: 'none'},
          tickLabels: {fontSize: '28px'}
        }}
      />
      <VictoryBar
        horizontal
        data={/* Dispaly the data with shortest durations first */ props.data.slice().reverse()}
        x='mode'
        y='time'
        labels={/* Format bar labels with appropriate time scale*/ (d) => getTimeScale(d.time)}
        style={{
          data: {fill: (d) => d.mode === 'bicycling' ? colors.secondary : 'url(#stripe)' },
          labels: {fill: colors.secondary, fontFamily: '"Bitter", serif'}
        }}
      />
    </VictoryChart>
  </svg>
)

export default Graph
