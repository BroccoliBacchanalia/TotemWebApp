import { connect } from 'react-redux';
import _ from 'lodash';
import React, { Component } from 'react';
import { withGoogleMap, GoogleMap, Marker } from 'react-google-maps';
import GroundOverlay from '../../../../GroundOverlay';
import Helmet from "react-helmet";

class MapViewer extends Component {

  handleMapLoad = this.handleMapLoad.bind(this);
  // handleMapClick = this.handleMapClick.bind(this);
  // handleMarkerRightClick = this.handleMarkerRightClick.bind(this);

  handleMapLoad(map) {
    this._mapComponent = map;
    if (map) map.getZoom();
  }

  render() {
    const users = this.props.users;
    const userID = this.props.userID;
    const userKeys = Object.keys(users);
    const STYLES = {
      mapContainer: {
        height: `100%`,
      }
    };

    const LoadMap = withGoogleMap(props => (
      <GoogleMap
        ref={props.onMapLoad}
        defaultZoom={16}
        defaultCenter={{ lat: 37.769403, lng: -122.49}}
        mapTypeId= 'terrain'
        >
        { userKeys.map((userKey, index) => {
          const user = users[userKey];
          return (
            <Marker
              key={index}
              {...user}
            />
          )
        }) }

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
      <div style={{height: `100%`}}>
        <Helmet
          title="Totem"
        />
        <LoadMap
          containerElement={ <div style={{ height: `100%` }} /> }
          mapElement={ <div style={{ height: 600 }} /> }
          onMapLoad={this.handleMapLoad}
          markers={userKeys}
          // onMapClick={this.handleMapClick}
          // onMarkerRightClick={this.handleMarkerRightClick}
        />
      </div>
    );
  }
}

export default connect((store) => {
  return {
    userID: store.app.userFbId,
    users: store.location.users,
    geoFences: store.location.geoFences,
  };
})(MapViewer);
