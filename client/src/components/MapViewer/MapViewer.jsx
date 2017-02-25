import { connect } from 'react-redux';
import React, { Component } from 'react';
import { withGoogleMap, GoogleMap, Marker, OverlayView, InfoWindow } from 'react-google-maps';
import Helmet from 'react-helmet';
import GroundOverlay from '../../../../GroundOverlay';
import localStyles from './MapStyles.css';

class MapViewer extends Component {

  // shouldComponentUpdate() {
  //    return false;
  // }

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
          user.showInfo = false;
          console.log('userMap', user)
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
              { ...user }
              icon={icon}
              onClick={() => {
                user.showInfo = true
                console.log('clicked', user.showInfo)
              }}>
              {user.showInfo && 
                <InfoWindow onCloseClick={ () => user.showInfo = false }>
                  <div>{user.label}</div>
                </InfoWindow>
              }
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

  onClick(user) {
    user.showInfo = true;
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




const PopUpInfoWindowExampleGoogleMap = withGoogleMap(props => (
  <GoogleMap
    defaultZoom={4}
    center={props.center}
  >
    {props.markers.map((marker, index) => (
      <Marker
        key={index}
        position={marker.position}
        onClick={() => props.onMarkerClick(marker)}
      >
        {/*
          Show info window only if the 'showInfo' key of the marker is true.
          That is, when the Marker pin has been clicked and 'onCloseClick' has been
          Successfully fired.
        */}
        {marker.showInfo && (
          <InfoWindow onCloseClick={() => props.onMarkerClose(marker)}>
            <div>{marker.infoContent}</div>
          </InfoWindow>
        )}
      </Marker>
    ))}
  </GoogleMap>
));


