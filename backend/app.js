const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const { celebrate, errors, Joi } = require('celebrate');
const path = require('path');
require('dotenv').config();

const app = express();
const { PORT = 2000 } = process.env;
/* подключаю mongo */
mongoose.connect('mongodb://localhost:27017/testDB');

/* импорт ошибок */
const NotFoundError = require('./errors/notFoundError');
const handleError = require('./middlewares/handleError');

/* импорт контролееров */
const { createUser, loginUser } = require('./controllers/users');

/* импорт мидлвера авторизации */
const auth = require('./middlewares/auth');

/* импорт  роутеров */
const userRouter = require('./routes/users');
const cityRouter = require('./routes/cities');

/* обработка HTTP POST запросов, перевод данных в json */
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

/* Массив доменов, с которых разрешены кросс-доменные запросы */
const allowedCors = [
  'http://localhost:3000',
];

app.use((req, res, next) => {
  const { origin } = req.headers; // Сохраняем источник запроса в переменную origin

  if (allowedCors.includes(origin)) { // проверяем, что источник запроса есть среди разрешённых
    res.header('Access-Control-Allow-Origin', origin); // устанавливаем заголовок, который разрешает браузеру запросы с этого источника
    res.header('Access-Control-Allow-Credentials', true);
  }

  const { method } = req;
  const DEFAULT_ALLOWED_METHODS = 'GET,HEAD,PUT,PATCH,POST,DELETE';
  const requestHeaders = req.headers['access-control-request-headers'];

  if (method === 'OPTIONS') {
    res.header('Access-Control-Allow-Methods', DEFAULT_ALLOWED_METHODS);
    res.header('Access-Control-Allow-Headers', requestHeaders);
    return res.end();
  }
  return next();
});
app.use(express.static(path.join(__dirname, 'public')));
/* запуск роутеров без авторизации */
app.post('/signin', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
}), loginUser);

app.post('/signup', celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    email: Joi.string().required(),
    password: Joi.string().required(),
  }),
}), createUser);

/* защита маршрутов авторизацией */
app.use(auth);
app.use('/users', userRouter);
app.use('/cities', cityRouter);

/* ошибка при не найденной странице */
app.use('*', () => {
  throw new NotFoundError('Страница не найдена');
});

/* обработчик ошибок celebrate */
app.use(errors());

/* все не пойманные ошибки приводим к ошибке сервера 500 */
app.use(handleError);

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`App listening on port ${PORT}`);
});
