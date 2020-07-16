import React from 'react';
import styled from 'styled-components';
import Switch from 'react-switch';

const offColor = '#858585';
const onColor = '#4abd5c';

const SettingsSwitch = props => (
  <SwitchLabel>
    <Switch
      id={props.id}
      onChange={props.onChange}
      checked={props.checked}
      offColor={offColor}
      onColor={onColor}
      width={40}
      height={16}
    />
    <SwitchText>{props.label}</SwitchText>
  </SwitchLabel>
);

const SwitchLabel = styled.label`
  display: flex;
  align-items: center;
  margin-left: 10px;
  margin-bottom: 3px;
`;

const SwitchText = styled.span`
  color: #fff;
  margin: 0 10px;
`;

export default SettingsSwitch;
