import React from 'react';
import styled from 'styled-components';
import SettingSwitch from './SettingSwitch';
import SettingSelect from './SettingSelect';

const SettingContainer = ({
  type,
  name,
  subname,
  id,
  value,
  onChange,
}) => {
  let inputJSX = null;
  switch (type) {
  case 'input':
    inputJSX = <>
      <SettingInputLabel htmlFor={id}>{name} </SettingInputLabel>
      <SettingInput id={id} value={value} onChange={onChange} /></>;
    break;
  case 'switch':
    inputJSX = <>
      <label htmlFor={id}>{name}</label>
      <SettingSwitch id={id} checked={value} onChange={onChange} /></>;
    break;
  case 'select':
    inputJSX = <>
      <SettingInputLabel htmlFor={id}>{name}</SettingInputLabel>
      <SettingSelect id={id} value={value} onChange={onChange}></SettingSelect></>;
    break;
  default:
    inputJSX = <span>No/Improper Type Passed to Setting Component</span>;
    break;
  }
  const subnameJSX = subname ? <SettingLabelSub>({subname})</SettingLabelSub> : null;
  return (
    <SettingWrapper type={type}>
      {inputJSX}
      {subnameJSX}
    </SettingWrapper>
  );
};

const SettingWrapper = styled.div`
  display: flex;
  flex-wrap: nowrap;
  align-items: center;
  justify-content: ${props => (props.type === 'switch' ? 'flex-end' : 'flex-start')};
  width: 100%;
  margin-top: 3px;
`;

const SettingInputLabel = styled.label`
  display: inline-block;
  width: 75px;
  text-align: left;
`;

const SettingLabelSub = styled.span`
  font-size: 80%;
  color: #555;
  margin-left: 5px;
`;

const SettingInput = styled.input`
  margin-left: 2rem;
`;

export default SettingContainer;
