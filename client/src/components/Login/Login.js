import React from "react";
import '../Register/Register.css';
import { Link, Navigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';

function Login({ handleLogin }) {

  const { register, formState: { errors, isValid }, handleSubmit } = useForm({ mode: 'onChange', });

  function onSubmit(data) {
    console.log(data.email);
    console.log(data.password);
    handleLogin(data.email, data.password)
  }

  return (!(localStorage.getItem('login') === 'true') ?
    <section className="register">
      <div className="register__header">
      </div>
      <form className="form" onSubmit={handleSubmit(onSubmit)}>
        <h3 className="form__title">
          Авторизируйтесь
        </h3>
        <fieldset className="form__container">
          <div className="form__input-container">
            <label className="form__input__title">E-mail</label>
            <input className="form__input hover" type="email"

              {...register('email', {
                required: 'Поле обязательно к заполнению',
                minLength: {
                  value: 4,
                  message: 'Количество символов не менее 4',
                },
                maxLength: {
                  value: 40,
                  message: 'Количество символов не более 40',
                },
                pattern: {
                  value:
                    // eslint-disable-next-line no-useless-escape
                    /^[\w]{1}[\w-\.]*@[\w-]+\.[a-z]{2,4}$/i,
                  message:
                    "Введите корректный Email",
                },
              })}></input>
            <span className="form__error">{errors.email && errors.email.message}</span>
          </div>
          <div className="form__input-container">
            <label className="form__input__title">Пароль</label>
            <input className="form__input hover" type="password"
              {...register("password", {
                required: 'Поле обязательно к заполнению',
                minLength: {
                  value: 6,
                  message: 'Количество символов не менее 6',
                },
                maxLength: {
                  value: 10,
                  message: 'Количество символов не более 10',
                },
              })}></input>
            <span className="form__error">{errors.password && errors.password.message}</span>
          </div>
        </fieldset>
        <div className="form__submit-container form__wrapper">
          <button className={isValid ? "form__submit-button hover" : "form__submit-button form__submit-button_disabled"}
            disabled={!isValid}>Войти</button>
          <span className="form__submit-title">Ещё не зарегистрированы? </span>
          <Link to='/signup' className="form__submit-link hover">Регистрация</ Link>
        </div>
      </form>

    </section >
    : <Navigate to='/' />
  )
}
export default Login;
