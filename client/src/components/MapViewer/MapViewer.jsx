import { connect } from 'react-redux';
import React, { Component } from 'react';
import { withGoogleMap, GoogleMap, Marker, OverlayView, InfoWindow } from 'react-google-maps';
import Helmet from 'react-helmet';
import Markers from './Markers.jsx'
import GroundOverlay from '../GroundOverlay';
import localStyles from './MapStyles.css';
console.log("MARKERSSSSS: _____: ", Marker )

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
   //  console.log("INSIDE CREATE MARKERS");
   // // console.log("handlemapclick this ", this);
   // console.log("CURRENT POSITION: ", event.latLng.lat(), " ",event.latLng.lng());

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
    //console.log("INSIDE RENDER THHIS: ", this)
    console.log("-------------------------", this.state.markers);
    const LoadMap = withGoogleMap(props => (
      <GoogleMap
        ref={ props.onMapLoad }
<<<<<<< HEAD
        defaultZoom={ 17 }
        defaultCenter={{ lat: 33.682387, lng: -116.2389165 }}
        mapTypeId= 'satellite'
=======
        defaultZoom={ 16 }
        defaultCenter={{ lat: 37.769403, lng: -122.49 }}
        mapTypeId= 'terrain'
        onClick={props.onMapClick.bind(this)}//{()=>{console.log('map clicked')}}
>>>>>>> cbaa3d1ab75302d527da3bf6f0837d4f5f7937cc
        options={{ streetViewControl: false, mapTypeControl: false }}
        >
          {
              //console.log("props.markers.map: ", props.markers)
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
          image='https://coachella-2014-site.s3.amazonaws.com/wp-content/uploads/2016/04/20100620/2016_coachella_maps_venue_v2.jpg'
          opacity={0.4}
          imageBounds={{
            north: 33.685400,
            south: 33.677657, 
            east: -116.235888,
            west: -116.242125
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
