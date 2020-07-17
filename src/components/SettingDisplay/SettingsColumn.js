import React from 'react';
import styled from 'styled-components';

const SettingsColumn = ({
  leftLabel,
  centerLabel,
  rightLabel,
  children,
}) => (
  <SettingsCol>
    <SettingsColHeader>
      <SettingsColSubtitle align='left'>{leftLabel}</SettingsColSubtitle>
      <SettingsColSubtitle align='center'>{centerLabel}</SettingsColSubtitle>
      <SettingsColSubtitle align='right'>{rightLabel}</SettingsColSubtitle>
    </SettingsColHeader>
    {children}
  </SettingsCol>
);

const SettingsCol = styled.div`
  display: flex;
  flex-direction: column;
  width: 50%;
`;

const SettingsColHeader = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  padding-left: 10px;
`;

const SettingsColSubtitle = styled.span`
  color: #888;
  width: 50%;
  margin-bottom: 3px;
  text-align: ${props => (props.align)};
`;

export default SettingsColumn;
