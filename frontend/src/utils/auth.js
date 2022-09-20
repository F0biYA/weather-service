export const BASE_URL = 'https://api.putilin.student.nomoreparties.sbs';


 const handleResponse = (response) => {
    if (response.ok) {
      return response.json();
    }
    return response.json()
    .then((data) => {
      const { statusCode } = data;
      const { message } = data.message[0].message[0];
      const error = new Error(message || 'Что-то пошло не так');
      error.status = statusCode;
      throw error;
    })
  }
/* регистрируюсь на серевер */
export const register = (name, email, password) => {
    console.log(name, email, password)
    return fetch(`${BASE_URL}/signup`, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name, email, password })
    })
    .then(handleResponse)
};

/* делаю авторизацию на сервере*/
export const authorize = (email, password) => {
    return fetch(`${BASE_URL}/signin`, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ password, email })
    })
    .then(handleResponse)
};
/*получаю токен для авторизации на закрытое содержимое */
export const getContent = (token) => {
    return fetch(`${BASE_URL}/users/me`, {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        }
    })
        .then(res => res.json())
        .then(data => data)
}