const router = require('express').Router();

const { getCities, createCity, deleteCity } = require('../controllers/cities');

router.get('/', getCities);
router.post('/', createCity);
router.delete('/:cityId', deleteCity);
module.exports = router;
