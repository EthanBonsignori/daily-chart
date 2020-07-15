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
      weeklyDataset1: [],
      weeklyDataset2: [],
      monthlyLabels: [],
      monthlyDataset1: [],
      monthlyDataset2: [],
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
    const { dataset1, dataset2 } = getDataFromFiles(7);
    const weeklyLabels = generateChartLabels(7);
    this.setState({
      weeklyDataset1: dataset1,
      weeklyDataset2: dataset2,
      weeklyLabels,
    });
  }

  getMonthlyData() {
    const { dataset1, dataset2 } = getDataFromFiles(30);
    const monthlyLabels = generateChartLabels(30);
    this.setState({
      monthlyDataset1: dataset1,
      monthlyDataset2: dataset2,
      monthlyLabels,
    });
  }

  handleAddData = event => {
    const typeOfData = event.target.name;
    const { data } = getDailyDataFromFile();
    const newDataPoint = {
      type: typeOfData,
      x: moment(),
      y: 1,
    };
    let toBeWrittenData = [newDataPoint];
    if (!isEmptyObj(data)) {
      const newDataPointY = countPropertyInArrOfObj(data, typeOfData);
      newDataPoint.y = newDataPointY;
      toBeWrittenData = [...data, newDataPoint];
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
      weeklyDataset1,
      weeklyDataset2,
      monthlyLabels,
      monthlyDataset1,
      monthlyDataset2,
      userSettings,
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
            unansweredData={dailyDataset1}
            answeredData={dailyDataset2}
          />
          <AddDataButton name='dataset1' onClick={this.handleAddData}>Add Unanswered Call</AddDataButton>
          <AddDataButton name='dataset2' onClick={this.handleAddData}>Add Answered Call</AddDataButton>
        </TabPanel>
        <TabPanel active={activeTab === '7D'}>
          <WeeklyChart
            labels={weeklyLabels}
            dataset1={weeklyDataset1}
            dataset2={weeklyDataset2}
          />
        </TabPanel>
        <TabPanel active={activeTab === '30D'}>
          <MonthlyChart
            labels={monthlyLabels}
            dataset1={monthlyDataset1}
            dataset2={monthlyDataset2}
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
