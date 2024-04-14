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

module.exports = fireRouter;
