import React from 'react';
import { Line } from 'react-chartjs-2';
import moment from 'moment';
import { removeTypeProperty } from '../utils/chartUtils';

const DailyChart = props => {
  const data = {
    datasets: [
      {
        label: 'Unanswered',
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
        borderColor: 'rgba(255, 99, 132, 1)',
        pointBorderColor: 'rgba(255, 99, 132, 1)',
        pointBackgroundColor: 'rgba(179, 52, 79, 1)',
        data: removeTypeProperty(props.dataset1),
      },
      {
        label: 'Answered',
        backgroundColor: 'rgba(99, 255, 124, 0.2)',
        borderColor: 'rgba(99, 255, 124, 1)',
        pointBorderColor: 'rgba(99, 255, 124, 1)',
        pointBackgroundColor: 'rgba(99, 255, 124, 0.2)',
        data: removeTypeProperty(props.dataset2),
      },
    ],
  };

  const options = {
    title: {
      display: true,
      text: `Calls to Unemployment on ${moment().format('M/DD/YYYY')}`,
      fontSize: 18,
    },
    legend: {
      display: !props.hideLegend,
    },
    scales: {
      xAxes: [{
        scaleLabel: {
          display: true,
          labelString: 'Hour',
        },
        type: 'time',
        time: {
          unit: 'hour',
        },
        ticks: {
          min: moment().startOf('day').add(8, 'hours'),
          max: moment().endOf('day').subtract(6, 'hours'),
        },
      }],
      yAxes: [{
        scaleLabel: {
          display: true,
          labelString: '# of Calls',
        },
        ticks: {
          beginAtZero: true,
          suggestedMin: 0,
          suggestedMax: 20,
        },
      }],
    },
  };

  return (
    <Line
      data={data}
      options={options}
    />
  );
};

export default DailyChart;
