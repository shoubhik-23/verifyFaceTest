/* eslint-disable react/self-closing-comp */
/* eslint-disable react-native/no-inline-styles */
import React, {useEffect, useState} from 'react';
import {
  ActivityIndicator,
  Alert,
  FlatList,
  Linking,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {connect} from 'react-redux';
import {
  courtListenerAudio,
  courtListenerDocket,
  courtListenerOriginatingCourtInfo,
} from '../../store/actions';
const RenderItems = ({item, navigation}) => {
  return (
    <TouchableOpacity
      onPress={() => navigation.navigate('AudioDetails', {data: item})}>
      <View
        style={{
          margin: 10,
          flexDirection: 'row',

          borderRadius: 10,
          backgroundColor: '#fff2e6',
          elevation: 8,
          padding: 10,
          marginVertical: 15,
        }}>
        <View
          style={{
            flex: 1,
          }}>
          <Text
            style={{fontSize: 15, flex: 1, fontWeight: 'bold'}}
            onPress={() => {}}>
            {item.case_name}
          </Text>
          <Text
            style={{fontSize: 15, flex: 1, fontWeight: 'bold'}}
            onPress={() => {}}>
            {item.docket_number}
          </Text>
          <View style={{flexDirection: 'row'}}>
            <Text style={{fontWeight: 'bold'}}>Date Created : </Text>
            <Text>{item.date_created ? item.date_created : 'N/A'}</Text>
          </View>
          <View style={{flexDirection: 'row'}}>
            <Text style={{fontWeight: 'bold'}}>Audio : </Text>
            <Text onPress={() => Linking.openURL(item.download_url)}>
              Play Audio
            </Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

function Audio(props) {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  useEffect(
    () =>
      props
        .getAudio()
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
          renderItem={fprops => <RenderItems {...fprops} {...props} />}
          keyExtractor={item => item.uuid}
        />
      )}
    </View>
  );
}
const mapDispatchToProps = dispatch => {
  return {
    getAudio: () => dispatch(courtListenerAudio()),
  };
};

export default connect(null, mapDispatchToProps)(Audio);
