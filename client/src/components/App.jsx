import React from 'react';
import Map from './Map.jsx';

export default class App extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      place: 'Hack+Reactor',
      city: 'San+Francisco+CA',
      api_key: 'AIzaSyCBb0bm-_wNIf3oDMi-5PN_zeOf1bRWstI'
    }
  }
  render() {
    return (
      <div>
        Hello Bacchanalian
        <Map place={this.state.place} city={this.state.city} api_key={this.state.api_key}/>
      </div>
    )
  }
}
