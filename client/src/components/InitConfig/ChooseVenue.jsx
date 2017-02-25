import React from 'react';
import { connect } from 'react-redux';
import store from '../../redux/store.js';
import { selectVenue, skipVenue } from '../../redux/actions/configActions.js';

export class ChooseVenue extends React.Component {
  render() {

  	return (
      <div>
      <div>Choose Your Venue</div>
      <ul>
        {this.props.venues.map((item, key) => {
          return (
            <li key={key}>
              <div onClick={ selectVenue.bind(this, item.address.line1)}>
              {item.address.line1}
              </div>
            </li>
          )
        })}
      </ul>
      <div onClick={skipVenue}>Skip this step</div>
      </div>
  	)
  }
}

export default connect((store) => {
	return {
		venues: store.config.venues
	}
})(ChooseVenue)
