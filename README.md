Wheather - Service
1. Выполнен backend на express JS, frontend на React.
2. Backend использует базу данных MongoDB,  для запуска локально должна быть установлена.
2. Реализована регистрация и авторизация пользователя, по токену JWT.
3. По выбранному городу предоставляются данные на текущий день, и исторические графики на 5 дней.
4. По окончанию работы, выйти из пользователя.
5. Периодически weatherIpi отказывает выдавать запрос из-за CORS, лечится обновлением (не успел защиту поставить)

Запуск проекта.
1. Обе папки находятся в одном репозитории.
2. Клонировать репозиторий.
3. Запустить терминал, в папке проекта зайти в папку backend (cd backend), запустить команду: npm i
4. После загрузки необходимых библиотек запустить сервер: npm run dev
5. Запустить второй терминал и перейти в папку frontend. Запустить команду: npm i
6. После загрузки необходимых библиотек запустить сервер: npm run start.
7. Приложение откроется по адресу http://localhost:3000, сервер http://localhost:2000