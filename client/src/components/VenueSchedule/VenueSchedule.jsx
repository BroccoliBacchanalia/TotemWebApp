import React, {Component} from 'react';
//import { Text, View, Picker, ScrollView, Button, TouchableHighlight, Image, TouchableOpacity  } from 'react-native';
// var scheduleDummyData = require('./scheduleDummyData.json');
import scheduleDummyData from './scheduleDummyData.json'
import ScheduleRow from './ScheduleRow.jsx';
//import VenueStyles from './VenueStyles';
import { Route, MemoryRouter as Router } from 'react-router';
//import styles from '../../styles';

function allStages (scheduleDummyData) {

    let obj={};

    scheduleDummyData.forEach(function(item){
      if(!(item.geofence in obj)) {
        obj[item.geofence] = item.geofence;
      }
    });
    return Object.keys(obj);
}

function allDays(scheduleDummyData) {   
    
    let datesDay={};
    console.log("outside: ", scheduleDummyData)
    scheduleDummyData.forEach(function(item){
      if(!(item.day in datesDay)) {
        datesDay[generateDay(item.day)] = item.day;
      }
    });
    return datesDay;
}

function generateDay(dateString) {
  let weekday = new Array(7);
  weekday[0] =  "Sunday";
  weekday[1] = "Monday";
  weekday[2] = "Tuesday";
  weekday[3] = "Wednesday";
  weekday[4] = "Thursday";
  weekday[5] = "Friday";
  weekday[6] = "Saturday";
  var d = new Date(dateString)
  return weekday[d.getDay()];
}

const daysAndDates = allDays(scheduleDummyData);
const days = Object.keys(daysAndDates);
const stages = allStages(scheduleDummyData);

function getArtist(stage, day){
   return scheduleDummyData.filter(function(item){
    if(item.geofence === stage && item.day === daysAndDates[day]) {
      return true
    }
    return false;
  }).map(function(item){
    return item.name;
  }).join("*");

}

export default class VenueSchedule extends Component{
  
  constructor(props) {
      super(props);
      this.state = {
        selectedDay: days[0],
        chooseStage:"",
        selectedDate:"",
      };
  }

  onChangeDay(item) {
    this.setState({selectedDay: item});

   }
  onChangeStage(item) {
    this.setState({chooseStage: item});
  }
  setStageToDefault() {
    this.setState({chooseStage: ""}, () => {
      console.log("after: ", this.state.chooseStage);
    });
  }
  renderDays () {
    return (
      <div>
        {this.renderButton()}
        {days.map((item, key) =>
          <button 
              key={key}
              title={item} 
              onClick = {this.onChangeDay.bind(this, item)}
              value={item}>{item}
          </button>
        )}
      </div>
    );
  }

  renderStages () {
    return (
      <div>
        {stages.map((item, key) => 
        <button
          onClick={this.onChangeStage.bind(this, item)}>
          <div>{item}</div>
          <div>
            {getArtist(item, this.state.selectedDay)}
          </div>
        </button>
        )}
      </div>
    );
  }

  renderButton() {
    return (
      <button
        title="<"
        onClick={this.setStageToDefault.bind(this)}
        value="<"> back
      </button>
    );
  }

  render () {
      console.log(this.state.chooseStage, 'selected stage');
      if(this.state.chooseStage === "") { 
        return (
          <div>
            {this.renderDays()}
            {this.renderStages()}
          </div>
        );
      } 
      return (
        <div>
          {this.renderDays()}
          <ul>
            {
              scheduleDummyData.map((item, key) => {
                if(item.geofence === this.state.chooseStage && item.day === daysAndDates[this.state.selectedDay]) {
                  return (
                    <li>
                    <ScheduleRow 
                      key={key}
                      name={item.name} 
                      startTime = {item.starttime}
                      endTime = {item.endtime}
                      geofence={item.geofence}
                      day={item.day}>
                    </ScheduleRow>
                    </li>
                  );
                 
                } 
              })
            }
          </ul>
        </div>
      );
    } 

}
