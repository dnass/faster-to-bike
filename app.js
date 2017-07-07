const express = require('express');
const compression = require('compression');
const getTimes = require('./getTimes');

const app = express();

app.use(compression());

app.set('port', process.env.PORT || 3001);

if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));
}

//API calls must take the form of /api/[origin]/[destination]. getTimes fetches and formats data.
app.get('/api/:origin/:destination', (req, res) => {
  getTimes(req.params.origin, req.params.destination)
    .then(result => res.json(result))
    .catch(err => {
      throw err;
    });
});

//All other requests returned empty
app.get('/*', (req, res) => {
  res.json({data: []})
})

app.listen(app.get('port'));
