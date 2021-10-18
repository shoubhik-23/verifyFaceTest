/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {Text, TouchableNativeFeedback, View} from 'react-native';

function Items(props) {
  return (
    <TouchableNativeFeedback onPress={() => props.navigate(props.routeName)}>
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          width: 150,
          borderRadius: 40,
          height: 150,
          backgroundColor: props.color,
          borderColor: 'white',
          elevation: 10,
          marginVertical: 15,
        }}>
        <Text style={{fontSize: 18, fontWeight: 'bold', textAlign: 'center'}}>
          {props.title}
        </Text>
      </View>
    </TouchableNativeFeedback>
  );
}

export default Items;
