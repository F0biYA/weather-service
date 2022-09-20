const router = require('express').Router();

const { getCities, createCity } = require('../controllers/cities');

router.get('/', getCities);

// POST /movies создаёт фильм
router.post('/', createCity);

module.exports = router;
