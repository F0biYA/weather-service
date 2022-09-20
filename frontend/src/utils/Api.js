class Api {
    constructor({ address}) {
      this._address = address;
    }
 
    _handleResponse(response) {
      if (response.ok) return response.json();
      return Promise.reject(`Ошибка: ${response.status}`);
    }

    getUserInfo() {
      return fetch(`${this._address}/users/me`, {
        method: 'GET',
        // headers: this._headers,
        headers: {
          authorization: `Bearer ${localStorage.getItem('jwt')}`,
          "Content-Type": "application/json",
        },
      })
        .then((response) => this._handleResponse(response));
    }
    getCity() {
      return fetch(`${this._address}/cities`, {
        method: 'GET',
        // headers: this._headers,
        headers: {
          authorization: `Bearer ${localStorage.getItem('jwt')}`,
          "Content-Type": "application/json",
        },
      })
        .then((response) => this._handleResponse(response));
    }
postCity({city, cityId}) {
  // const city = 'sasas';
  // const cityId = "12121221212"
    return fetch(`${this._address}/cities`, {
      method: 'POST',
      headers: {
        authorization: `Bearer ${localStorage.getItem('jwt')}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ city, cityId })
      
})
.then((response) => this._handleResponse(response))
}

  getWeather(city) {
  console.log(city)
    return fetch(`http://api.weatherapi.com/v1/current.json?key=4552e5de13754964a20184224221809&lang=ru&q=${city.city}&aqi=no`, {
      method: 'GET',
      // headers: this._headers,
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => this._handleResponse(response));
  }
  
  getHistoryWeather(city) {
    console.log(city)
      return fetch(`http://api.weatherapi.com/v1/forecast.json?key=4552e5de13754964a20184224221809&q=${city.city}&days=4&aqi=no&alerts=no`, {
        method: 'GET',
        // headers: this._headers,
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((response) => this._handleResponse(response));
    }
    }
  export const api = new Api({
    address: "http://localhost:2000",
    // headers: {
    //    authorization: `Bearer ${localStorage.getItem('jwt')}`,
    //   "Content-Type": "application/json",
    // },
  });