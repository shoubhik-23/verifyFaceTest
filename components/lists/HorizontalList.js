/* eslint-disable react/self-closing-comp */
/* eslint-disable react-native/no-inline-styles */
import React from 'react';

import {Image, Linking, Text, View} from 'react-native';

const HorizontalList = props => {
  console.log(props.image_url);
  return (
    <View
      style={{
        flexDirection: 'row',
        margin: 10,

        borderColor: 'black',
        borderWidth: 1,
        padding: 10,
      }}>
      <View
        style={{
          height: 80,
          width: 80,
          borderRadius: 10,
          overflow: 'hidden',
          marginRight: 15,
          marginLeft: 1,
        }}>
        <Image
          style={{height: 100, width: 100}}
          source={{uri: props.image_url}}></Image>
      </View>
      <View
        style={{
          flexDirection: 'row',
          flex: 1,
        }}>
        <Text
          style={{fontSize: 15, flex: 1}}
          onPress={() => Linking.openURL(props.url)}>
          {props.title}
        </Text>
      </View>
    </View>
  );
};

export default HorizontalList;
