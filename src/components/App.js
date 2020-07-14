import React, { Component } from 'react';
import styled, { keyframes } from 'styled-components';
import GlobalStyle from '../config/GlobalStyle';
import DailyChart from './DailyChart';
import { readDataFromFile } from '../utils/fileUtils';

class App extends Component {
  constructor() {
    super();
    this.state = {
      activeTab: '1D',
      answeredData: [],
      unansweredData: [],
    };
  }

  componentDidMount() {
    this.getDailyData();
  }

  getDailyData() {
    const unansweredData = [];
    const answeredData = [];
    const data = readDataFromFile();
    if (!data) return;
    for (let i = 0; i < data.length; i += 1) {
      const { type, x, y } = data[i];
      if (type === 'unanswered') {
        unansweredData.push({ x, y });
      }
      if (type === 'answered') {
        answeredData.push({ x, y });
      }
    }

    this.setState({
      unansweredData,
      answeredData,
    });
  }

  handleActiveTab = event => {
    this.setState({
      activeTab: event.target.name,
    });
  }

  render() {
    const {
      activeTab,
      unansweredData,
      answeredData,
    } = this.state;
    return (
      <>
        <Tabs>
          <Tab
            active={activeTab === '1D'}
            name='1D'
            onClick={this.handleActiveTab}
          >
            Today
          </Tab>
          <Tab
            active={activeTab === '7D'}
            name='7D'
            onClick={this.handleActiveTab}
          >
            7 Days
          </Tab>
          <Tab
            active={activeTab === '30D'}
            name='30D'
            onClick={this.handleActiveTab}
          >
            30 Days
          </Tab>
        </Tabs>
        <TabPanel active={activeTab === '1D'}>
          <DailyChart
            unansweredData={unansweredData}
            answeredData={answeredData}
          />
        </TabPanel>
        <TabPanel active={activeTab === '7D'}>7D</TabPanel>
        <TabPanel active={activeTab === '30D'}>30D</TabPanel>
        <GlobalStyle />
      </>
    );
  }
}

const Tabs = styled.div`
  overflow: hidden;
  background-color: #333333;
`;

const Tab = styled.button`
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

const fade = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`;
const TabPanel = styled.div`
  display: ${props => (props.active ? 'block' : 'none')};
  padding: 6px 12px;
  animation: ${fade} 0.5s;
`;

export default App;
