import React, { useState} from 'react';
import './CityCard.css';
import GraphPopup from '../GraphPopup/GraphPopup';
function CityCard(props) {

const [isOpen, setIsOpen] = useState(false);

const handleDelete= () =>{
const city = props.cities.filter((item, i)=> i === props.index ?  item._id: console.log('ne to'))
      props.delete(city[0]._id);
    }
const openGraph = () => setIsOpen(true);
const closeGraph = () => setIsOpen(false);

    return (<>
        <div className='cityCard'>
            <button type='button' className='cityCard__delete-button hover' onClick={handleDelete}></button>
            <div onClick={openGraph} className='cityCard__container hover'>
            <span className='cityCard__title'>{props.city.location.name}, {props.city.location.country}</span>
            <span className='cityCard__subtitle'>{props.city.location.localtime} коор: {props.city.location.lat}  {props.city.location.lon}</span>
            <div className='cityCard__info'>
                <div className='cityCard__cell'>
                    <span className='cityCard__property'>Температура</span>
                    <span className='cityCard__property'>{props.city.current.temp_c}°</span>
                </div>

                <div className='cityCard__cell'>

                    <img className='cityCard__ico' src={props.city.current.condition.icon} />
                </div>
                <div className='cityCard__cell'>
                    <span className='cityCard__property'>Ветер</span>
                    <span className='cityCard__property'>{props.city.current.wind_kph}км/ч</span>
                </div>

            </div>
            </div>
        </div>
        {isOpen === true && <GraphPopup isOpen={isOpen} close={closeGraph} data={props.city.forecast}/>}
        </>

    )
}
//export default React.memo(CityCard);
export default CityCard;
