import fs from 'fs';
import { FILE_PATH } from './constants';

export const readDataFromFile = () => {
  if (!fs.existsSync(FILE_PATH)) {
    return console.info('No file for today exists yet. One will be created when data is added.');
  }
  const data = fs.readFile(FILE_PATH, 'utf8', (err, rawData) => {
    if (err) {
      return console.error('Error reading file from data directory.', err);
    }
    const parsedData = JSON.parse(rawData);
    return parsedData;
  });
  return data;
};

export const placeholder = '';
