/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {FlatList, View} from 'react-native';
import Items from '../../components/items/items';
const data = [
  {name: 'Top Stories', routeName: 'TopStories', color: '#f5428d'},
  {name: 'All', routeName: 'All', color: '#f5a442'},
];

function TheNewsDashboard(props) {
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

export default TheNewsDashboard;
