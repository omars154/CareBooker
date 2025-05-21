const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const bookRoutes = require('./api/books');
const Pool = require('./db');
require('dotenv').config();

const app = express();
const PORT = 5000;

app.use(cors());
app.use(morgan('dev'));
app.use(express.json());

app.use('/api/books', bookRoutes);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
