const axios = require('axios');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const { authenticate } = require('./middlewares');
const jwtKey = require('../_secrets/keys').jwtKey;
const db = require('../database/dbConfig.js');

module.exports = server => {
  server.post('/api/register', register);
  server.post('/api/login', login);
  server.get('/api/jokes', authenticate, getJokes);
};

function generateToken(user) {
  const payload = {
    username: user.username
  };
  const options = {
    expiresIn: '2h',
    jwtid: '1234'
  };
  return jwt.sign(payload, jwtKey, options);
}

async function register(req, res) {
  const creds = req.body;
  hash = bcrypt.hashSync(creds.password, 10);
  creds.password = hash;

  try {
    const ids = await db('users').insert(creds);
    const id = ids[0];
    const user = await db('users')
      .where({ id })
      .first();
    const token = generateToken(user);
    res.status(201).json({ token });
  } catch (err) {
    if (err.errno === 19) {
      res
        .status(409)
        .json({ message: 'That username is taken, please try another!' });
    } else {
      console.log(err);
      res
        .status(500)
        .json({ message: 'Something went wrong, please try again.' });
    }
  }
}

async function login(req, res) {
  try {
    const creds = req.body;
    const user = await db('users')
      .where({ username: creds.username })
      .first();
    if (user && bcrypt.compareSync(creds.password, user.password)) {
      const token = generateToken(user);
      res.status(200).json({ token });
    } else {
      res.status(401).json({ message: 'Invalid credentials.' });
    }
  } catch (err) {
    res
      .status(500)
      .json({ message: 'Something went wrong, please try again.' });
  }
}

function getJokes(req, res) {
  axios
    .get(
      'https://08ad1pao69.execute-api.us-east-1.amazonaws.com/dev/random_ten'
    )
    .then(response => {
      res.status(200).json(response.data);
    })
    .catch(err => {
      res.status(500).json({ message: 'Error Fetching Jokes', error: err });
    });
}
