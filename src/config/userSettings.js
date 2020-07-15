import fs from 'fs';
import { USER_SETTINGS_PATH } from '../utils/constants';

export const getUserSettings = () => {
  let userSettings = {};
  const rawData = fs.readFileSync(USER_SETTINGS_PATH, 'utf8');
  userSettings = JSON.parse(rawData);
  return userSettings;
};

export const setUserSettings = (settingKey, settingValue) => {
  const userSettings = getUserSettings();
  const newUserSettings = {
    ...userSettings,
    [settingKey]: settingValue,
  };
  const finished = err => {
    if (err) console.error(err);
  };
  fs.writeFileSync(USER_SETTINGS_PATH, JSON.stringify(newUserSettings, null, 2), finished);
};

export const userSettings = getUserSettings();
