const express = require('express');
const app = express();
const port = 3000;

const router = require('./routes.js');

app.use('/points', router);

app.listen(port, () => console.log(`Listening on port ${port}`));