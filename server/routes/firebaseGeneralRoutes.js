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
  let uid = req.query.uid;
  firebaseAdmin
    .firestore()
    .collection('ingredients')
    .doc('default-fridge')
    .get(uid)
    .then((docSnap) => {
      res.json(Object.values(docSnap.data())[0]);
    })
    .catch((error) => {
      res.status(500).send(error);
    });
});

fireRouter.post('/save-default-selected-ingredients', (req, res) => {
  const firebaseAdmin = req.firebaseAdmin;
  const { userId, selectedIngredients } = req.body;
  console.log('Server good so far...');
  firebaseAdmin
    .firestore()
    .collection('ingredients')
    .doc('default-fridge')
    .set({
      [userId]: selectedIngredients,
    })
    .then((docSnap) => {
      res.json(docSnap);
    })
    .catch((error) => {
      res.status(500).send(error);
    });
});

module.exports = fireRouter;
