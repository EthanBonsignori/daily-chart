import React from 'react';
import { Bar } from 'react-chartjs-2';
import moment from 'moment';

const WeeklyChart = props => {
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

  const firstDay = props.labels[props.labels.length - 1];
  const lastDay = props.labels[0];

  const options = {
    title: {
      display: true,
      text: `Calls to Unemployment from ${moment(firstDay).format('MM/DD')} to ${moment(lastDay).format('MM/DD')}`,
    },
    legend: {
      display: !props.hideLegend,
    },
    scales: {
      xAxes: [{
        stacked: props.stacked,
        ticks: {
          reverse: true,
        },
      }],
      yAxes: [{
        stacked: props.stacked,
        ticks: {
          beginAtZero: false,
        },
      }],
    },
  };
  return (
    <Bar
      data={data}
      options={options}
    />
  );
};

export default WeeklyChart;
