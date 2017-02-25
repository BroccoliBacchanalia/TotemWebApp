import React from 'react';
import localStyles from './GroupStyles.css';
import { getGeofence } from '../../redux/actions/locationActions.js'

export default class GroupRow extends React.Component {

  render() {
    const { friend } = this.props
    return (
      <div className={localStyles.gRow + " clearfix"}>
        <img src={friend.img}/>
        <div>
          <p>
            <span className="h3">{friend.label}</span>
            <br/>
            { /*getGeofence(friend.position)*/ }
          </p>
        </div>
      </div>
    )
  }
}



