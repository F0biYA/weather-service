const router = require('express').Router();

const { getCities, createCity } = require('../controllers/cities');

router.get('/', getCities);
router.post('/', createCity);

module.exports = router;
