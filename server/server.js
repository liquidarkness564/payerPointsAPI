const express = require('express');
const app = express();
const port = 3000;
// const morgan = require('morgan');

const router = require('./routes.js');

app.use((req, res, next) => {
  res.append('Access-Control-Allow-Origin', ['*']);
  res.append('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  res.append('Access-Control-Allow-Headers', 'Content-Type');
  next();
});

app.use(express.static(__dirname + '/../client/dist'));

app.use(express.json());
// app.use(morgan());
app.use('/points', router);

app.listen(port, () => console.log(`Listening on port ${port}`));