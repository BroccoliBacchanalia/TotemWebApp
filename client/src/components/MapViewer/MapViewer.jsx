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
    const props = this.props;
    console.log(this.props, 'props in map viewer');
    const LoadMap = withGoogleMap(() => (
      <GoogleMap
        ref={props.onMapLoad}
        defaultZoom={ 17 }
        defaultCenter={props.map.center}
        mapTypeId= 'terrain'
        onClick={() => console.log('map clicked')}
        options={{ streetViewControl: false, mapTypeControl: false }}
        >
        <Markers />
        <GroundOverlay
          image={props.map.url}
          opacity={props.map.opacity}
          imageBounds={props.map.bounds}
        />
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
    members: store.group.members,
    map: store.venue.venue.map
  };
})(MapViewer);
