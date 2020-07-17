import React from 'react';
import styled from 'styled-components';
import SettingSwitch from './SettingSwitch';

const SettingContainer = ({
  type,
  name,
  subname,
  id,
  value,
  onChange,
}) => {
  const subnameJSX = subname ? <SettingLabelSub>({subname})</SettingLabelSub> : null;
  return (
    <SettingWrapper type={type}>
      {type === 'input'
        ? <><SettingInputLabel htmlFor={id}>{name} </SettingInputLabel>
          <SettingInput id={id} value={value} onChange={onChange} /></>
        : <><label htmlFor={id}>{name}</label>
          <SettingSwitch id={id} checked={value} onChange={onChange} /></>
      }
      {subnameJSX}
    </SettingWrapper>
  );
};

const SettingWrapper = styled.div`
  display: flex;
  flex-wrap: nowrap;
  align-items: center;
  justify-content: ${props => (props.type === 'input' ? 'flex-start' : 'flex-end')};
  width: 100%;
  margin-top: 3px;
`;

const SettingInputLabel = styled.label`
  display: inline-block;
  width: 70px;
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
