const express = require('express');
const cors = require('cors');

const books = require('./router/books');

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use('/api/books', books);

let PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Api listening on http://localhost:${PORT}`);
});
