import {duration} from 'moment';

//Convert a value in seconds to a formatted time at the most appropriate scale
const getTimeScale = (time) => {
  let formattedTime, suffix;
  if (time < 60) {
    formattedTime = duration(time, 'seconds').asSeconds().toFixed(0)
    suffix = 'second';
  } else if (time < 3600) {
    formattedTime = duration(time, 'seconds').asMinutes().toFixed(0)
    suffix = 'minute';
  } else {
    formattedTime = duration(time, 'seconds').asHours().toFixed(1)
    suffix = 'hour';
  }
  return `${formattedTime} ${suffix}${formattedTime === 1 ? '' : 's'}`
}

export default getTimeScale;
