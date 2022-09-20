import React from 'react';
import './CityCard.css';
import Graphs from '../Graphs/Graphs';
function CityCard(props) {

    const data = JSON.parse(localStorage.getItem('weather'))
    return (

        <div className='cityCard'>

            <span className='cityCard__title'>{data.location.name}, {data.location.country}</span>
            <span className='cityCard__subtitle'>{data.location.localtime} коор: {data.location.lat}  {data.location.lon}</span>
            <div className='cityCard__info'>
                <div className='cityCard__cell'>
                    <span className='cityCard__property'>Температура</span>
                    <span className='cityCard__property'>{data.current.temp_c}°</span>
                </div>

                <div className='cityCard__cell'>

                    <img className='cityCard__ico' src={data.current.condition.icon} />
                </div>
                <div className='cityCard__cell'>
                    <span className='cityCard__property'>Ветер</span>
                    <span className='cityCard__property'>{data.current.wind_kph}км/ч</span>
                </div>

            </div>
            <span className="cityCard__bottomTitle">Графики по дням средней и минимальной температуры</span>
            <div className='graph__wrapper'>
            {/* {localStorage.getItem('historyWeather') && <Graphs data={props.history} />} */}
            <Graphs data={props.history} />
            </div>


        </div>
    )
}
export default React.memo(CityCard);