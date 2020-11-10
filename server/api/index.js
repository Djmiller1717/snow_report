const router = require('express').Router();

router.use('/resorts', require('./resorts'));

module.exports = router;
