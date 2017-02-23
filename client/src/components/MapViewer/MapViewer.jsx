import { connect } from 'react-redux';
import _ from 'lodash';
import React, { Component } from 'react';
import { withGoogleMap, GoogleMap, Marker } from 'react-google-maps';
import Helmet from "react-helmet";


/*
 * This is the modify version of:
 * https://developers.google.com/maps/documentation/javascript/examples/event-arguments/d
 *
 * Add <script src="https://maps.googleapis.com/maps/api/js"></script> to your HTML to provide google.maps reference
 */
const GettingStartedGoogleMap = withGoogleMap(props => (
  <GoogleMap
    ref={props.onMapLoad}
    defaultZoom={13}
    defaultCenter={{ lat: 37.76757, lng: -122.49427}}
    //onClick={props.onMapClick}
  >
    {props.markers.map(marker => (
      <Marker
        {...marker}
        // onRightClick={() => props.onMarkerRightClick(marker)}
      />
    ))}
  </GoogleMap>
));

class MapViewer extends Component {

  state = {
    markers: [{
      position: {
        lat: 37.76757,
        lng: -122.49427,
      },
      key: 'San Francisco',
      defaultAnimation: 2,
    }],
  };


  handleMapLoad = this.handleMapLoad.bind(this);
  // handleMapClick = this.handleMapClick.bind(this);
  // handleMarkerRightClick = this.handleMarkerRightClick.bind(this);

  handleMapLoad(map) {
    this._mapComponent = map;
    if (map) {
      console.log(map.getZoom());
    }
  }


  render() {
    return (
      <div style={{height: `100%`}}>
        <Helmet
          title="Getting Started"
        />
        <GettingStartedGoogleMap
          containerElement={
            <div style={{ height: 400 }} />
          }
          mapElement={
            <div style={{ height: 400 }} />
          }
          onMapLoad={this.handleMapLoad}
          // onMapClick={this.handleMapClick}
           markers={this.state.markers}
          // onMarkerRightClick={this.handleMarkerRightClick}
        />
      </div>
    );
  }
}

// class MapViewer extends React.Component {
//   render() {
//     const users = this.props.users;
//     const userID = this.props.userID;
//     const userKeys = Object.keys(users);

//     return (
//       <View>
//         <MapView
//           provider={MapView.PROVIDER_GOOGLE}
//           style={localStyles.map}
//           initialRegion={{
//             latitude: 37.76757,
//             longitude: -122.49427,
//             latitudeDelta: 0.0222,
//             longitudeDelta: 0.0121,
//           }}>
//           {this.props.geoFences.map((geoFence, index) => (
//             <MapView.Circle
//               key={index}
//               center = {{
//                 latitude: geoFence.latitude,
//                 longitude: geoFence.longitude
//               }}
//               radius={geoFence.radius}
//               fillColor="rgba(0, 0, 0, 0.2)"
//               strokeColor="rgba(0, 0, 0, 0.2)"
//             />
//           ))}
//           {this.props.geoFences.map((geoFence, index) => (
//             <MapView.Marker
//               key={index}
//               coordinate={{
//                 latitude: geoFence.latitude,
//                 longitude: geoFence.longitude
//               }}
//               title={geoFence.name}
//             />
//           ))}
//           {userKeys.map((userKey, index) => {
//             const user = users[userKey];
            
//             return (
//               <MapView.Marker
//                 key={index}
//                 coordinate={{
//                   latitude: user.coordinates.latitude,
//                   longitude: user.coordinates.longitude
//                 }}
//                 title={user.name}
//                 description={"Add code to determine stage"}
//               />
//             );
//           })}
//         </MapView>
//       </View>
//     );
//   }
// }

export default connect((store) => {
  return {
    // userID: store.app.userFbId,
    // users: store.location.users,
    // geoFences: store.location.geoFences,
  };
})(MapViewer);
