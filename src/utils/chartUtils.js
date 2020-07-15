import moment from 'moment';

export const generateFilenames = days => {
  const filenames = [];
  for (let i = 0; i < days; i += 1) {
    const filenameDate = moment().subtract(i, 'days').format('MM-DD-YYYY');
    const dayOfTheWeek = moment(filenameDate).isoWeekday();
    console.log(dayOfTheWeek);
    if (true && dayOfTheWeek !== 6 && dayOfTheWeek !== 7) {
      filenames.push(`${filenameDate}.json`);
    } else {
      filenames.push(`${filenameDate}.json`);
    }
  }
  return filenames;
};

export const generateChartLabels = numberOfDays => {
  const monthlyLabels = [];
  const monthlyFiles = generateFilenames(numberOfDays);
  for (let i = 0; i < monthlyFiles.length; i += 1) {
    monthlyLabels.push(monthlyFiles[i].slice(0, -10));
  }
  return monthlyLabels;
};

export const removeTypeProperty = arr => arr.map(obj => ({
  x: obj.x,
  y: obj.y,
}));
