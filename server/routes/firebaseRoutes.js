const express = require('express');
const axios = require('axios');
const { createLoginUrl } = require('./helpers');

const fireRouter = express.Router();

fireRouter.get('/get-ingredient-options', (req, res) => {
  const firebaseAdmin = req.firebaseAdmin;
  firebaseAdmin
    .firestore()
    .collection('ingredients')
    .doc('options')
    .get()
    .then((docSnap) => {
      res.json(docSnap.data());
    })
    .catch((error) => {
      res.status(500).send(error);
    });
});

fireRouter.post('/login-user', (req, res) => {
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
    });
});

fireRouter.post('/create-user', (req, res) => {
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
      res.status(500).send(error);
    });
});

module.exports = fireRouter;
