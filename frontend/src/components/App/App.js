import React, { useState, useEffect} from 'react';
import { Route, Routes } from 'react-router-dom';
import './App.css';

import Main from '../Main/Main';

import { api } from '../../utils/Api';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import Login from '../Login/Login';
import Register from '../Register/Register';
import * as auth from '../../utils/auth.js';
import ProtectedRoute from '../ProtectedRoute';

function App() {

  const [cities, setCities] = useState([]);
  const [history, setHistory] = useState([]);
  const [currentUser, setCurrentUser] = useState({});
  const [loggedIn, setLoggedIn] = useState(false);
  const jwt = localStorage.getItem('jwt');


  useEffect(() => {
    console.log('обычный')
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
      .catch(() => {
        alert('Не правильные логин пароль');
      })
  }

//выход , обнуление локала
  function signOut() {
    setLoggedIn(false);
    localStorage.clear();
  }
//регситрация
  function handleRegister(email, password) {
    return auth.register(email, password)
      .then(() => {
        alert('Регистрация успешна')
        handleLogin(email, password);
      })
      .catch(() => {
        alert('Что то пошло не так') ;
      })
  }

  const handleCitySubmit = (city) => { 
    api.getHistoryWeather(city).then((data)=>{
      localStorage.setItem('historyWeather', JSON.stringify(data))
      setHistory(data)
    })
  api.getWeather(city).then((data)=> {
    localStorage.setItem('weather', JSON.stringify(data));
    setCities(data)
  }).catch(()=>console.log('error'))

  }

  useEffect(() => {
    console.log('lay')
    if (jwt) {
      api.getUserInfo()
        .then((userInfoObject) => {
          setCurrentUser(userInfoObject)
          setLoggedIn(true);
        })
        .catch((err) => {
          console.log(`Невозможно получить информацию о пользователе ${err}`);
        });

  }}
  , [jwt]);

  return (
    <CurrentUserContext.Provider value={currentUser}>
    
      <Routes>

        <Route path="/signin" element={<Login handleLogin={handleLogin} />} />
        <Route path="/signup" element={<Register handleRegister={handleRegister} />} />
        {/* <Route path='/' element={<Main cities={cities}/>}/> */}
         <Route
          path="/"
          element={
            <ProtectedRoute loggedIn={loggedIn}>
              <Main history={history} loggedIn={loggedIn} cities={cities} signOut={signOut} submitCity={handleCitySubmit} 
              />
            </ProtectedRoute>
          }
        /> 
      </Routes>
 
    </CurrentUserContext.Provider>
  )
}
export default App;
