import React from 'react';
import { Text, View } from 'react-native';
import MapView from 'react-native-maps';
import { connect } from 'react-redux';
import localStyles from './MapStyles';


class MapViewer extends React.Component {
  render() {
    const users = this.props.users;
    const userID = this.props.userID;
    const userKeys = Object.keys(users);

    return (
      <View>
        <MapView
          provider={MapView.PROVIDER_GOOGLE}
          style={localStyles.map}
          initialRegion={{
            latitude: 37.76757,
            longitude: -122.49427,
            latitudeDelta: 0.0222,
            longitudeDelta: 0.0121,
          }}>
          {this.props.geoFences.map((geoFence, index) => (
            <MapView.Circle
              key={index}
              center = {{
                latitude: geoFence.latitude,
                longitude: geoFence.longitude
              }}
              radius={geoFence.radius}
              fillColor="rgba(0, 0, 0, 0.2)"
              strokeColor="rgba(0, 0, 0, 0.2)"
            />
          ))}
          {this.props.geoFences.map((geoFence, index) => (
            <MapView.Marker
              key={index}
              coordinate={{
                latitude: geoFence.latitude,
                longitude: geoFence.longitude
              }}
              title={geoFence.name}
            />
          ))}
          {userKeys.map((userKey, index) => {
            const user = users[userKey];
            
            return (
              <MapView.Marker
                key={index}
                coordinate={{
                  latitude: user.coordinates.latitude,
                  longitude: user.coordinates.longitude
                }}
                title={user.name}
                description={"Add code to determine stage"}
              />
            );
          })}
        </MapView>
      </View>
    );
  }
}

export default connect((store) => {
  return {
    userID: store.app.userFbId,
    users: store.location.users,
    geoFences: store.location.geoFences,
  };
})(MapViewer);
