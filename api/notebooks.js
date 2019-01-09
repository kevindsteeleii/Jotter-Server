      const router = require('express').Router(),
 { Notebook, Note } = require('../models'),
         Sequelize = require('sequelize'),
       verifyToken = require('../auth/authHelp').verifyToken,
               jwt = require('jsonwebtoken'),
            SECRET = process.env.SECRET || 'secret';

router
  .route('/:id/notes')
  .all(verifyToken, checkUser)
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
  .all(verifyToken, checkUser)
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
        notebook.destroy()
      })
  })

router
  .route('/')
  .get((req, res, next) => {
    Notebook.findAll()
    .then(notebook => res.json(notebook))
  })

function checkUser(req, res, next) {
  jwt.verify(req.token, SECRET, (err, authData) => {
    const { user } = authData;
    if(err) {
      res.sendStatus(403);
    } else {
      Notebook.findOne({
        where: {
          UserId: user.id
        }
      }).then(notebook => {
        if (notebook){
          next();
        } else {
          res.sendStatus(403);
        }
      })
    }
  })
}

  module.exports = router;