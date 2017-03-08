import React from 'react';
import localStyles from './AgendaStyles.css';
import { Grid, Image, Icon } from 'semantic-ui-react';
/* Actions */
import { removeAgenda } from '../../redux/actions/userActions';
import AgendaModal from './AgendaModal'

const AgendaRow = ({ itemKey, name, startTime, endTime, geofence, day, imgurl }) => (
  <Grid.Row className={localStyles.aRow}>
    <Grid.Column className={localStyles.imageDiv} width={3}>
      <Image src={imgurl}/>
    </Grid.Column>
    <Grid.Column className={localStyles.centerDiv}>
      <span className='h4'>{name}</span>
      <br/>
      <span className='h5'>{geofence}</span>
      <br/>
      {startTime.slice(0,-6)+" "+startTime.slice(startTime.length-2)+" "+
        " - "+endTime.slice(0,-6)+" "+endTime.slice(endTime.length-2)}
    </Grid.Column>
    <Grid.Column
      className={localStyles.clickingDiv}
      width={3}>
      <AgendaModal 
        itemKey={itemKey}
        name={name}
        startTime = {startTime}
        endTime = {endTime}
        geofence={geofence}
        day={day}
        id='agenda'
        imgurl={imgurl}
      />
    </Grid.Column>
  </Grid.Row>
);

export default AgendaRow;


