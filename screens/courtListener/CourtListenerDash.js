/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {FlatList, View} from 'react-native';
import Items from '../../components/items/items';
const data = [
  {
    name: 'Originating Court Info',
    routeName: 'OriginatingCourt',
    color: '#f5428d',
  },
  {
    name: 'Dockets',
    routeName: 'Dockets',
    color: '#368dff',
  },
  {
    name: 'Audio',
    routeName: 'Audio',
    color: '#f5d142',
  },
  {
    name: 'Case Search',
    routeName: 'CaseSearch',
    color: '#b9ffb0',
  },
];

function CourtListenerDash(props) {
  return (
    <View style={{flex: 1, padding: 10}}>
      <FlatList
        style={{flex: 1}}
        numColumns={2}
        data={data}
        renderItem={({item, index}) => (
          <View
            style={{
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
              marginBottom: 10,
            }}>
            <Items
              title={item.name}
              navigate={props.navigation.navigate}
              routeName={item.routeName}
              color={item.color}
            />
          </View>
        )}
      />
    </View>
  );
}

export default CourtListenerDash;
