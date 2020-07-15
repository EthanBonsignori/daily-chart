import path from 'path';
import moment from 'moment';

export const FILE_FORMAT = moment().format('MM-DD-YYYY');
export const DAILY_FILE_PATH = path.join(__static, `/data/${FILE_FORMAT}.json`);
export const DATA_FILE_DIR = path.join(__static, '/data/');
export const USER_SETTINGS_PATH = path.join(__static, 'userSettings.json');
