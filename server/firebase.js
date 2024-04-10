require('dotenv').config();
var admin = require('firebase-admin');
var serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT_KEY);
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});
const db = admin.firestore();
const ingredientOptionsRef = db.collection('ingredients').doc('options');

module.exports = {
  ingredientOptionsRef,
};
