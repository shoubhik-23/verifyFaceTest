/* eslint-disable react/self-closing-comp */
/* eslint-disable react-native/no-inline-styles */
import React from 'react';

import {Image, Linking, Text, View} from 'react-native';

const HorizontalList = props => {
  console.log(props.image_url);
  return (
    <View
      style={{
        margin: 10,
        flexDirection: 'row',

        borderRadius: 10,
        backgroundColor: '#fff2e6',
        elevation: 8,
        padding: 10,
        marginVertical: 15,
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
          style={{height: 100, width: 100, backgroundColor: 'gray'}}
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
