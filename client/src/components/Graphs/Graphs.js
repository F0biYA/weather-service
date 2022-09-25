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

function Graphs(props) {
const dataArr = [];
props.data.forecastday.forEach((item, index)=>dataArr[index] = item );

  const data = [
        {
          name: '1',
          avg: dataArr[0].day.avgtemp_c,
           min: dataArr[0].day.mintemp_c,
          amt: 10
        },
        {
          name: '2',
          avg: dataArr[1].day.avgtemp_c,
          min: dataArr[1].day.mintemp_c,
          amt: 10
        },
        {
          name: '3',
          avg: dataArr[2].day.avgtemp_c,
          min: dataArr[2].day.mintemp_c,
          amt: 10
        },

        

        {
          name: '4',
          avg: dataArr[3].day.avgtemp_c,
          min: dataArr[3].day.mintemp_c,
          amt: 10
        }
      ]

  return (
    <LineChart
      width={360}
      height={220}
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
        dataKey="min"
        stroke="#8884d8"
        activeDot={{ r: 4 }}
      />
      <Line type="monotone" dataKey="avg" stroke="#82ca9d" />
    </LineChart>
  );
}
export default React.memo(Graphs)