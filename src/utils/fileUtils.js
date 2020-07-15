import fs from 'fs';
import { countPropertyInArrOfObj } from './helpers';
import { generateFilenames } from './chartUtils';
import {
  DAILY_FILE_PATH,
  DATA_FILE_DIR,
} from './constants';

export const getDailyDataFromFile = () => {
  const dailyDataset1 = [];
  const dailyDataset2 = [];
  let data = {};
  if (fs.existsSync(DAILY_FILE_PATH)) {
    const rawData = fs.readFileSync(DAILY_FILE_PATH, 'utf8');
    data = JSON.parse(rawData);
  } else {
    console.info(`No file exists at ${DAILY_FILE_PATH}. \nOne will be created when any data is added.`);
  }
  for (let i = 0; i < data.length; i += 1) {
    const { type, x, y } = data[i];
    if (type === 'unanswered') {
      dailyDataset1.push({ x, y });
    }
    if (type === 'answered') {
      dailyDataset2.push({ x, y });
    }
  }
  return {
    dailyDataset1,
    dailyDataset2,
    data,
  };
};

export const writeDataToFile = data => {
  const finished = err => {
    if (err) console.error(err);
  };
  fs.writeFileSync(DAILY_FILE_PATH, JSON.stringify(data, null, 2), finished);
};

export const getDataFromFiles = days => {
  const unansweredCalls = [];
  const answeredCalls = [];
  const filenames = generateFilenames(days);
  for (let i = 0; i < filenames.length; i += 1) {
    if (fs.existsSync(`${DATA_FILE_DIR}/${filenames[i]}`)) {
      const dayData = fs.readFileSync(`${DATA_FILE_DIR}/${filenames[i]}`, 'utf8');
      const parsedDayData = JSON.parse(dayData);
      unansweredCalls.push(countPropertyInArrOfObj(parsedDayData, 'unanswered') - 1);
      answeredCalls.push(countPropertyInArrOfObj(parsedDayData, 'answered') - 1);
    } else {
      unansweredCalls.push(0);
      answeredCalls.push(0);
    }
  }
  return {
    unansweredCalls,
    answeredCalls,
  };
};
