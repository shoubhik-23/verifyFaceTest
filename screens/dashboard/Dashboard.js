/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {FlatList, View} from 'react-native';
import Items from '../../components/items/items';
import Tiles from '../../components/tiles/Tiles';
// import QueueComponent from '../../test/Queue';
import {Button} from 'react-native-paper';

function Dashboard(props) {
  const data = [
    {name: 'Web Search', routeName: 'WebSearchDash', color: '#f5428d'},
    {name: 'Zenserp', routeName: 'ZenserpDash', color: '#f54242'},
    {name: 'Jail Base', routeName: 'JailBaseDash', color: '#f5a442'},
    {
      name: 'Complete Criminal Check',
      routeName: 'CriminalCheck',
      color: '#f5d142',
    },
    {name: 'Tin Eye', routeName: 'TineEye', color: '#368dff'},
    {name: 'The News', routeName: 'TheNews', color: '#41d95d'},
    {name: 'CourtListener', routeName: 'CourtListener', color: '#9eecff'},
    {name: 'Time Tags Api', routeName: 'TimeTagsApi', color: '#b9ffb0'},
    {name: 'Micro Bilt', routeName: 'MicroBilt', color: '#f5a442'},
  ];
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
      {/* <Button onPress={() => props.navigation.navigate('queue')}>QUEUe</Button> */}
    </View>
  );
}

export default Dashboard;
