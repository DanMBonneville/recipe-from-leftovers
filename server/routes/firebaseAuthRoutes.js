const express = require('express');
const axios = require('axios');
const { createLoginUrl } = require('./util');

const authRouter = express.Router();

authRouter.post('/login-user', (req, res) => {
  const apiKey = req.fireApiKey;
  const { email, password } = req.body;
  axios
    .post(createLoginUrl(apiKey), {
      email,
      password,
      returnSecureToken: true,
    })
    .then((response) => {
      res.json(response.data);
    })
    .catch((error) => {
      res.status(500).send(error.response.data.error);
    });
});

authRouter.post('/create-user', (req, res) => {
  const firebaseAdmin = req.firebaseAdmin;
  const { email, password } = req.body;
  firebaseAdmin
    .auth()
    .createUser({
      email: email,
      password: password,
    })
    .then((userRecord) => {
      res.json(userRecord);
    })
    .catch((error) => {
      res.status(500).send(error.errorInfo);
    });
});

module.exports = authRouter;
