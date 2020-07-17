import React from 'react';
import { Line } from 'react-chartjs-2';
import moment from 'moment';
import { removeTypeProperty } from '../utils/chartUtils';

const DailyChart = props => {
  const {
    dataset1,
    dataset2,
    dataset1Label,
    dataset2Label,
    chartLabel,
    showChartLabel,
    showLegend,
    showXAxisLabel,
    showYAxisLabel,
  } = props;

  const data = {
    datasets: [
      {
        label: dataset1Label,
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
        borderColor: 'rgba(255, 99, 132, 1)',
        pointBorderColor: 'rgba(255, 99, 132, 1)',
        pointBackgroundColor: 'rgba(179, 52, 79, 1)',
        data: removeTypeProperty(dataset1),
      },
      {
        label: dataset2Label,
        backgroundColor: 'rgba(99, 255, 124, 0.2)',
        borderColor: 'rgba(99, 255, 124, 1)',
        pointBorderColor: 'rgba(99, 255, 124, 1)',
        pointBackgroundColor: 'rgba(99, 255, 124, 0.2)',
        data: removeTypeProperty(dataset2),
      },
    ],
  };

  const options = {
    title: {
      display: showChartLabel,
      text: `Number of ${chartLabel} on ${moment().format('M/DD/YYYY')}`,
      fontSize: 14,
    },
    legend: {
      display: showLegend,
    },
    scales: {
      xAxes: [{
        scaleLabel: {
          display: showXAxisLabel,
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
          display: showYAxisLabel,
          labelString: `Number of ${chartLabel}`,
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
