import React from "react";
import './WeatherBlock.css';
import { useForm } from 'react-hook-form';
function WeatherBlock(props) {

    const { register, resetField,formState: { errors, isValid }, handleSubmit } = useForm({ mode: 'onChange', });

    function onSubmit(data) {
        resetField("city");
        props.submitCity(data);
    }
    return (
        <section className="weatherBlock">
            <form className="form" onSubmit={handleSubmit(onSubmit)}>
                <h1 className="weatherBlock__title">
                    Прогноз погоды
                </h1>
                <h2 className="weatherBlock__subtitle">
                    Добавьте город
                </h2>
                <fieldset className="weatherBlock__container">
                    <div className="form__input-container">
                        <label className="form__input__title">Город</label>
                        <div className="input__wrapper">
                            <input
                                className="form__input hover"
                                type="text"
                                {...register("city", {
                                    required: 'Поле обязательно к заполнению',
                                    minLength: {
                                        value: 2,
                                        message: 'Количество символов не менее 2',
                                    },
                                    maxLength: {
                                        value: 40,
                                        message: 'Количество символов не более 40',
                                    },
                                    pattern: {
                                        value: /^[A-Za-zА-Яа-яЁё ]+$/i,
                                        message: 'Разрешены только буквы'
                                    }
                                })}
                            >
                            </input>
                            <button className={isValid ? "city__submit-button hover" : "city__submit-button city__submit-button_disabled"}
                                disabled={!isValid}></button>
                        </div>
                        <span className="form__error"> {errors?.city && errors.city.message}</span>
                    </div></fieldset>
            </form>
        </section>
    )
}
export default WeatherBlock;