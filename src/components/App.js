import React, { Component } from 'react';
import moment from 'moment';
import Switch from 'react-switch';
import DailyChart from './DailyChart';
import WeeklyChart from './WeeklyChart';
import MonthlyChart from './MonthlyChart';
import AddDataButton from './AddDataButton';
import GlobalStyle from '../config/GlobalStyle';
import {
  TabContainer,
  Tab,
  TabPanel,
} from './Tabs';
import {
  readDataFromFile,
  writeDataToFile,
  getDataFromFiles,
} from '../utils/fileUtils';
import {
  isEmptyObj,
  countPropertyInArrOfObj,
} from '../utils/helpers';

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
      weekendIsChecked: false,
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

  handleAddData = event => {
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
      const numOfCalls = countPropertyInArrOfObj(existingData, typeOfCall)
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

  handleSwitchToggle = (checked, event, id) => {
    this.setState({
      [id]: checked,
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
          <AddDataButton name='unanswered' onClick={this.handleAddData}>Add Unanswered Call</AddDataButton>
          <AddDataButton name='answered' onClick={this.handleAddData}>Add Answered Call</AddDataButton>
          <label>
            Show weekend dates?
            <Switch
              id='weekendIsChecked'
              onChange={this.handleSwitchToggle}
              checked={this.state.weekendIsChecked}
              offColor='#858585'
              onColor='#4abd5c'
            />
          </label>
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
