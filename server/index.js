const express = require('express');
const path = require('path');
require('express-async-errors');
const app = express();

const formKtpRouter = require('./controllers/form_ktp');

const { PORT } = require('./utils/config');
const { connectToDatabase } = require('./utils/db');

app.use(express.json());
app.use(express.static('assets'));
app.use('/api/formktp', formKtpRouter);

const main = async () => {
  await connectToDatabase();
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}

main();