import React from 'react';
import { BarChart, Bar, XAxis, YAxis, 
    CartesianGrid } from 'recharts';
  
function Charts (props)  {
    const dataArr = [];
    props.data.forecastday.forEach((item, index)=>dataArr[index] = item );
 
    const data = [
        { name: '1', x: dataArr[0].day.daily_chance_of_rain},
        { name: '2', x: dataArr[1].day.daily_chance_of_rain},
        { name: '3', x: dataArr[2].day.daily_chance_of_rain},
        { name: '4', x: dataArr[3].day.daily_chance_of_rain},

    ];
  
    return (
        <BarChart width={360} height={220} data={data} >
            <CartesianGrid />
            <XAxis dataKey="name" />
            <YAxis />
            <Bar dataKey="x" stackId="a" fill="#8884d8" />
            
        </BarChart>
    );
}
  
export default Charts;