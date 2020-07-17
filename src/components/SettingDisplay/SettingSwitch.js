import React from 'react';
import styled from 'styled-components';
import Switch from 'react-switch';

const offColor = '#858585';
const onColor = '#4abd5c';

const SettingSwitch = ({
  label,
  id,
  onChange,
  checked,
}) => (
  <SwitchLabel>
    {label}
    <Switch
      id={id}
      onChange={onChange}
      checked={checked}
      offColor={offColor}
      onColor={onColor}
      width={40}
      height={16}
    />
  </SwitchLabel>
);

const SwitchLabel = styled.label`
  display: flex;
  align-items: center;
  margin-left: 10px;
  margin-bottom: 3px;
`;

export default SettingSwitch;
