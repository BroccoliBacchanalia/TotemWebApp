import React from 'react';
import localStyles from './GroupStyles.css';
import { getGeofence, showGroupMemberInfo } from '../../redux/actions';
import { Grid, Image, Button } from 'semantic-ui-react'
import { Link } from 'react-router-dom'

const GroupRow = ({ friend, uid }) => (

  <Grid celled className={localStyles.grid}>
    <Grid.Row className={localStyles.gRow}>
      <Grid.Column width={3}>
        <Image src={friend.img} />
      </Grid.Column>
      <Grid.Column width={8} className={localStyles.centerDiv}>
        <span className="h3">{friend.label}</span>
        <br />
        {friend.position ? getGeofence(friend.position) : ''}
      </Grid.Column>
      <Grid.Column width={5} className={localStyles.buttonDiv}>
        <Link to='/map'> 
          <Button basic className={localStyles.button} icon='marker' size='large' onClick={() => {
            showGroupMemberInfo(uid)}}/>{' '}
        </Link>
        <Button basic className={localStyles.button} icon='comment outline' size='large' />
      </Grid.Column>
    </Grid.Row>
  </Grid>
);

export default GroupRow;



