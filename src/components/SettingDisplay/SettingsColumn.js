import React from 'react';
import styled from 'styled-components';

const SettingsColumn = ({
  width,
  leftLabel,
  centerLabel,
  rightLabel,
  children,
}) => (
  <SettingsCol width={width}>
    <SettingsColHeader>
      <SettingsColSubtitle align='left'>{leftLabel}</SettingsColSubtitle>
      <SettingsColSubtitle align='center'>{centerLabel}</SettingsColSubtitle>
      <SettingsColSubtitle align='right'>{rightLabel}</SettingsColSubtitle>
    </SettingsColHeader>
    {children}
  </SettingsCol>
);

const SettingsCol = styled.div`
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  width: ${props => (props.width)};
  padding: 10px;
`;

const SettingsColHeader = styled.div`
  display: flex;
  justify-content: space-between;
`;

const SettingsColSubtitle = styled.span`
  color: #888;
  margin-bottom: 3px;
  text-align: ${props => (props.align)};
`;

export default SettingsColumn;
