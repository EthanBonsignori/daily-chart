import styled from 'styled-components';

export default styled.button`
  color: #fff;
  background-color: ${props => (props.active ? '#454545' : '#333333')};
  box-shadow: ${props => (props.active ? '0px -4px 0px rgba(99, 255, 124, 1) inset' : '')};
  border: none;
  float: left;
  outline: none;
  cursor: pointer;
  padding: 14px 16px;
  transition: 0.3s;

  &:hover {
    background-color: #454545;
  }
`;
