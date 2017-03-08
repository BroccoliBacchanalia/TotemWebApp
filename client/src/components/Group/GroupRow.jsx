import React from 'react';
import localStyles from './GroupStyles.css';
import { getGeofence, showGroupMemberInfo } from '../../redux/actions';
import { Grid, Image, Button, Modal } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import GroupMemberModal from './GroupMemberModal'

const GroupRow = ({ friend, uid }) => (

    <Grid.Row className={localStyles.gRow}>
      <Grid.Column width={3} className={localStyles.imageDiv}>
        <Image src={friend.img} />
      </Grid.Column>
      <Grid.Column width={10} className={localStyles.centerDiv}>
        <span className="h4">{friend.label}</span>
        <br />
        {friend.position ? getGeofence(friend.position) : ''}
        <br />
        <span className={localStyles.timestamp}> Last updated at: { ' ' + 
          new Date(friend.position.timestamp).toString().substring(0, 3) + ' ' + 
          new Date(friend.position.timestamp).toString().substring(15, 21)} 
        </span>
      </Grid.Column>
      <Grid.Column width={3} className={localStyles.buttonDiv}>
        <GroupMemberModal friend={friend} uid={uid} />
      </Grid.Column>
    </Grid.Row>
);

export default GroupRow;





        






