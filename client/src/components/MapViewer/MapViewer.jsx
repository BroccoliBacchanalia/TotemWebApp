import { connect } from 'react-redux';
import React, { Component } from 'react';
import { withGoogleMap, GoogleMap, Marker, OverlayView, InfoWindow } from 'react-google-maps';
import store from '../../redux/store';
import localStyles from './MapStyles.css';

import Markers from './Markers.jsx'
import GroundOverlay from '../GroundOverlay';

import { updateTotem, closeInfoWindows, placeTotemOnClick } from '../../redux/actions/groupActions'
import { toggleTotemModal } from '../../redux/actions/appActions';

export class MapViewer extends Component {

  shouldComponentUpdate() {
    return false;
  }

  render() {
    const handleClick = this.handleClick.bind(this);
    const { map } = this.props;
    const LoadMap = withGoogleMap(() => (
      <GoogleMap
        defaultZoom={17}
        defaultCenter={map.center}
        mapTypeId= 'terrain'
        onClick={handleClick}
        options={{ streetViewControl: false, mapTypeControl: false, zoomControl: false }}
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

  handleClick(e) {
    closeInfoWindows();
    const lat = e.latLng.lat();
    const lng = e.latLng.lng();

    if (store.getState().group.placeTotem) {
      this.setBasecamp({ lat, lng });
    }
  }

  setBasecamp(coords) {
    coords.radius = 10;
    placeTotemOnClick(false);
    updateTotem(coords, store.getState().user.groupId);
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
