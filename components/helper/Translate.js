/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {Text, View} from 'react-native';

const Translate = ({obj}) => {
  console.log(12, obj);
  const values = Object.entries(obj);
  return values.map((el, i) => {
    return (
      <View
        style={{
          flex: 1,
          flexDirection: 'row',
          flexWrap: 'wrap',
          marginVertical: 5,
        }}>
        <View style={{flexDirection: 'row', flexWrap: 'wrap'}}>
          <Text style={{fontWeight: 'bold', fontSize: 16}}>
            {JSON.stringify(el[0])} :
          </Text>
        </View>
        <View
          style={{
            flexDirection: 'row',
            flexWrap: 'wrap',
          }}>
          {typeof el[1] === 'object' ? (
            <View
              style={{
                marginVertical: 10,
              }}>
              <Translate obj={el[1]} />
            </View>
          ) : (
            <View
              style={{
                flexDirection: 'row',
                flexWrap: 'wrap',
              }}>
              <Text>{JSON.stringify(el[1])}</Text>
            </View>
          )}
        </View>
      </View>
    );
  });
};
export default Translate;
