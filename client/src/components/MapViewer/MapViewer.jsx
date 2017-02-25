import { connect } from 'react-redux';
import React, { Component } from 'react';
import { withGoogleMap, GoogleMap, Marker, OverlayView } from 'react-google-maps';
import Helmet from 'react-helmet';
import GroundOverlay from '../GroundOverlay';
import localStyles from './MapStyles.css';

class MapViewer extends Component {

  render() {
    const users = this.props.users;
    console.log('users', users);
    const userKeys = Object.keys(users);

    const LoadMap = withGoogleMap(props => (
      <GoogleMap
        ref={props.onMapLoad}
        defaultZoom={16}
        defaultCenter={{ lat: 37.769403, lng: -122.49}}
        mapTypeId= 'terrain'
        >
        {userKeys.map((userKey, index) => {
          const user = users[userKey];
          const icon = {
            url: user.img,
            scaledSize: new google.maps.Size(30, 30),
            origin: new google.maps.Point(0,0),
            anchor: new google.maps.Point(0, 0),
            labelOrigin: new google.maps.Point(15, 35)
          };
          return (
            <Marker
              key={index}
              {...user}
              icon={icon}>
            </Marker>
          )
        })}

        <GroundOverlay
          image='https://s3-us-west-2.amazonaws.com/elasticbeanstalk-us-west-2-307385678134/outside_lands.png'
          opacity={0.7}
          imageBounds={{
            north: 37.771614,
            south: 37.765553, //6118
            east: -122.481277,
            west: -122.496346
          }
        }/>
      </GoogleMap>
    ));

    return (
      <div className={localStyles.googleMap}>
        <Helmet title="Totem"/>
        <LoadMap
          containerElement={ <div/> }
          mapElement={ <div style={{ height: window.innerHeight - 50 }} /> }
          onMapLoad={this.handleMapLoad.bind(this)}
        />
      </div>
    );
  }

  handleMapLoad(map) {
    this._mapComponent = map;
    if (map) map.getZoom();
  }
}

export default connect((store) => {
  return {
    users: store.location.users,
  };
})(MapViewer);
