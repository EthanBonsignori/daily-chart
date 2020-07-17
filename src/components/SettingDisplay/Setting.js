import React from 'react';
import styled from 'styled-components';
import SettingSwitch from './SettingSwitch';

const SettingContainer = props => {
  const {
    name,
    subname,
    inputID,
    switchID,
    inputValue,
    checked,
    onChangeInput,
    onChangeSwitch,
  } = props;
  return (
    <SettingWrapper>
      <SettingLabel htmlFor={inputID}>
        {name}
        {subname ? <SettingLabelSub> ({subname})</SettingLabelSub> : null }
      </SettingLabel>
      <SettingInput id={inputID} value={inputValue} onChange={onChangeInput} />
      <SettingSwitch id={switchID} checked={checked} onChange={onChangeSwitch} />
    </SettingWrapper>
  );
};

const SettingWrapper = styled.div`
  display: flex;
  flex-wrap: nowrap;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  padding-left: 12px;
  margin-top: 3px;
`;

const SettingLabel = styled.label`
  margin-left: 5px;
`;

const SettingLabelSub = styled.span`
  font-size: 80%;
  color: #555;
`;

const SettingInput = styled.input`
  
`;

export default SettingContainer;
