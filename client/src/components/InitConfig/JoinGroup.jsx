import React from 'react'
import { Card, Icon } from 'semantic-ui-react'
import localStyles from './ConfigStyles.css';


const JoinGroup = ({groupName, friendsInGroup, membersInGroup}) => (
  <Card className={localStyles.gCard}>
    <Card.Content header={groupName} className={localStyles.gCardHeader}/>
    <Card.Content description={friendsInGroup} />
    <Card.Content extra>
      <Icon name='user' />
        {membersInGroup + ' members in this group'}
    </Card.Content>
  </Card>
)

export default JoinGroup
