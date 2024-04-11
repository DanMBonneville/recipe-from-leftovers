const admin = require('firebase-admin');

const initializeFirebaseAdmin = (key) => {
  var serviceAccount = JSON.parse(key);
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });
  return admin;
};

module.exports = { initializeFirebaseAdmin };
