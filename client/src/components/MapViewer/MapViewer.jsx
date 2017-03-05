import { connect } from 'react-redux';
import React, { Component } from 'react';
import { withGoogleMap, GoogleMap, Marker, OverlayView, InfoWindow } from 'react-google-maps';
import Markers from './Markers.jsx'
import GroundOverlay from '../GroundOverlay';
import localStyles from './MapStyles.css';

export class MapViewer extends Component {

  shouldComponentUpdate() {
    return false;
  }

  render() {
    const setBasecamp = this.setBasecamp;
    const { map } = this.props;
    const LoadMap = withGoogleMap(() => (
      <GoogleMap
        defaultZoom={17}
        defaultCenter={map.center}
        mapTypeId= 'terrain'
        onClick={(e) => {
          const lat = e.latLng.lat();
          const lng = e.latLng.lng();
          setBasecamp({ lat, lng });
        }}
        options={{ streetViewControl: false, mapTypeControl: false }}
        >
        <Markers />
        <GroundOverlay
          clickable={true}
          image={map.url}
          opacity={map.opacity}
          imageBounds={map.bounds}
        />
      </GoogleMap>
    ));

    return (
      <div className={localStyles.googleMap}>
        <LoadMap
          containerElement={ <div/> }
          mapElement={ <div style={{ height: window.innerHeight - 50 }} /> }
          onMapLoad={this.handleMapLoad.bind(this)}
        />
      </div>
    );
  }


  setBasecamp(coords) {
    console.log(coords);
  }

  handleMapLoad(map) {
    this._mapComponent = map;
    if (map) map.getZoom();
  }
}


export default connect((store) => {
  return {
    members: store.group.members,
    map: store.venue.venue.map
  };
})(MapViewer);
