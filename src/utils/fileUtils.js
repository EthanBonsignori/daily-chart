import fs from 'fs';
import moment from 'moment';
import { DAILY_FILE_PATH, DATA_FILE_DIR } from './constants';
import { getNumOfCallFromType } from './helpers';

export const readDataFromFile = () => {
  let data = {};
  if (!fs.existsSync(DAILY_FILE_PATH)) {
    console.info('No file for today exists. One will be created when data is added.');
    return data;
  }
  const rawData = fs.readFileSync(DAILY_FILE_PATH, 'utf8');
  data = JSON.parse(rawData);
  return data;
};

export const writeDataToFile = data => {
  const finished = err => {
    if (err) console.error(err);
  };
  fs.writeFileSync(DAILY_FILE_PATH, JSON.stringify(data, null, 2), finished);
};

export const generateWeeklyFilenames = () => {
  const weeklyFileNames = [];
  for (let i = 0; i < 7; i += 1) {
    const fileName = moment().subtract(i, 'days').format('MM-DD-YYYY');
    weeklyFileNames.push(`${fileName}.json`);
  }
  return weeklyFileNames;
};

export const getDataFromWeeklyFiles = () => {
  const weeklyUnansweredCalls = [];
  const weeklyAnsweredCalls = [];
  const weeklyFileNames = generateWeeklyFilenames();
  for (let i = 0; i < weeklyFileNames.length; i += 1) {
    if (fs.existsSync(`${DATA_FILE_DIR}/${weeklyFileNames[i]}`)) {
      const dayData = fs.readFileSync(`${DATA_FILE_DIR}/${weeklyFileNames[i]}`, 'utf8');
      const parsedDayData = JSON.parse(dayData);
      weeklyUnansweredCalls.push(getNumOfCallFromType(parsedDayData, 'unanswered'));
      weeklyAnsweredCalls.push(getNumOfCallFromType(parsedDayData, 'answered'));
    } else {
      weeklyUnansweredCalls.push(0);
      weeklyAnsweredCalls.push(0);
    }
  }
  return {
    weeklyUnansweredCalls,
    weeklyAnsweredCalls,
  };
};
