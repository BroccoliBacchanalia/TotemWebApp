import React, {Component} from 'react';
import { Text, View, Picker, ScrollView, Button, TouchableHighlight, Image, TouchableOpacity  } from 'react-native';
import scheduleDummyData from './scheduleDummyData.json'
import ScheduleRow from './ScheduleRow';
import VenueStyles from './VenueStyles';
import { Route, MemoryRouter as Router } from 'react-router';
import styles from '../../styles';

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
      <View style={VenueStyles.dayBar}>
        {this.renderButton()}
        {days.map((item, key) =>
          <Button 
              key={key}
              title={item} 
              onPress = {this.onChangeDay.bind(this, item)}
              value={item}>
          </Button>
        )}
      </View>
    );
  }
  renderStages () {
    return (
      <View style={VenueStyles.center}>
        {stages.map((item, key) => 
          <TouchableOpacity
            style={VenueStyles.selection}
            onPress={this.onChangeStage.bind(this, item)}>
            <Text style={styles.textMed}>{item}</Text>
            <Text style={VenueStyles.textSm}>
              {getArtist(item, this.state.selectedDay)}
            </Text>
          </TouchableOpacity>
        )}
      </View>
    );
  }
  renderButton() {
    return (
      <Button
        title="<"
        onPress={this.setStageToDefault.bind(this)}
        value="<">
      </Button>
    );
  }
  render () {
      console.log(this.state.chooseStage, 'selected stage');
      if(this.state.chooseStage === "") { 
        return (
          <View>
            {this.renderDays()}
            {this.renderStages()}
          </View>
        );
      } 
      return (
        <View>
          {this.renderDays()}
          <View style={styles.thinLine} />
          <ScrollView>
            {
              scheduleDummyData.map((item, key) => {
                if(item.geofence === this.state.chooseStage && item.day === daysAndDates[this.state.selectedDay]) {
                  return (
                    <ScheduleRow 
                      key={key}
                      name={item.name} 
                      startTime = {item.starttime}
                      endTime = {item.endtime}
                      geofence={item.geofence}
                      day={item.day}>
                    </ScheduleRow>
                  );
                 
                } 
              })
            }
          </ScrollView>
        </View>
      );
    } 

}
