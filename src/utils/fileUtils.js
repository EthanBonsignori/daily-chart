import fs from 'fs';
import { FILE_PATH } from './constants';

export const readDataFromFile = () => {
  let data = {};
  if (!fs.existsSync(FILE_PATH)) {
    console.info('No file for today exists yet. One will be created when data is added.');
    return data;
  }
  const rawData = fs.readFileSync(FILE_PATH, 'utf8');
  data = JSON.parse(rawData);
  return data;
};

export const writeDataToFile = data => {
  const finished = err => {
    if (err) console.error(err);
  };
  fs.writeFileSync(FILE_PATH, JSON.stringify(data, null, 2), finished);
};
