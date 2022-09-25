// export const BASE_URL = 'https://api.putilin.student.nomoreparties.sbs';
export const BASE_URL = 'http://localhost:2000';


 const handleResponse = (response) => {
    if (response.ok) {
      return response.json();
    }
    return response.json()
    .then((data) => {
    const  message  = data.message;

      throw message;
    })}

export const register = (name, email, password) => {
    console.log(name, email, password)
    return fetch(`${BASE_URL}/signup`, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({name, email, password })
    })
    .then(handleResponse)
};

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
