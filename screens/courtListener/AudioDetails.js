/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {ScrollView, Text, View} from 'react-native';
const Translate = obj => {
  let temp = [];
  const values = Object.entries(obj);
  values.forEach((el, i) => {
    temp.push(
      <View style={{flexDirection: 'row', flexWrap: 'wrap', marginVertical: 5}}>
        <Text style={{fontWeight: 'bold', fontSize: 16}}>
          {JSON.stringify(el[0])} :
        </Text>
        <Text>{JSON.stringify(el[1])}</Text>
      </View>,
    );
  });
  return temp;
};
function AudioDetails(props) {
  return (
    <ScrollView style={{flex: 1, padding: 20}}>
      <View
        style={{
          marginTop: 40,
          padding: 10,
          borderWidth: 1,
          borderRadius: 10,
          flex: 1,
        }}>
        {Translate(props.route.params.data)}
      </View>
    </ScrollView>
  );
}

export default AudioDetails;
