import fs from 'fs';
import React, { Component } from 'react';
import moment from 'moment';
import DailyChart from './DailyChart';
import WeeklyChart from './WeeklyChart';
import AddCallButton from './AddCallButton';
import GlobalStyle from '../config/GlobalStyle';
import { TabContainer, Tab, TabPanel } from './Tabs';
import { readDataFromFile, writeDataToFile, getDataFromWeeklyFiles } from '../utils/fileUtils';
import { isEmptyObj, getNumOfCallFromType } from '../utils/helpers';

class App extends Component {
  constructor() {
    super();
    this.state = {
      activeTab: '1D',
      dailyUnansweredCalls: [],
      dailyAnsweredCalls: [],
      weeklyUnansweredCalls: [],
      weeklyAnsweredCalls: [],
    };
  }

  componentDidMount() {
    this.getDailyData();
    this.getWeeklyData();
  }

  getDailyData() {
    const dailyUnansweredCalls = [];
    const dailyAnsweredCalls = [];
    const data = readDataFromFile();
    if (!data) return;
    for (let i = 0; i < data.length; i += 1) {
      const { type, x, y } = data[i];
      if (type === 'unanswered') {
        dailyUnansweredCalls.push({ x, y });
      }
      if (type === 'answered') {
        dailyAnsweredCalls.push({ x, y });
      }
    }
    this.setState({
      dailyUnansweredCalls,
      dailyAnsweredCalls,
    });
  }

  getWeeklyData() {
    const { weeklyUnansweredCalls, weeklyAnsweredCalls } = getDataFromWeeklyFiles();
    console.log(weeklyUnansweredCalls);
    this.setState({
      weeklyUnansweredCalls,
      weeklyAnsweredCalls,
    });
  }

  handleAddCall = event => {
    const typeOfCall = event.target.name;
    const existingData = readDataFromFile();
    const newCallData = {
      type: typeOfCall,
      x: moment(),
      y: 1,
    };
    let toBeWrittenData = [newCallData];
    if (!isEmptyObj(existingData)) {
      /* eslint-disable-next-line */
      const numOfCalls = getNumOfCallFromType(existingData, typeOfCall)
      newCallData.y = numOfCalls;
      toBeWrittenData = [...existingData, newCallData];
    }

    writeDataToFile(toBeWrittenData);
    return this.getDailyData();
  }

  handleActiveTab = event => {
    this.setState({
      activeTab: event.target.name,
    });
  }

  render() {
    const {
      activeTab,
      dailyUnansweredCalls,
      dailyAnsweredCalls,
      weeklyUnansweredCalls,
      weeklyAnsweredCalls,
    } = this.state;
    return (
      <>
        <TabContainer>
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
        </TabContainer>
        <TabPanel active={activeTab === '1D'}>
          <DailyChart
            unansweredData={dailyUnansweredCalls}
            answeredData={dailyAnsweredCalls}
          />
          <AddCallButton name='unanswered' onClick={this.handleAddCall}>Add Unanswered Call</AddCallButton>
          <AddCallButton name='answered' onClick={this.handleAddCall}>Add Answered Call</AddCallButton>
        </TabPanel>
        <TabPanel active={activeTab === '7D'}>
          <WeeklyChart
            unansweredData={weeklyUnansweredCalls}
            answeredData={weeklyAnsweredCalls}
          />
        </TabPanel>
        <TabPanel active={activeTab === '30D'}>30D</TabPanel>
        <GlobalStyle />
      </>
    );
  }
}

export default App;
