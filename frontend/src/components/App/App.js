import React, { useState, useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import './App.css';

import Main from '../Main/Main';

import { api } from '../../utils/Api';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import Login from '../Login/Login';
import Register from '../Register/Register';
import * as auth from '../../utils/auth.js';
import ProtectedRoute from '../ProtectedRoute';
import InfoPopup from '../InfoPopup/InfoPopup';

function App() {

  const [cities, setCities] = useState([]);
  const [weather, setWeather] = useState([]);
  const [currentUser, setCurrentUser] = useState({});
  const [loggedIn, setLoggedIn] = useState(false);
  const [status, setStatus] = useState();
  const [infoPopup, setInfoPopup] = useState(false);
  const jwt = localStorage.getItem('jwt');
  const [error,  setError] = useState('')


  useEffect(() => {
    
    if (loggedIn) {
      api.getUserInfo()
        .then((userInfoObject) => {
          setCurrentUser(userInfoObject)
        })
        .catch((err) => {
          console.log(`Невозможно получить информацию о пользователе ${err}`);
        });

    }
  }, [loggedIn])


  function handleLogin(email, password) {
    return auth.authorize(email, password)
      .then((data) => {
        if (data.token) {
          localStorage.setItem('jwt', data.token);
          localStorage.setItem('login', true);
          setLoggedIn(true);
        }
      })
      .catch((error) => {
        
        setError(error)
        setInfoPopup(true);
        setStatus(false);
      })
  }

  function signOut() {
    setLoggedIn(false);
    localStorage.clear();
  }

  function handleRegister(name, email, password) {
    return auth.register(name, email, password)
      .then(() => {
        setInfoPopup(true);
        setStatus(true);
        handleLogin(email, password);
      })
      .catch((err) => {
        setError(err)
        setInfoPopup(true);
        setStatus(false);
      })
  }
  function handleClose() {
    setInfoPopup(false);
  }
 async function handleCitySubmit(city) {
    await checkCorrectName(city);
    getWeatherArray()
  }


  async function checkCorrectName(city) {
    await api.checkCityName(city).then((data)=>{api.postCity(city).then((data) => console.log(data)).catch((err) => alert(err));}).catch((err)=> {
      setInfoPopup(true);
      setError('Город не найден')});
  }

  useEffect(() => {
    if (jwt) {
      api.getUserInfo()
        .then((userInfoObject) => {
          setCurrentUser(userInfoObject)
          setLoggedIn(true);
        })
        .catch((err) => {
          console.log(`Невозможно получить информацию о пользователе ${err}`);
        });
      api.getCity().then((data) => setCities(data)).catch((err) => alert(err));
      getWeatherArray();
    }
  }
    , [jwt]);

  async function getWeatherArray() {
    const cities = await api.getCity();
    setCities(cities)
    const weatherPromises = cities.map((item) => api.getWeather(item));
    const weathers = await Promise.all(weatherPromises);
    setWeather(weathers);
  }
    async function deleteCity (id)  {
    await api.deleteCity(id).then((res) => console.log(res));
    getWeatherArray()

  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
<InfoPopup close={handleClose} error={error} status={status} infoPopup={infoPopup}/>
      <Routes>
        
        <Route path="/signin" element={<Login handleLogin={handleLogin} />} />
        <Route path="/signup" element={<Register handleRegister={handleRegister} />} />
  
        <Route
          path="/"
          element={
            <ProtectedRoute loggedIn={loggedIn}>
              <Main 
              status={status} closePopup={handleClose} infoPopup={infoPopup} handleDelete={deleteCity} loggedIn={loggedIn} cities={cities} weather={weather} signOut={signOut} submitCity={handleCitySubmit}
              />
            </ProtectedRoute>
          }
        />
      </Routes>

    </CurrentUserContext.Provider>
  )
}
export default App;
