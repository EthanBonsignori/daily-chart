import styled, { keyframes } from 'styled-components';

const fade = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`;

export default styled.div`
  display: ${props => (props.active ? 'block' : 'none')};
  box-sizing: border-box;
  padding: 6px 12px;
  animation: ${fade} 0.5s;
`;
