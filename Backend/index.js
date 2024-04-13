require('dotenv').config();
require('./config/fb-admin-sdk');
const cors = require('cors');
const express = require('express');
const app = express();
const db = require('./config/db.js');

// Middlewares
const authMiddleware = require('./middlewares/auth.middleware.js');
const errorHandler = require('./middlewares/error.middleware.js');

// Routers import
const usersRouter = require('./routes/users.router.js');
const applicationsRouter = require('./routes/applications.router.js');
const conceptsRouter = require('./routes/concepts.router.js');
const countriesRouter = require('./routes/countries.router.js');
const citiesRouter = require('./routes/cities.router.js');
const equipmentsRouter = require('./routes/equipments.router.js');
const branchesRouter = require('./routes/branches.router.js');

app.use(express.json());
app.use(cors({ origin: true, credentials: true }));

db.on('error', (err) => console.log(err.message));
db.once('open', () => console.log('Connected to database'));

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', '*');
  res.header('Access-Control-Allow-Methods', '*');
  next();
});

// app.use(authMiddleware);

app.use('/users', usersRouter);
app.use('/applications', applicationsRouter);
app.use('/concepts', conceptsRouter);
app.use('/countries', countriesRouter);
app.use('/cities', citiesRouter);
app.use('/equipments', equipmentsRouter);
app.use('/equipments', equipmentsRouter);
app.use('/branches', branchesRouter);

app.use(errorHandler);

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
