var express = require('express');
const monk = require('monk');
var router = express.Router();

const mongoURI =
  'mongodb+srv://libraiumApi:LVGNBhEobBR5qUIY@librarium-j4qij.mongodb.net/libraryApi?retryWrites=true&w=majority';

const db = monk(mongoURI);
const books = db.get('books');

function isValideBook(book) {
  return (
    book.title &&
    book.title.toString().trim() !== '' &&
    book.author &&
    book.author.toString().trim() !== '' &&
    book.isbn &&
    book.isbn.toString().trim() !== ''
  );
}
// yes
router.post('/', (req, res) => {
  if (isValideBook(req.body)) {
    const newBook = {
      title: req.body.title.toString(),
      author: req.body.author.toString(),
      isbn: req.body.isbn.toString(),
      published: new Date(),
      available: true,
    };

    books
      .insert(newBook)
      .then((createdBook) => {
        res.json(createdBook);
      })
      .catch((err) => {
        res.json(err);
      })
      .then(() => db.close());
  } else {
    res.status(422);
    res.json({
      msg: 'Invaled information ???',
    });
  }
});
router.get('/', (req, res) => {
  books.find().then((books) => {
    res.json(books);
  });
});

router.get('/search', (req, res) => {
  books.find(req.query).then((book) => {
    res.json(book);
  });
});

module.exports = router;
