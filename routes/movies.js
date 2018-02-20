var express = require('express');
var router = express.Router();
var Movie = require('../models').Movie;

/* GET movie listings. */
router.get('/', function(req, res) {
  Movie.all({
    order: [
      ['createdAt', 'ASC']
    ]
  })
  .then( function(movies) {
      return res.render('movies', { movies: movies });
  })
});

/* POST add movie listing */
router.post('/', function(req, res) {
  var title = req.body.title;
  Movie.create({ title: title })
    .then( function() {
      res.redirect('/movies');
  });
});

router.delete('/:id', function(req, res) {
  Movie.findById(req.params.id)
    .then( function(movie) {
      movie.destroy()
    })
    .then( function() {
      return res.redirect('/movies');
  });
});

router.get('/:id/edit', function(req, res) {
  Movie.findById(req.params.id)
    .then( function(movie) {
      return res.render('edit', { movie: movie });
  });
});

router.put('/:id', function(req, res) {
  Movie.update(
    { title: req.body.title },
    { where: { id: req.params.id } }
  )
  .then( function() {
    return res.redirect('/movies');
  })
});

module.exports = router;
