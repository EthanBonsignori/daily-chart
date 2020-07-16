import fs from 'fs';
import { USER_SETTINGS_PATH } from '../utils/constants';

const finished = err => {
  if (err) console.error(err);
};

export const getUserSettingsFromFile = () => {
  // Defaults
  let userSettings = {
    hideWeekends: true,
    stacked: true,
    hideLegends: true,
  };
  if (fs.existsSync(USER_SETTINGS_PATH)) {
    const rawData = fs.readFileSync(USER_SETTINGS_PATH, 'utf8');
    userSettings = JSON.parse(rawData);
  } else {
    fs.writeFileSync(USER_SETTINGS_PATH, JSON.stringify(userSettings, null, 2), finished);
  }
  return userSettings;
};

export const writeUserSettingToFile = (settingKey, settingValue) => {
  const existingUserSettings = getUserSettingsFromFile();
  const newUserSettings = {
    ...existingUserSettings,
    [settingKey]: settingValue,
  };
  fs.writeFileSync(USER_SETTINGS_PATH, JSON.stringify(newUserSettings, null, 2), finished);
};

export const userSettings = getUserSettingsFromFile();
