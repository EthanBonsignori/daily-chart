import fs from 'fs';
import { USER_SETTINGS_PATH } from '../utils/constants';

export const getUserSettingsFromFile = () => {
  let userSettings = {};
  const rawData = fs.readFileSync(USER_SETTINGS_PATH, 'utf8');
  userSettings = JSON.parse(rawData);
  return userSettings;
};

export const writeUserSettingsToFile = (settingKey, settingValue) => {
  const existingUserSettings = getUserSettingsFromFile();
  const newUserSettings = {
    ...existingUserSettings,
    [settingKey]: settingValue,
  };
  const finished = err => {
    if (err) console.error(err);
  };
  fs.writeFileSync(USER_SETTINGS_PATH, JSON.stringify(newUserSettings, null, 2), finished);
};

export const userSettings = getUserSettingsFromFile();
