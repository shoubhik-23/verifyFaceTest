/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {FlatList, View} from 'react-native';
import Items from '../../components/items/items';
const data = [
  {name: 'Trending', routeName: 'Trending', color: '#f5428d'},
  {name: 'Image Search', routeName: 'WebImage', color: '#f5a442'},
  {name: 'Web News Search', routeName: 'WebNewsSearch', color: '#f5a442'},
  {name: 'Web Search', routeName: 'WebSearch', color: '#f5428d'},
];

function WebSearchDashboard(props) {
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

export default WebSearchDashboard;
