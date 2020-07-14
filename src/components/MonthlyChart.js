import React from 'react';
import { Bar } from 'react-chartjs-2';
import { monthlyOptions } from '../config/chartOptions';
import { generateFilenames } from '../utils/fileUtils';

function generateMonthlyLabels() {
  const monthlyLabels = [];
  const monthlyFiles = generateFilenames(30);
  for (let i = 0; i < monthlyFiles.length; i += 1) {
    monthlyLabels.push(monthlyFiles[i].slice(0, -10));
  }
  return monthlyLabels;
}

const MonthlyChart = props => {
  const data = {
    labels: generateMonthlyLabels(),
    datasets: [
      {
        label: 'Unanswered Calls',
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
        borderColor: 'rgba(255, 99, 132, 1)',
        borderWidth: 1,
        data: props.unansweredData,
      },
      {
        label: 'Answered Calls',
        backgroundColor: 'rgba(99, 255, 124, 0.2)',
        borderColor: 'rgba(99, 255, 124, 1)',
        borderWidth: 1,
        data: props.answeredData,
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
