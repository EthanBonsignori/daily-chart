import React from 'react';
import { Line } from 'react-chartjs-2';
import { dailyOptions } from '../config/dailyChartConfig';

const DailyChart = props => {
  const data = {
    datasets: [
      {
        label: 'Unanswered',
        backgroundColor: ['rgba(255, 99, 132, 0.2)'],
        borderColor: ['rgba(255, 99, 132, 1)'],
        pointBorderColor: 'rgba(255, 99, 132, 1)',
        pointBackgroundColor: 'rgba(179, 52, 79, 1)',
        data: props.unansweredData,
      },
      {
        label: 'Answered',
        backgroundColor: ['rgba(99, 255, 124, 0.2)'],
        borderColor: ['rgba(99, 255, 124, 1)'],
        pointBorderColor: 'rgba(99, 255, 124, 1)',
        pointBackgroundColor: 'rgba(99, 255, 124, 0.2)',
        data: props.answeredData,
      },
    ],
  };
  return (
    <Line
      data={data}
      options={dailyOptions}
    />
  );
};

export default DailyChart;
