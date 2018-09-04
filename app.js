const express = require('express');
const morgan = require('morgan');

const app = express();

app.use(morgan('dev'));

app.get('/', (req, res) => {
  res.send('主页');
});

app.listen(3000, () => {
  console.log('App is running on *:3000');
});
