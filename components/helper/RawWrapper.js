/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {View} from 'react-native';

function RawWrapper(props) {
  return (
    <View
      style={{
        flex: 1,
        marginTop: 40,
        padding: 10,
        borderWidth: 1,
        borderRadius: 10,
      }}>
      {props.children}
    </View>
  );
}

export default RawWrapper;
