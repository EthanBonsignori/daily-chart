import React, { Component } from 'react';
import moment from 'moment';
import Switch from 'react-switch';
import DailyChart from './DailyChart';
import WeeklyChart from './WeeklyChart';
import MonthlyChart from './MonthlyChart';
import AddDataButton from './AddDataButton';
import GlobalStyle from '../config/GlobalStyle';
import {
  writeUserSettingsToFile,
  getUserSettingsFromFile,
} from '../config/userSettings';
import {
  TabContainer,
  Tab,
  TabPanel,
} from './Tabs';
import {
  getDailyDataFromFile,
  writeDataToFile,
  getDataFromFiles,
} from '../utils/fileUtils';
import {
  isEmptyObj,
  countPropertyInArrOfObj,
} from '../utils/helpers';
import { generateChartLabels } from '../utils/chartUtils';

class App extends Component {
  constructor() {
    super();
    this.state = {
      activeTab: '1D',
      dailyDataset1: [],
      dailyDataset2: [],
      weeklyLabels: [],
      weeklyUnansweredCalls: [],
      weeklyAnsweredCalls: [],
      monthlyUnansweredCalls: [],
      monthlyAnsweredCalls: [],
      userSettings: {
        hideWeekends: false,
      },
    };
  }

  componentDidMount() {
    this.updateUserSettingsState();
  }

  updateUserSettingsState() {
    const userSettings = getUserSettingsFromFile();
    this.setState(prevState => ({
      ...prevState.userSettings,
      userSettings,
    }));
    this.updateCharts();
  }

  updateCharts() {
    this.getDailyData();
    this.getWeeklyData();
    this.getMonthlyData();
  }

  getDailyData() {
    const { dailyDataset1, dailyDataset2 } = getDailyDataFromFile();
    this.setState({
      dailyDataset1,
      dailyDataset2,
    });
  }

  getWeeklyData() {
    const { unansweredCalls, answeredCalls } = getDataFromFiles(7);
    const weeklyLabels = generateChartLabels(7);
    this.setState({
      weeklyUnansweredCalls: unansweredCalls,
      weeklyAnsweredCalls: answeredCalls,
      weeklyLabels,
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
    const { data } = getDailyDataFromFile();
    const newCallData = {
      type: typeOfCall,
      x: moment(),
      y: 1,
    };
    let toBeWrittenData = [newCallData];
    if (!isEmptyObj(data)) {
      const numOfCalls = countPropertyInArrOfObj(data, typeOfCall);
      newCallData.y = numOfCalls;
      toBeWrittenData = [...data, newCallData];
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
    const userSettings = { ...this.state.userSettings };
    userSettings[id] = checked;
    writeUserSettingsToFile(id, checked);
    this.updateUserSettingsState();
  }

  render() {
    const {
      activeTab,
      dailyDataset1,
      dailyDataset2,
      weeklyLabels,
      weeklyUnansweredCalls,
      weeklyAnsweredCalls,
      monthlyUnansweredCalls,
      monthlyAnsweredCalls,
      userSettings,
    } = this.state;
    console.log('user settings in render: ', userSettings);
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
            unansweredData={dailyDataset1}
            answeredData={dailyDataset2}
          />
          <AddDataButton name='unanswered' onClick={this.handleAddData}>Add Unanswered Call</AddDataButton>
          <AddDataButton name='answered' onClick={this.handleAddData}>Add Answered Call</AddDataButton>
        </TabPanel>
        <TabPanel active={activeTab === '7D'}>
          <WeeklyChart
            labels={weeklyLabels}
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
        <label>
          <span style={{ color: '#fff' }}>Hide Weekend Dates?</span>
          <Switch
            id='hideWeekends'
            onChange={this.handleSwitchToggle}
            checked={userSettings.hideWeekends}
            offColor='#858585'
            onColor='#4abd5c'
          />
        </label>
        <GlobalStyle />
      </>
    );
  }
}

export default App;
