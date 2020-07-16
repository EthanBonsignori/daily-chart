import fs from 'fs';
import { countPropertyInArrOfObj } from './helpers';
import { generateFilenames } from './chartUtils';
import {
  DAILY_FILE_PATH,
  DATA_FILE_DIR,
} from './constants';

export const getDailyDataFromFile = () => {
  const dataset1 = [];
  const dataset2 = [];
  let data = {};
  if (fs.existsSync(DAILY_FILE_PATH)) {
    const rawData = fs.readFileSync(DAILY_FILE_PATH, 'utf8');
    data = JSON.parse(rawData);
  } else {
    console.info(`No file exists at ${DAILY_FILE_PATH}. \nOne will be created when any data is added.`);
  }
  for (let i = 0; i < data.length; i += 1) {
    const { type, x, y } = data[i];
    if (type === 'dataset1') {
      dataset1.push({ x, y });
    }
    if (type === 'dataset2') {
      dataset2.push({ x, y });
    }
  }
  return {
    dataset1,
    dataset2,
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
  const dataset1 = [];
  const dataset2 = [];
  const filenames = generateFilenames(days);
  for (let i = 0; i < filenames.length; i += 1) {
    if (fs.existsSync(`${DATA_FILE_DIR}/${filenames[i]}`)) {
      const dayData = fs.readFileSync(`${DATA_FILE_DIR}/${filenames[i]}`, 'utf8');
      const parsedDayData = JSON.parse(dayData);
      dataset1.push(countPropertyInArrOfObj(parsedDayData, 'dataset1') - 1);
      dataset2.push(countPropertyInArrOfObj(parsedDayData, 'dataset2') - 1);
    } else {
      dataset1.push(0);
      dataset2.push(0);
    }
  }
  return {
    dataset1,
    dataset2,
  };
};
