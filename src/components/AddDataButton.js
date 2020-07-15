import styled from 'styled-components';

export default styled.a`
  display: inline-block;
  cursor: pointer;
  padding: 0.35em 1.2em;
  margin:0 0.3em 0.3em 0;
  border-radius:0.12em;
  box-sizing: border-box;
  text-decoration:none;

  font-weight:300;
  color:#FFFFFF;
  text-align:center;
  transition: all 0.2s;

  border: ${props => (props.name === 'unanswered'
    ? '0.1em solid rgba(255, 99, 132, 1);'
    : '0.1em solid rgba(99, 255, 124, 1);'
  )};

  &:hover {
    background-color: ${props => (props.name === 'unanswered'
    ? 'rgba(255, 99, 132, 0.2);'
    : 'rgba(99, 255, 124, 0.2)'
  )};
  }
`;
