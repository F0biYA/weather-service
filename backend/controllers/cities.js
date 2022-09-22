const City = require('../models/city');

require('dotenv').config();

const BadRequestError = require('../errors/badRequestError');
const NotFoundError = require('../errors/notFoundError');

module.exports.getCities = (req, res, next) => {
  City.find({})
    .then((cities) => res.send(cities))
    .catch(next);
};

module.exports.createCity = (req, res, next) => {
  const {
    city, cityId,
  } = req.body;
  City.create({
    city,
    cityId,
  })
    .then((c) => res.send(c))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequestError('Некорректные данные'));
      } else {
        next(err);
      }
    });
};
module.exports.deleteCity = (req, res, next) => {
  const id = req.params.cityId;

  City.findByIdAndRemove(id)
    .then(() => res.status(200).send({ message: 'Карточка удалена' }))
    .catch(() => next(new NotFoundError('Карточка не найдена')));
};
