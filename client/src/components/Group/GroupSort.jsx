import React from 'react';
import { Button, Grid } from 'semantic-ui-react'
import localStyles from './GroupStyles.css';
import { sortUsers } from '../../redux/actions/sortActions';

const SortGroup = () => {
  const icons = [
    { path:'sort alphabet ascending', method: 'sortAZ' },
    { path: 'map signs', method: 'geofence' },
    { path: 'street view', method: 'proximity' }
  ];
  return (
    <Grid columns={3} divided>
      <Grid.Row>
          {icons.map((icon, index) => (
            <Grid.Column key={index} className={localStyles.icon}>
              <Button
                className={localStyles.gButton}
                className={localStyles.sort}
                key={index}
                onClick={() => sortUsers(icon.method)}
                icon={{name:icon.path, size:'big'}}
              />
            </Grid.Column>
          ))}
      </Grid.Row>
    </Grid>
  );
}

export default SortGroup;
