import React from 'react';
import { Grid, Image, Icon } from 'semantic-ui-react';

import localStyles from './AgendaStyles.css';
import AgendaModal from './AgendaModal'
import { hourTimeFormat } from '../helperFunctions';
import { removeAgenda } from '../../redux/actions/userActions';

const AgendaRow = ({ itemKey, item }) => {
  let { starttime, endtime } = item;
  const { name, geofence, day, imgurl } = item;
  starttime = hourTimeFormat(starttime);
  endtime = hourTimeFormat(endtime);

  return (
    <Grid.Row className={localStyles.aRow}>
      <Grid.Column className={localStyles.imageDiv} width={3}>
        <Image src={imgurl}/>
      </Grid.Column>
      <Grid.Column className={localStyles.centerDiv}>
        <span className='h4'>{name}</span>
        <br/>
        <span className='h5'>{geofence}</span>
        <br/>
        {starttime + ' - ' + endtime}
      </Grid.Column>
      <Grid.Column
        className={localStyles.clickingDiv}
        width={3}>
        <AgendaModal
          id='agenda'
          itemKey={itemKey}
          name={name}
          starttime={starttime}
          endtime={endtime}
          geofence={geofence}
          day={day}
          imgurl={imgurl}
        />
      </Grid.Column>
    </Grid.Row>
  );
}


export default AgendaRow;
