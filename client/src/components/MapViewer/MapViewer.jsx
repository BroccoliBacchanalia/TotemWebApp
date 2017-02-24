import { connect } from 'react-redux';
import _ from 'lodash';
import React, { Component } from 'react';
import { withGoogleMap, GoogleMap, Marker, OverlayView } from 'react-google-maps';
import Helmet from "react-helmet";


/*
 * This is the modify version of:
 * https://developers.google.com/maps/documentation/javascript/examples/event-arguments/d
 *
 * Add <script src="https://maps.googleapis.com/maps/api/js"></script> to your HTML to provide google.maps reference
 */


class MapViewer extends Component {


  state = {
    markers: [{
      position: {
        lat: 37.76757,
        lng: -122.49427,
      },
      key: 'San Francisco',
      defaultAnimation: 2,
      label: 'Pat',
    },
    {
      position: {
        lat: 37.76747,
        lng: -122.48427,
      },
      key: 'Something else',
      defaultAnimation: 2,
      label: 'Derek',
    }],
  };


  handleMapLoad = this.handleMapLoad.bind(this);
  // handleMapClick = this.handleMapClick.bind(this);
  // handleMarkerRightClick = this.handleMarkerRightClick.bind(this);

  handleMapLoad(map) {

    this._mapComponent = map;
    if (map) {
      console.log(map.getZoom());
      console.log(this.props)
    }
  }


  render() {
    const users = this.props.users;
    const userID = this.props.userID;
    const userKeys = Object.keys(users);
    const STYLES = {
      mapContainer: {
        height: `100%`,
      },
      overlayView: {
        background: `white`,
        border: `1px solid #ccc`,
        height: `100%`,
        width: `100%`
      },
    };


    const LoadMap = withGoogleMap(props => (
      <GoogleMap
        ref={props.onMapLoad}
        defaultZoom={16}
        defaultCenter={{ lat: 37.76757, lng: -122.49427}}

      >
        { userKeys.map((userKey, index) => {
          const user = users[userKey];
          console.log(user)
          return (
            <Marker
              {...user}
            />
          )
        }) }

        <OverlayView
         // position={{ lat: 37.76757, lng: -122.49427 }}
          bounds={{
            ne: { lat: 37.768582, lng: -122.489251 },
            sw: { lat: 37.776576, lng: -122.495774 }
          }}  
          // bounds={{
          //   north: 37.800471,
          //   south: 37.681819,
          //   east: -122.305608,
          //   west: -122.587132
          // }}
          mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}
        >

          <div style={STYLES.overlayView}>
            <img src="https://facebook.github.io/react/img/logo_og.png" alt="Smiley face"/>
            
          </div>
        </OverlayView>

      </GoogleMap>
    ));


// ///////////////////


// function getPixelPositionOffset(width, height) {
//   return { x: -(width / 2), y: -(height / 2) };
// }

// const OverlayViewExampleGoogleMap = withGoogleMap(props => (
//   <GoogleMap
//     defaultZoom={8}
//     defaultCenter={{ lat: 37.76757, lng: -122.49427 }}
//   >
//     <OverlayView
//      // position={{ lat: 37.76757, lng: -122.49427 }}
//       bounds={{
//         ne: { lat: 37.800471, lng: -122.305608 },
//         sw: { lat: 37.681819, lng: -122.587132 }
//       }}
//       /*
//        * An alternative to specifying position is specifying bounds.
//        * bounds can either be an instance of google.maps.LatLngBounds
//        * or an object in the following format:

//        */
//       /*
//        * 1. Specify the pane the OverlayView will be rendered to. For
//        *    mouse interactivity, use `OverlayView.OVERLAY_MOUSE_TARGET`.
//        *    Defaults to `OverlayView.OVERLAY_LAYER`.
//        */
//       mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}
//       /*
//        * 2. Tweak the OverlayView's pixel position. In this case, we're
//        *    centering the content.
//        */
//       getPixelPositionOffset={getPixelPositionOffset}
//       /*
//        * 3. Create OverlayView content using standard React components.
//        */
//     >
//       <div style={STYLES.overlayView}>
//         <h1>OverlayView</h1>
//       </div>
//     </OverlayView>
//   </GoogleMap>

//   ///////////////////////





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
          // {userKeys.map((userKey, index) => {
          //   const user = users[userKey];
            
          //   return (
          //     <MapView.Marker
          //       key={index}
          //       coordinate={{
          //         latitude: user.coordinates.latitude,
          //         longitude: user.coordinates.longitude
          //       }}
          //       title={user.name}
          //       description={"Add code to determine stage"}
          //     />
          //   );
          // })}
//         </MapView>
//       </View>
//     );
//   }
// }

export default connect((store) => {
  return {
    userID: store.app.userFbId,
    users: store.location.users,
    geoFences: store.location.geoFences,
  };
})(MapViewer);
