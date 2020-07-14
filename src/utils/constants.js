import path from 'path';
import moment from 'moment';

export const FILE_FORMAT = moment().subtract(1, 'day').format('MM-DD-YYYY');
export const FILE_PATH = path.join(__static, `/data/${FILE_FORMAT}.json`);
