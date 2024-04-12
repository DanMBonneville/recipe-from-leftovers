const express = require('express');

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

fireRouter.get('/create-user', (req, res) => {
  const firebaseAdmin = req.firebaseAdmin;
  firebaseAdmin
    .auth()
    .createUser({
      email: 'someEmail@coolguy.com',
      password: 'abc123',
    })
    .then((userRecord) => {
      console.log('Successfully created new user:', userRecord);
      res.json(userRecord);
    })
    .catch((error) => {
      console.error('Error creating new user:', error);
    });
});

module.exports = fireRouter;
