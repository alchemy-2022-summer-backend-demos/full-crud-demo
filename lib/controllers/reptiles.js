const { Router } = require('express');
const { Reptile } = require('../models/Reptile');

module.exports = Router()
  .get('/:id', async (req, res, next) => {
    try {
      const data = await Reptile.getById(req.params.id);
      res.json(data);
    } catch (e) {
      next(e);
    }
  })
  .get('/', async (req, res, next) => {
    try {
      const data = await Reptile.getAll();
      res.json(data);
    } catch (e) {
      next(e);
    }
  });
