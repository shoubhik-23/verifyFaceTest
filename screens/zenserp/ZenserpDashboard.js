/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {FlatList, View} from 'react-native';
import Items from '../../components/items/items';
const data = [
  {name: 'Video Search', routeName: 'ZenserpVideo', color: '#f5a442'},
  {name: 'Youtube Search', routeName: 'YouTubeSearch', color: '#9eecff'},
  {
    name: 'Zenserp Image Search',
    routeName: 'ZenserpImageSearch',
    color: '#368dff',
  },
  {name: 'Map Search', routeName: 'MapSearch', color: '#b9ffb0'},
  {name: 'News Search', routeName: 'NewsSearch', color: '#41d95d'},
];

function ZenserpDashboard(props) {
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

export default ZenserpDashboard;
