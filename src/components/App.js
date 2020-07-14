import React, { Component } from 'react';
import moment from 'moment';
import { TabContainer, Tab, TabPanel } from './Tabs';
import DailyChart from './DailyChart';
import WeeklyChart from './WeeklyChart';
import MonthlyChart from './MonthlyChart';
import AddCallButton from './AddCallButton';
import GlobalStyle from '../config/GlobalStyle';
import { readDataFromFile, writeDataToFile, getDataFromFiles } from '../utils/fileUtils';
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
      monthlyUnansweredCalls: [],
      monthlyAnsweredCalls: [],
    };
  }

  componentDidMount() {
    this.updateCharts();
  }

  updateCharts() {
    this.getDailyData();
    this.getWeeklyData();
    this.getMonthlyData();
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
    const { unansweredCalls, answeredCalls } = getDataFromFiles(7);
    this.setState({
      weeklyUnansweredCalls: unansweredCalls,
      weeklyAnsweredCalls: answeredCalls,
    });
  }

  getMonthlyData() {
    const { unansweredCalls, answeredCalls } = getDataFromFiles(30);
    this.setState({
      monthlyUnansweredCalls: unansweredCalls,
      monthlyAnsweredCalls: answeredCalls,
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
    this.updateCharts();
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
      monthlyUnansweredCalls,
      monthlyAnsweredCalls,
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
        <TabPanel active={activeTab === '30D'}>
          <MonthlyChart
            unansweredData={monthlyUnansweredCalls}
            answeredData={monthlyAnsweredCalls}
          />
        </TabPanel>
        <GlobalStyle />
      </>
    );
  }
}

export default App;
