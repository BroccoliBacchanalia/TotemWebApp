import React from 'react';
import localStyles from './GroupStyles.css';
import { getGeofence, showGroupMemberInfo } from '../../redux/actions';
import { Grid, Image, Button } from 'semantic-ui-react'
import { Link } from 'react-router-dom'

const GroupRow = ({ friend, uid }) => (

    <Grid.Row className={localStyles.gRow}>
      <Grid.Column width={3} className={localStyles.imageDiv}>
        <Image src={friend.img} />
      </Grid.Column>
      <Grid.Column width={7} className={localStyles.centerDiv}>
        <span className="h4">{friend.label}</span>
        <br />
        {friend.position ? getGeofence(friend.position) : ''}
      </Grid.Column>
      <Grid.Column width={6} className={localStyles.buttonDiv}>
        <Link to='/map'> 
          <Button 
            basic 
            className={localStyles.button} 
            icon='marker' 
            size='large' 
            onClick={() => {showGroupMemberInfo(uid)}}/>{' '}
        </Link>
        <Button 
          basic 
          className={localStyles.button} 
          icon='comment outline' 
          size='large' 
          href={'https://m.me/' + friend.facebookID}/>
      </Grid.Column>
    </Grid.Row>
);

export default GroupRow;



