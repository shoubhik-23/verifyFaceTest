/* eslint-disable react/self-closing-comp */
/* eslint-disable react-native/no-inline-styles */
import React, {useEffect, useState} from 'react';
import {
  ActivityIndicator,
  Alert,
  FlatList,
  Linking,
  Text,
  View,
} from 'react-native';
import {connect} from 'react-redux';
import {courtListenerOriginatingCourtInfo} from '../../store/actions';
const RenderItems = ({item}) => {
  return (
    <View
      style={{
        flexDirection: 'row',
        margin: 10,

        borderColor: 'black',
        borderWidth: 1,
        padding: 10,
      }}>
      <View
        style={{
          flex: 1,
        }}>
        <Text
          style={{fontSize: 15, flex: 1, fontWeight: 'bold'}}
          onPress={() => {}}>
          {item.docket_number}
        </Text>
        <View style={{flexDirection: 'row'}}>
          <Text style={{fontWeight: 'bold'}}>Date Filed : </Text>
          <Text>{item.date_filed ? item.date_filed : 'N/A'}</Text>
        </View>
        <View style={{flexDirection: 'row'}}>
          <Text style={{fontWeight: 'bold'}}>Assigned To : </Text>
          <Text>{item.assigned_to_str ? item.assigned_to_str : 'N/A'}</Text>
        </View>
      </View>
    </View>
  );
};

function OriginatingCourt(props) {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  useEffect(
    () =>
      props
        .getOriginatingCourtInfo()
        .then(data => {
          setLoading(false);
          console.log(data);
          setData(data.payload.data.results);
        })
        .catch(err => {
          console.log(err);
          setLoading(false);

          Alert.alert('something went wrong');
        }),
    [],
  );
  return (
    <View style={{flex: 1}}>
      {loading ? (
        <ActivityIndicator size="large" style={{flex: 1}} />
      ) : (
        <FlatList
          style={{marginBottom: 50}}
          data={data}
          renderItem={RenderItems}
          keyExtractor={item => item.uuid}
        />
      )}
    </View>
  );
}
const mapDispatchToProps = dispatch => {
  return {
    getOriginatingCourtInfo: () =>
      dispatch(courtListenerOriginatingCourtInfo()),
  };
};

export default connect(null, mapDispatchToProps)(OriginatingCourt);
