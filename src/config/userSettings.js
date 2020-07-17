import fs from 'fs';
import { USER_SETTINGS_PATH } from '../utils/constants';

// Defaults
let defaultUserSettings = {
  stacked: false,
  showWeekends: false,
  showLegends: false,
  showXAxisLabel: false,
  showYAxisLabel: false,
  showChartLabel: false,
  showDataset1: false,
  showDataset2: false,
  chartLabel: '[Data Points]',
  dataset1Label: '[Dataset 1]',
  dataset2Label: '[Dataset 2]',
};

const finishedWriting = err => {
  if (err) console.error(err);
};

export const getUserSettingsFromFile = () => {
  if (fs.existsSync(USER_SETTINGS_PATH)) {
    const rawData = fs.readFileSync(USER_SETTINGS_PATH, 'utf8');
    defaultUserSettings = JSON.parse(rawData);
  } else {
    fs.writeFileSync(USER_SETTINGS_PATH, JSON.stringify(defaultUserSettings, null, 2), finishedWriting);
  }
  return defaultUserSettings;
};

export const writeUserSettingToFile = (settingKey, settingValue) => {
  const existingUserSettings = getUserSettingsFromFile();
  const newUserSettings = {
    ...existingUserSettings,
    [settingKey]: settingValue,
  };
  fs.writeFileSync(USER_SETTINGS_PATH, JSON.stringify(newUserSettings, null, 2), finishedWriting);
};

export const writeUserSettingsToFile = settings => {
  const existingUserSettings = getUserSettingsFromFile();
  const newUserSettings = {
    ...existingUserSettings,
    ...settings,
  };
  fs.writeFileSync(USER_SETTINGS_PATH, JSON.stringify(newUserSettings, null, 2), finishedWriting);
};

export const userSettings = getUserSettingsFromFile();
