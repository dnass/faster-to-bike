if (process.env.NODE_ENV !== 'production') require('./env.js');

const googleMapsClient = require('@google/maps').createClient({key: process.env.GOOGLE_API_KEY, Promise: Promise});

//The four modes of transportation that the Distance Matrix API accepts
const modes = ['driving', 'walking', 'bicycling', 'transit'];

const getTimes = (origins, destinations) => {
  //Mapping array of transportation modes to make 4 calls to Google Maps Services
  return Promise.all(modes.map(mode => {
    return googleMapsClient
      .distanceMatrix({origins, destinations, mode})
      .asPromise()
      .then(response => {
        const element = response.json.rows[0].elements[0];
        //Did the call return a duration?
        return element.status === 'OK' ? element.duration.value : null
      })
      .catch(console.log);
  })).then(data => {
    return data
      //Create objects with mode/time pairs
      .map((time, index) => ({ mode: modes[index], time }))
      //Filter out elements where we didn't receive a time
      .filter(d => d.time !== null)
  }).then(data => {
    data.sort((a, b) => a.time - b.time);
    return { data }
  })
}

module.exports = getTimes;
