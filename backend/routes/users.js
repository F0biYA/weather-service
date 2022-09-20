const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const {
  getUsers,
  getUser,
  getUserById,
  updateUser,
} = require('../controllers/users');

router.get('/', getUsers);
router.get('/me', getUser);
router.get('/:userId', celebrate({
  params: Joi.object().keys({
    userId: Joi.string().length(24).hex(),
  }),
}), getUserById);

router.patch('/me', celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    city: Joi.string().min(2).max(30),
  }),
}), updateUser);

module.exports = router;
