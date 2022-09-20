import React from 'react';
import CityCard from '../CityCard/CityCard';
import Header from '../Header/Header';
import WeatherBlock from '../WeatherBlock/WeatherBlock';


function Main(props) {

const  getCards =(data) =>{  return data.map((item, index)=> {return (<CityCard city={item} index={index}/>)})}


    const date = new Date();


     return (   
     <main className="content">
            
            <Header signOut={props.signOut}/>
            <WeatherBlock submitCity={props.submitCity}/>
            {localStorage.getItem('weather') && localStorage.getItem('historyWeather') && <CityCard city={props.cities}/>}

                
        </main>
            )
}
            export default Main;