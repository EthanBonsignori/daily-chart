import moment from 'moment';

export const dailyDatasets = [
  {
    label: 'Unanswered',
    backgroundColor: ['rgba(255, 99, 132, 0.2)'],
    borderColor: ['rgba(255, 99, 132, 1)'],
    pointBorderColor: 'rgba(255, 99, 132, 1)',
    pointBackgroundColor: 'rgba(179, 52, 79, 1)',
    data: [],
  },
  {
    label: 'Answered',
    backgroundColor: ['rgba(99, 255, 124, 0.2)'],
    borderColor: ['rgba(99, 255, 124, 1)'],
    pointBorderColor: 'rgba(99, 255, 124, 1)',
    pointBackgroundColor: 'rgba(99, 255, 124, 0.2)',
    data: [],
  },
];

export const dailyOptions = {
  title: {
    display: true,
    text: `Calls to Unemployment on ${moment().format('M/DD/YYYY')}`,
    fontSize: 18,
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
