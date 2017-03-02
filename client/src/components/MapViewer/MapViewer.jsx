import { connect } from 'react-redux';
import React, { Component } from 'react';
import { withGoogleMap, GoogleMap, Marker, OverlayView, InfoWindow } from 'react-google-maps';
import Helmet from 'react-helmet';
import Markers from './Markers.jsx'
import GroundOverlay from '../GroundOverlay';
import localStyles from './MapStyles.css';


class MapViewer extends Component {

  constructor(props) {
    super(props)
     this.state = {
      markers: [{
        position: {
          lat: 25.0112183,
          lng: 121.52067570000001,
        },
        key: `Taiwan`,
        defaultAnimation: 2,
      }],
    };
    ///console.log("Constuctor this ", this);
    this.handleMapClick.bind(this);
  }
  // componenWillMount() {
  //   console.log("inside compoent will mount: ",this)
  // }

 handleMapClick(event) {
    const nextMarkers = [
      ...this.state.markers,
      {
        position: {
            lat: event.latLng.lat(),
            lng: event.latLng.lng()
        },
        defaultAnimation: 2,
        key: Date.now(), // Add a key property for: http://fb.me/react-warning-keys
      },
    ];
    console.log("PREVIOUS STATE: ",this.state );
    this.setState({
      markers: nextMarkers
    });
    console.log("CURRENT STATE: ",this.state);
    this.render();

  }


  shouldComponentUpdate() {
     return false;
  }

  render() {
    const LoadMap = withGoogleMap(props => (
      <GoogleMap
        ref={ props.onMapLoad }
        defaultZoom={ 16 }
        defaultCenter={{ lat: 37.769403, lng: -122.49 }}
        mapTypeId= 'terrain'
        onClick={props.onMapClick.bind(this)}
        options={{ streetViewControl: false, mapTypeControl: false }}
        >
          {
              props.markers.map(marker => {
              return (
                <Marker
                    {...marker}
                />
              )
            })
          }

        <Markers />
        <GroundOverlay
          image='https://s3-us-west-2.amazonaws.com/elasticbeanstalk-us-west-2-307385678134/outside_lands.png'
          opacity={0.7}
          imageBounds={{
            north: 37.771614,
            south: 37.765553,
            east: -122.481277,
            west: -122.496346
          }
        }/>
   
      </GoogleMap>
    ));

    return (
      <div className={localStyles.googleMap}>
        <Helmet title="Totem"/>
        <LoadMap
          containerElement={ <div/> }
          mapElement={ <div style={{ height: window.innerHeight - 50 }} /> }
          onMapLoad={this.handleMapLoad.bind(this)}
          onMapClick={this.handleMapClick}
          markers={this.state.markers}
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
    users: store.group.users,
  };
})(MapViewer);
