import { connect } from 'react-redux';
import React, { Component } from 'react';
import { withGoogleMap, GoogleMap, Marker, OverlayView, InfoWindow } from 'react-google-maps';
import Helmet from 'react-helmet';
import Markers from './Markers.jsx'
import GroundOverlay from '../GroundOverlay';
import localStyles from './MapStyles.css';

class MapViewer extends Component {

  shouldComponentUpdate() {
     return false;
  }

  render() {
    const LoadMap = withGoogleMap(props => (
      <GoogleMap
        ref={ props.onMapLoad }
        defaultZoom={ 17 }
        defaultCenter={{ lat: 33.682387, lng: -116.2389165 }}
        mapTypeId= 'satellite'
        options={{ streetViewControl: false, mapTypeControl: false }}
        onClick={()=>{ console.log('map clicked') }}
        >

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
    users: store.group.users,
  };
})(MapViewer);
