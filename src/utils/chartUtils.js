import moment from 'moment';
import { getUserSettingsFromFile } from '../config/userSettings';

export const generateFilenames = days => {
  const userSettings = getUserSettingsFromFile();
  const filenames = [];
  let i = 0;
  while (filenames.length < days) {
    const filenameDate = moment().subtract(i, 'days').format('MM-DD-YYYY');
    const dayOfTheWeek = moment(filenameDate, 'MM-DD-YYYY').isoWeekday();
    if (userSettings.hideWeekends && dayOfTheWeek !== 6 && dayOfTheWeek !== 7) {
      filenames.push(`${filenameDate}.json`);
    } else if (!userSettings.hideWeekends) {
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
