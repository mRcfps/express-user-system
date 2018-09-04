const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const User = require('./models/User');

const app = express();

mongoose.connect('mongodb://localhost:27017/test');

app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.send('主页');
});

app.post('/signup', (req, res, next) => {
  User.findOne({ username: req.body.username })
    .then(user => {
      if (user) {
        return Promise.reject({
          badRequest: true,
          message: '用户名已经被注册！',
        });
      }
      const newUser = new User({
        username: req.body.username,
        password: req.body.password,
      });
      return newUser.save();
    })
    .then(() => res.status(201).send('注册成功！'))
    .catch(err => {
      if (err.badRequest) {
        return res.status(400).send(err.message);
      }
      next(err);
    });
});

app.listen(3000, () => {
  console.log('App is running on *:3000');
});
