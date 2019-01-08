const router = require('express').Router(),
   Sequelize = require('sequelize'),
    { Note } = require('../models');

router
  .route('/:id')
  .get((req, res, next) => {
    Note.findByPk(req.params.id)
    .then(note => {
      res.json(note)
      })
    })
  .patch((req, res, next) => {
    Note.findByPk(req.params.id)
    .then(note => {
      note.update({...req.body.note});
      res.json(note);
    })
  })
  .delete((req, res, next) => {
    Note.findByPk(req.params.id)
    .then(note => {
      note.destroy();
      res.json({status: 'deleted'})
    })
  })

module.exports = router;