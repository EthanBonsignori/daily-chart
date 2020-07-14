import React, { Component } from 'react';
import moment from 'moment';
import GlobalStyle from '../config/GlobalStyle';
import { TabContainer, Tab, TabPanel } from './Tabs';
import AddCallButton from './AddCallButton';
import DailyChart from './DailyChart';
import { readDataFromFile, writeDataToFile } from '../utils/fileUtils';
import { isEmptyObj } from '../utils/helpers';

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
    const existingData = readDataFromFile();
    const newCallData = {
      type: typeOfCall,
      x: moment(),
      y: 1,
    };
    let toBeWrittenData = [newCallData];
    if (!isEmptyObj(existingData)) {
      /* eslint-disable-next-line */
      const numOfCalls = existingData.reduce((acc, cur) => (cur.type === typeOfCall ? ++acc : acc), 0) + 1;
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
      unansweredData,
      answeredData,
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
            unansweredData={unansweredData}
            answeredData={answeredData}
          />
          <AddCallButton name='unanswered' onClick={this.handleAddCall}>Add Unanswered Call</AddCallButton>
          <AddCallButton name='answered' onClick={this.handleAddCall}>Add Answered Call</AddCallButton>
        </TabPanel>
        <TabPanel active={activeTab === '7D'}>7D</TabPanel>
        <TabPanel active={activeTab === '30D'}>30D</TabPanel>
        <GlobalStyle />
      </>
    );
  }
}

export default App;
