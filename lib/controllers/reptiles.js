const { Router } = require('express');
const { Reptile } = require('../models/Reptile');

module.exports = Router().get('/', async (req, res, next) => {
  try {
    const data = await Reptile.getAll();
    res.json(data);
  } catch (e) {
    next(e);
  }
});
