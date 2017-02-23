import React from 'react';
import { Image, Text, TouchableHighlight, View } from 'react-native';
import localStyles from './GroupStyles';
import { sortUsers } from '../../actions/sortActions'

const SortGroup = ({ dispatch }) => (
  <View style={localStyles.sort_row}>
    <TouchableHighlight
      style={localStyles.sort_item}
      onPress={() => dispatch(sortUsers('sortAZ'))}>
      <Image source={require('../../img/a-z-icon.png')}/>
    </TouchableHighlight>
    <TouchableHighlight
      style={localStyles.sort_item}
      onPress={() => dispatch(sortUsers('geofence'))}>
      <Image source={require('../../img/fence-icon.png')}/>
    </TouchableHighlight>
    <TouchableHighlight
      style={localStyles.sort_item}
      onPress={() => dispatch(sortUsers('proximity'))}>
      <Image source={require('../../img/radar-icon.png')}/>
    </TouchableHighlight>
  </View>
);

export default SortGroup;
