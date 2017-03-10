import React, {Component} from 'react';
import store from '../../redux/store';
import { connect } from 'react-redux';

import ScheduleRow from './ScheduleRow.jsx';
import ScheduleNav from './ScheduleNav.jsx';

import { getStagesAndDays } from '../../redux/actions/venueScheduleActions';
import { Grid } from 'semantic-ui-react'

import styles from '../Styles.css';
import localStyles from './VenueStyles.css';

const VenueSchedule = ({ venue, venueSchedule }) => {
  const { stages, days } = getStagesAndDays(venue.scheduleitems);
  const { selectedStage } = venueSchedule;
  const selectedDay = venueSchedule.selectedDay || days[Object.keys(days)[0]];
  return (
    <div>
      <ScheduleNav
        days={days}
        stages={stages}
        selectedDay={selectedDay}
        selectedStage={selectedStage}
        key='nav'
      />
      <div style={{ height: window.innerHeight - 124 }} className={styles.scrollView}>
        <Grid className={localStyles.container}>
          {Object.keys(venue.scheduleitems).map((key, index) => {
            const item = venue.scheduleitems[key];
            if (item) {
              const isSelectedStage = selectedStage === item.geofence || selectedStage === 'All Stages';
              if (item.day === selectedDay && isSelectedStage) {
                return (
                  <ScheduleRow
                    key={index}
                    itemKey={key}
                    item={item}
                    id='row'
                  />
                );
              }
            }
          })}
        </Grid>
        <br/><br/><br/><br/><br/> {/* Spacing for final artist */}
      </div>
    </div>
  );
}

export default connect((store) => {
  return {
    venue: store.venue.venue,
    venueSchedule: store.venueSchedule
  };
})(VenueSchedule);
