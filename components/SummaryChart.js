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

const SummaryChart = () => {
  const data = [
    {
      name: '1 AM',
      Dispatch: 11,
      Efficiency: 0.5
    },
    {
      name: '2 AM',
      Dispatch: 9,
      Efficiency: 1.0
    },
    {
      name: '3 AM',
      Dispatch: 11,
      Efficiency: 0.5
    },
    {
      name: '4 AM',
      Dispatch: 9,
      Efficiency: 1.0
    },
    {
      name: '5 AM',
      Dispatch: 11,
      Efficiency: 0.5
    },
    {
      name: '6 AM',
      Dispatch: 9,
      Efficiency: 1.1
    },
    {
      name: '7 AM',
      Dispatch: 11,
      Efficiency: 0.5
    },
    {
      name: '8 AM',
      Dispatch: 9,
      Efficiency: 1.0
    }
    // ... and so on for the other months
  ];

  return (
    <BarChart
      width={800}
      height={350}
      data={data}
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
