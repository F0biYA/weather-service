import React from "react";
import Charts from "../Charts/Charts";
import Graphs from "../Graphs/Graphs";
import './GraphPopup.css';

function GraphPopup(props) {
console.log(props.data)
        return (
        <div className={ `graph__popup ${props.data && 'popup_opened'}`}>
            <button type='button' onClick={props.close} className="graphPopup__button-close hover">Закрыть</button>
            <div className="graphPopup__container">
                <span className="graphPopup__title">  Cредняя и минимальная температура  </span>
                <div className='graph__wrapper'>
                {props.isOpen === true &&   <Graphs data={props.data}/>}
                </div>
                <span className="graphPopup__title">Вероятность дождя</span>
                <div className='graph__wrapper'>
                {props.isOpen === true &&   <Charts data={props.data}/>}
                </div>
            </div>

        </div>
    )
}
export default GraphPopup;