import React from "react";
import './InfoPopup.css';
import statusOk from '../../images/success.svg';
import statusFail from '../../images/denied.svg';
function InfoPopup(props) {

    return (
        <div className={props.infoPopup ? `popup popup_opened` : `popup `}>
        <div className="popup__container">
            <button
                onClick={props.close}
                className="popup__button-close"
                type="button"
            />
            <img
                className="popup__info-image"
                src={props.status ? statusOk : statusFail}
                alt="Статус"
            />
            <h2 className="popup__text">
                {props.status
                    ? "Вы успешно зарегистрировались!"
                    : props.error
                }
            </h2>
        </div>
    </div>
    )
}
export default InfoPopup;
