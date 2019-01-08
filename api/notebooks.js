      const router = require('express').Router(),
 { Notebook, Note } = require('../models'),
         Sequelize = require('sequelize'),
                Op = Sequelize.Op

router
  .route('/:id/notes')
  .get((req, res, next) => {
    Note.findAll({
      where: {
        NotebookId: req.params.id
      }
    }).then(notes => res.json(notes))
  })
  .post((req, res, next) => {
    Note.create({...req.body.note, NotebookId: req.params.id})
    .then(note => res.json(note))
  })

router
  .route('/:id')
  .get((req, res, next) => {
    Notebook.findByPk(req.params.id)
    .then(notebook => res.json(notebook))
  })
  .patch((req, res, next) => {
    Notebook.findByPk(req.params.id)
    .then(notebook => {
      notebook.update({...req.body.notebook});
      res.json(notebook);
    })
  })
  .delete((req, res, next) => {
    Notebook.findByPk(req.params.id)
    .then(notebook => {
      res.json(notebook.destroy())
    })
  })

router
  .route('/')
  .get((req, res, next) => {
    // res.status(200).send("Notebook is online.")
    Notebook.findAll()
    .then(notebook => res.json(notebook))
  })

  module.exports = router;