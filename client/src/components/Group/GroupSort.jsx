import React from 'react';
import { Button, Grid } from 'semantic-ui-react'
import localStyles from './GroupStyles.css';
import { sortUsers } from '../../redux/actions/sortActions';

const SortGroup = () => {
  const icons = [
    { path:'sort alphabet ascending', method: 'sortAZ', color: localStyles.azButton },
    { path: 'map signs', method: 'geofence', color: localStyles.gfButton },
    { path: 'street view', method: 'proximity', color: localStyles.pxButton }
  ];
  return (
    <Grid columns={3} divided>
      <Grid.Row className={localStyles.sortRow}>
          {icons.map((icon, index) => (
            <Grid.Column
              key={index}
              className={localStyles.icon}
            >
              <Button
                className={localStyles.gButton}
                className={icon.color}
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
