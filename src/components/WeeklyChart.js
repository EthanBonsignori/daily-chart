import React from 'react';
import { Bar } from 'react-chartjs-2';
import moment from 'moment';

const WeeklyChart = props => {
  const {
    labels,
    dataset1,
    dataset2,
    dataset1Label,
    dataset2Label,
    stacked,
    chartLabel,
    showChartLabel,
    showLegend,
    showXAxisLabel,
    showYAxisLabel,
  } = props;

  const data = {
    labels,
    datasets: [
      {
        label: dataset1Label,
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
        borderColor: 'rgba(255, 99, 132, 1)',
        borderWidth: 1,
        data: dataset1,
      },
      {
        label: dataset2Label,
        backgroundColor: 'rgba(99, 255, 124, 0.2)',
        borderColor: 'rgba(99, 255, 124, 1)',
        borderWidth: 1,
        data: dataset2,
      },
    ],
  };

  const firstDay = moment(labels[labels.length - 1], 'MM-DD');
  const lastDay = moment(labels[0], 'MM-DD');

  const options = {
    title: {
      display: showChartLabel,
      text: `Number of ${chartLabel} from ${moment(firstDay).format('MM/DD')} to ${moment(lastDay).format('MM/DD')}`,
      fontSize: 14,
    },
    legend: {
      display: showLegend,
    },
    scales: {
      xAxes: [{
        stacked,
        scaleLabel: {
          display: showXAxisLabel,
          labelString: 'Days',
        },
        ticks: {
          reverse: true,
        },
      }],
      yAxes: [{
        stacked,
        scaleLabel: {
          display: showYAxisLabel,
          labelString: `Number of ${chartLabel}`,
        },
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
