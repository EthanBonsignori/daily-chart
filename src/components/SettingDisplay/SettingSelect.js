import React from 'react';
import styled from 'styled-components';
import moment from 'moment';

const hoursAM = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];
const hoursPM = [12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23];

const SettingSelect = ({
  id,
  value,
  onChange,
}) => {
  let hours = hoursAM;
  if (id === 'yAxisEnd') hours = hoursPM;
  return (
    <Select id={id} value={value} onChange={onChange}>
      {hours.map(hour => <option key={hour} value={hour}>{moment().hour(hour).format('h')}</option>)}
    </Select>
  );
};

const Select = styled.select`
  margin-left: 2rem;
`;

export default SettingSelect;
