import React from 'react';
import styles from './AuthStyles.css';
import { Grid } from 'semantic-ui-react'

export default class Loading extends React.Component {
	render(){
		return (
      <Grid>
        <Grid.Row>
          <Grid.Column width={7} />
          <Grid.Column width={7} >
            <div className={styles.img}>
              <img src='img/loading.gif'/>
            </div>
          </Grid.Column>
        </Grid.Row>
      </Grid>
 
    )
  }
}

