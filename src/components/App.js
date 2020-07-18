import React, { Component } from 'react';
import moment from 'moment';
import { singular } from 'pluralize';
import DailyChart from './DailyChart';
import WeeklyChart from './WeeklyChart';
import MonthlyChart from './MonthlyChart';
import GlobalStyle from '../config/GlobalStyle';
import {
  TabContainer,
  Tab,
  TabPanel,
} from './Tabs';
import {
  DataButtonContainer,
  DataButton,
} from './DataButton';
import {
  SettingDisplay,
  SettingsColumn,
  Setting,
} from './SettingDisplay';
import {
  writeUserSettingToFile,
  getUserSettingsFromFile,
  writeUserSettingsToFile,
} from '../config/userSettings';
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
        stacked: false,
        showWeekends: false,
        showLegends: false,
        showXAxisLabel: false,
        showYAxisLabel: false,
        showChartLabel: false,
        showDataset1: false,
        showDataset2: false,
        chartLabel: 'loading',
        dataset1Label: 'loading',
        dataset2Label: 'loading',
      },
    };
  }

  componentDidMount() {
    this.updateUserSettingsState();
    this.updateCharts();
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
    const { dataset1, dataset2 } = getDailyDataFromFile();
    this.setState({
      dailyDataset1: dataset1,
      dailyDataset2: dataset2,
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
    const { name } = event.target;
    this.setState({
      activeTab: name,
    });
  }

  handleSettingSwitch = (checked, event, id) => {
    writeUserSettingToFile(id, checked);
    this.updateUserSettingsState();
  }

  handleSettingInput = event => {
    const { id, value } = event.target;
    const { userSettings } = this.state;
    userSettings[id] = value;
    this.setState({ userSettings });
    writeUserSettingsToFile(userSettings);
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

    const {
      stacked,
      showWeekends,
      showLegends,
      showXAxisLabel,
      showYAxisLabel,
      showChartLabel,
      showDataset1,
      showDataset2,
      chartLabel,
      dataset1Label,
      dataset2Label,
    } = userSettings;

    return (
      <>
        <TabContainer>
          <Tab active={activeTab === '1D'} name='1D' onClick={this.handleActiveTab}>Today</Tab>
          <Tab active={activeTab === '7D'} name='7D' onClick={this.handleActiveTab}>7 Days</Tab>
          <Tab active={activeTab === '30D'} name='30D' onClick={this.handleActiveTab}>30 Days</Tab>
        </TabContainer>
        <TabPanel active={activeTab === '1D'}>
          <DailyChart
            dataset1={dailyDataset1}
            dataset2={dailyDataset2}
            dataset1Label={dataset1Label}
            dataset2Label={dataset2Label}
            showDataset1={showDataset1}
            showDataset2={showDataset2}
            chartLabel={chartLabel}
            showChartLabel={showChartLabel}
            showLegend={showLegends}
            showXAxisLabel={showXAxisLabel}
            showYAxisLabel={showYAxisLabel}
          />
        </TabPanel>
        <TabPanel active={activeTab === '7D'}>
          <WeeklyChart
            labels={weeklyLabels}
            dataset1={weeklyDataset1}
            dataset2={weeklyDataset2}
            dataset1Label={dataset1Label}
            dataset2Label={dataset2Label}
            showDataset1={showDataset1}
            showDataset2={showDataset2}
            stacked={stacked}
            chartLabel={chartLabel}
            showChartLabel={showChartLabel}
            showLegend={showLegends}
            showXAxisLabel={showXAxisLabel}
            showYAxisLabel={showYAxisLabel}
            showWeekends={showWeekends}
          />
        </TabPanel>
        <TabPanel active={activeTab === '30D'}>
          <MonthlyChart
            labels={monthlyLabels}
            dataset1={monthlyDataset1}
            dataset2={monthlyDataset2}
            dataset1Label={dataset1Label}
            dataset2Label={dataset2Label}
            showDataset1={showDataset1}
            showDataset2={showDataset2}
            stacked={stacked}
            chartLabel={chartLabel}
            showChartLabel={showChartLabel}
            showLegend={showLegends}
            showXAxisLabel={showXAxisLabel}
            showYAxisLabel={showYAxisLabel}
          />
        </TabPanel>
        <DataButtonContainer>
          <DataButton name='dataset1' onClick={this.handleAddData}>Add {singular(dataset1Label)}</DataButton>
          <DataButton name='dataset2' onClick={this.handleAddData}>Add {singular(dataset2Label)}</DataButton>
        </DataButtonContainer>
        <SettingDisplay>
          <SettingsColumn width='60%' leftLabel='Customize Chart'>
            <Setting
              type='input'
              name='Title'
              subname='plural type of data'
              id='chartLabel'
              value={chartLabel}
              onChange={this.handleSettingInput}
            />
            <Setting
              type='input'
              name='Dataset 1'
              subname='i.e. Spam Calls'
              id='dataset1Label'
              value={dataset1Label}
              onChange={this.handleSettingInput}
            />
            <Setting
              type='input'
              name='Dataset 2'
              subname='i.e. Other Calls'
              id='dataset2Label'
              value={dataset2Label}
              onChange={this.handleSettingInput}
            />
          </SettingsColumn>
          <SettingsColumn width='40%' rightLabel='Hide/Show'>
            <Setting
              type='switch'
              name='Chart Title'
              id='showChartLabel'
              value={showChartLabel}
              onChange={this.handleSettingSwitch}
            />
            <Setting
              type='switch'
              name='Weekend Dates'
              id='showWeekends'
              value={showWeekends}
              onChange={this.handleSettingSwitch}
            />
            <Setting
              type='switch'
              name='Stacked Bars'
              id='stacked'
              value={stacked}
              onChange={this.handleSettingSwitch}
            />
            <Setting
              type='switch'
              name='Legend'
              id='showLegends'
              value={showLegends}
              onChange={this.handleSettingSwitch}
            />
            <Setting
              type='switch'
              name='X Axis Label'
              id='showXAxisLabel'
              value={showXAxisLabel}
              onChange={this.handleSettingSwitch}
            />
            <Setting
              type='switch'
              name='Y Axis Label'
              id='showYAxisLabel'
              value={showYAxisLabel}
              onChange={this.handleSettingSwitch}
            />
          </SettingsColumn>
        </SettingDisplay>
        <GlobalStyle />
      </>
    );
  }
}

export default App;
