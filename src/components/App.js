import React, { Component } from 'react';
import styled, { keyframes } from 'styled-components';
import moment from 'moment';
import GlobalStyle from '../config/GlobalStyle';
import DailyChart from './DailyChart';
import { readDataFromFile, writeDataToFile } from '../utils/fileUtils';

class App extends Component {
  constructor() {
    super();
    this.state = {
      activeTab: '1D',
      unansweredData: [],
      answeredData: [],
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

  handleAddCall = event => {
    const typeOfCall = event.target.name;
    const { unansweredData, answeredData } = this.state;
    const numOfUnansweredCalls = unansweredData.length;
    const numOfAnsweredCalls = answeredData.length;
    let newCall = {
      type: typeOfCall,
      x: moment(),
      y: 1,
    };
    switch (typeOfCall) {
    case 'unanswered':
      if (numOfUnansweredCalls <= 0) {
        return writeDataToFile(newCall);
      }
      newCall = [{
        ...newCall,
        y: numOfUnansweredCalls,
      }];
      return writeDataToFile([...unansweredData, newCall]);
    case 'answered':
      if (numOfAnsweredCalls <= 0) {
        return writeDataToFile(newCall);
      }
      newCall = {
        ...newCall,
        y: numOfAnsweredCalls,
      };
      return writeDataToFile([...answeredData, newCall]);
    default:
      return writeDataToFile(newCall);
    }

    // return this.getDailyData();
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
          <AddCall
            name='unanswered'
            onClick={this.handleAddCall}
          >Add Unanswered Call</AddCall>
          <AddCall
            name='answered'
            onClick={this.handleAddCall}
          >Add Answered Call</AddCall>
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

const AddCall = styled.a`
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

export default App;
