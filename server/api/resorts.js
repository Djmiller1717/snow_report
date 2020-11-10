const router = require('express').Router();
const { Resort } = require('../db');

router.get('/', async (req, res, next) => {
  try {
    const resorts = await Resort.findAll();
    res.send(resorts);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
