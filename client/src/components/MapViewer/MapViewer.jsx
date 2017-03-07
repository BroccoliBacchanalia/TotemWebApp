import { connect } from 'react-redux';
import React, { Component } from 'react';
import { withGoogleMap, GoogleMap, Marker, OverlayView, InfoWindow } from 'react-google-maps';
import Markers from './Markers.jsx'
import GroundOverlay from '../GroundOverlay';
import localStyles from './MapStyles.css';
import { updateTotemCoords } from '../../redux/actions/groupActions';
import store from '../../redux/store';

export class MapViewer extends Component {

  shouldComponentUpdate() {
    return false;
  }

  render() {
    const setBasecamp = this.setBasecamp.bind(this);
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

  setBasecamp(coords) {
    const totemExists = Object.keys(store.getState().group.totemCoords).length > 0;
    coords.radius = 10;
    coords.name = 'Basecamp';

    let message = 'Would you like to drop your group\'s totem at this location?';
    if (totemExists) message = 'Would you like to update your group\'s totem to this location?';

    const ok = confirm(message);

    if (ok) {
      updateTotemCoords(coords, store.getState().user.groupId);
    }
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
