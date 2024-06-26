const PORT = 8000;
const express = require('express');
const cors = require('cors');
const path = require('path');
const { initializeFirebaseAdmin } = require('./firebaseConfig');
const fireRouter = require('./routes/firebaseGeneralRoutes');
const spoonRouter = require('./routes/spoonRoutes');
const authRouter = require('./routes/firebaseAuthRoutes');
require('dotenv').config();

const app = express();
app.use(
  cors({
    allowedHeaders: ['authorization', 'Content-Type'],
    exposedHeaders: ['authorization'],
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    preflightContinue: false,
  })
);
app.use(express.json());
app.use(express.static(path.join(__dirname, '..', 'build')));

const adminInstance = initializeFirebaseAdmin(
  process.env.FIREBASE_SERVICE_ACCOUNT_KEY
);
app.use((req, res, next) => {
  req.spoonKey = process.env.SPOON_API_KEY;
  req.fireApiKey = process.env.FIREBASE_WEB_API_KEY;
  req.firebaseAdmin = adminInstance;
  next();
});

app.use('/api/fire', authRouter);
app.use('/api/fire', fireRouter);
app.use('/api/spoon', spoonRouter);

app.use((req, res) => {
  res.redirect('/');
});

app.use((err, req, res, next) => {
  console.error('500 error in server: ', err);
  res.status(500).send('500 - Internal Server Error: ', err);
});

app.listen(8000, () => console.log(`Server is running on port ${PORT}`));
