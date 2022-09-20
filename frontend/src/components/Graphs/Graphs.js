import "./Graphs.css";
import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend
} from "recharts";



export default function Graphs(props) {
    const dataArr =[];
    const history = JSON.parse(localStorage.getItem('historyWeather'));
    history.forecast.forecastday.forEach((item, index)=>dataArr[index]=item);
    
    const data = [
        {
          name: dataArr[0].date,
          uv: dataArr[0].day.avgtemp_c,
           pv: dataArr[0].day.mintemp_c,
          amt: 10
        },
        {
          name: dataArr[1].date,
          uv: dataArr[1].day.avgtemp_c,
          pv: dataArr[1].day.mintemp_c,
          amt: 10
        },
        {
          name: dataArr[2].date,
          uv: dataArr[2].day.avgtemp_c,
          pv: dataArr[2].day.mintemp_c,
          amt: 10
        },

        

        {
          name: dataArr[2].date,
          uv: dataArr[3].day.avgtemp_c,
          pv: dataArr[3].day.mintemp_c,
          amt: 10
        }
      ];

  return (
    <LineChart
      width={360}
      height={300}
      data={data}
      margin={{
        top: 5,
        right: 30,
        left: 20,
        bottom: 5
      }}
    >
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="name" />
      <YAxis />
      <Tooltip />
      <Legend />
      <Line
        type="monotone"
        dataKey="pv"
        stroke="#8884d8"
        activeDot={{ r: 4 }}
      />
      <Line type="monotone" dataKey="uv" stroke="#82ca9d" />
    </LineChart>
  );
}