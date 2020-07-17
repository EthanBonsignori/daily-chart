import React from 'react';
import SettingsContainer from './SettingsContainer';
import SettingsTitle from './SettingsTitle';

const SettingDisplay = ({ children }) => (
  <SettingsContainer>
    <SettingsTitle>Settings</SettingsTitle>
    {children}
  </SettingsContainer>
);

export default SettingDisplay;
