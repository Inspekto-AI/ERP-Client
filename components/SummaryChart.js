import React from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend
} from 'recharts';

const SummaryChart = ({hourlyPackerData, hourlyLoaderData, shift, filter}) => {
  // const dataPackerChart =[];
  // const updatedHourlyPackerData = [];

  // // for(let i = 0; i < hourlyPackerData.length; i++){
  // //   if(hourlyPackerData[i] )
  // //   updatedHourlyPackerData[i] =
  // // }
 
  // {!filter && hourlyPackerData && Object.keys(hourlyPackerData)?.map((key) => {
  //   // const key1 = key;
  //   const value = hourlyPackerData[key];
  //   const a = {
  //     name: key >=12 ? key == 12 ? '12 PM': `${key-12} PM`: key == 0 ? '12 AM' : `${key} AM`,
  //     Dispatch: value,
  //     Efficiency: 0
  //   }
    
  //   dataPackerChart.push(a)
  // })}
  // const dataLoaderChart = []
  // // console.log(hourlyLoaderData)
  // {filter && hourlyLoaderData && Object.keys(hourlyLoaderData)?.map((key) => {
  //   // const key1 = key;
  //   const value = hourlyLoaderData[key];
  //   const a = {
  //     name: key >=12 ? key == 12 ? '12 PM': `${key-12} PM`: key == 0 ? '12 AM' : `${key} AM`,
      
  //     Dispatch: value,
  //     Efficiency: 0
  //   }
    
  //   dataLoaderChart.push(a)
  // })}

  // console.log(hourlyPackerData)

  
  return (
    <BarChart
      width={800}
      height={350}
      data={filter === 0 ? hourlyPackerData: hourlyLoaderData}
      margin={{
        top: 40,
        left: 20,
        Efficiency: 30,
        Dispatch: 20,
        bottom: 5
      }}
    >
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="name" label={{ position: 'insideBottom', dy: 10 }} />
      <YAxis
        yAxisId="Dispatch"
        orientation="left"
        stroke="#3A71A5"
        label={{
          value: 'Packer Dispatch in 1000 days',
          angle: -90,
          // position: 'insideDispatch',
          dx: -15, // Adjust the position horizontally
          dy: -20, // Adjust the position vertically
          style: {
            fontSize: '12px',
            color: '#3A71A5',
            fontWeight: '300'
          }
        }}
      />
      <YAxis
        yAxisId="Efficiency"
        orientation="right"
        stroke="#DA63B1"
        label={{
          value: 'Packing Efficiency in tons/hr',
          angle: -90,
          // position: 'insideEfficiency',
          dx: 15, // Adjust the position horizontally
          dy: -20, // Adjust the position vertically
          style: {
            fontSize: '12px',
            color: '#B5179E',
            fontWeight: '300'
          }
        }}
      />
      <Tooltip />

      <Legend verticalAlign="top" height={36} />
      <Bar yAxisId="Dispatch" dataKey="Dispatch" fill="#3A71A5" barSize={15} />
      <Bar
        yAxisId="Efficiency"
        dataKey="Efficiency"
        fill="#DA63B1"
        barSize={15}
      />
    </BarChart>
  );
};

export default SummaryChart;
