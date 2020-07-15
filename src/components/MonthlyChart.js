import React from 'react';
import { Bar } from 'react-chartjs-2';
import { monthlyOptions } from '../config/chartOptions';

const MonthlyChart = props => {
  const data = {
    labels: props.labels,
    datasets: [
      {
        label: 'Unanswered Calls',
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
        borderColor: 'rgba(255, 99, 132, 1)',
        borderWidth: 1,
        data: props.dataset1,
      },
      {
        label: 'Answered Calls',
        backgroundColor: 'rgba(99, 255, 124, 0.2)',
        borderColor: 'rgba(99, 255, 124, 1)',
        borderWidth: 1,
        data: props.dataset2,
      },
    ],
  };

  return (
    <Bar
      data={data}
      options={monthlyOptions}
    />
  );
};

export default MonthlyChart;
