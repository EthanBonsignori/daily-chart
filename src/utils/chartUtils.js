import moment from 'moment';
import { getUserSettingsFromFile } from '../config/userSettings';

export const generateFilenames = days => {
  const { showWeekends } = getUserSettingsFromFile();
  const filenames = [];
  let i = 0;
  while (filenames.length < days) {
    const filenameDate = moment().subtract(i, 'days').format('MM-DD-YYYY');
    const dayOfTheWeek = moment(filenameDate, 'MM-DD-YYYY').isoWeekday();
    if (showWeekends) {
      filenames.push(`${filenameDate}.json`);
      // dayOfTheWeek 6|7 === saturday|sunday
    } else if (!showWeekends && dayOfTheWeek < 6) {
      filenames.push(`${filenameDate}.json`);
    }
    i += 1;
  }
  return filenames;
};

export const generateChartLabels = days => {
  const labels = [];
  const filenames = generateFilenames(days);
  for (let i = 0; i < filenames.length; i += 1) {
    labels.push(filenames[i].slice(0, -10));
  }
  return labels;
};

export const removeTypeProperty = arr => arr.map(obj => ({
  x: obj.x,
  y: obj.y,
}));
