import moment from 'moment';

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

export const weeklyOptions = 'placeholder';
