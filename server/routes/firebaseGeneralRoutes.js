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

fireRouter.get('/get-default-selected-ingredients', (req, res) => {
  const firebaseAdmin = req.firebaseAdmin;
  let email = req.query.email;
  firebaseAdmin
    .firestore()
    .collection('savedIngredientSelection')
    .doc(email)
    .get()
    .then((docSnap) => {
      res.json(Object.values(docSnap.data()));
    })
    .catch((error) => {
      res.status(500).send(error);
    });
});

fireRouter.post('/save-default-selected-ingredients', (req, res) => {
  const firebaseAdmin = req.firebaseAdmin;
  const { email, selectedIngredientsObject } = req.body;
  firebaseAdmin
    .firestore()
    .collection('savedIngredientSelection')
    .doc(email)
    .set(selectedIngredientsObject)
    .then((docSnap) => {
      res.json(docSnap);
    })
    .catch((error) => {
      res.status(500).send(error);
    });
});

module.exports = fireRouter;
