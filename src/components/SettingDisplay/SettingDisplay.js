import React from 'react';
import SettingsContainer from './SettingsContainer';
import SettingsTitle from './SettingsTitle';
import SettingsColumn from './SettingsColumn';

const SettingDisplay = ({ children }) => (
  <SettingsContainer>
    <SettingsTitle>Settings</SettingsTitle>
    <SettingsColumn leftLabel='Feature' centerLabel='Display Text' rightLabel='Hide/Show'>
      {children}
    </SettingsColumn>
  </SettingsContainer>
);

export default SettingDisplay;
