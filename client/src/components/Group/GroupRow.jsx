import React from 'react';
import { Image, Text, View } from 'react-native';
import { getGeofence } from '../../actions/locationActions'
import styles from '../../styles';
import localStyles from './GroupStyles';

const GroupRow = ({ friend }) => (
  <View>
    <View style={localStyles.main}>
      <Image style={localStyles.profile_img} source={{ uri: friend.img }}/>
      <View>
        <Text style={localStyles.text}>{friend.name}</Text>
        <Text style={localStyles.subtext}>
          {getGeofence(friend.coordinates)}
        </Text>
      </View>
    </View>
    <View style={styles.thinLine} />
  </View>
);

export default GroupRow;
