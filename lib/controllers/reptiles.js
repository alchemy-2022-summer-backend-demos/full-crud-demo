const { Router } = require('express');
const { Reptile } = require('../models/Reptile');

module.exports = Router()
  .delete('/:id', async (req, res, next) => {
    try {
      const data = await Reptile.delete(req.params.id);
      res.json(data);
    } catch (e) {
      next(e);
    }
  })
  .post('/', async (req, res, next) => {
    try {
      const data = await Reptile.insert(req.body);
      console.log(data);
      res.json(data);
    } catch (e) {
      next(e);
    }
  })
  .put('/:id', async (req, res, next) => {
    try {
      const data = await Reptile.updateById(req.params.id, req.body);
      res.json(data);
    } catch (e) {
      next(e);
    }
  })
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
