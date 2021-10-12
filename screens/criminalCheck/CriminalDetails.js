import React from 'react';
import {ScrollView, Text, View} from 'react-native';

const objectToJsx = object => {
  let temp = [];
  for (let i in object) {
    temp.push(
      <View style={{flexDirection: 'row', flexWrap: 'wrap', marginVertical: 5}}>
        <Text style={{fontWeight: 'bold', fontSize: 16}}> {i} : </Text>
        <Text>{object[i]}</Text>
      </View>,
    );
  }
  return temp;
};

function CriminalDetails(props) {
  console.log(90, props);
  return (
    <View style={{flex: 1, padding: 10}}>
      <ScrollView style={{flex: 1}}>
        {objectToJsx(props.route.params.data)}
      </ScrollView>
    </View>
  );
}

export default CriminalDetails;
