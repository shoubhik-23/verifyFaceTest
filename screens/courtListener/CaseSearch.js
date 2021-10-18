/* eslint-disable react/self-closing-comp */
/* eslint-disable react-native/no-inline-styles */
import React, {useEffect, useState} from 'react';
import {
  ActivityIndicator,
  Alert,
  Dimensions,
  FlatList,
  Linking,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {Button, TextInput} from 'react-native-paper';
import {connect} from 'react-redux';
import CustomButton from '../../components/button/CustomButton';
import {
  courtListenerDocket,
  courtListenerOriginatingCourtInfo,
  courtListenerSearch,
} from '../../store/actions';
const RenderItems = ({item, navigation}) => {
  return (
    <TouchableOpacity
      onPress={() => navigation.navigate('CaseSearchDetails', {data: item})}>
      <View
        style={{
          flexDirection: 'row',
          margin: 10,

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
            {item.caseName}
          </Text>
          <Text
            style={{fontSize: 15, flex: 1, fontWeight: 'bold'}}
            onPress={() => {}}>
            {item.docketNumber}
          </Text>
          <View style={{flexDirection: 'row'}}>
            <Text style={{fontWeight: 'bold'}}>Date Filed : </Text>
            <Text>{item.dateFiled ? item.dateFiled : 'N/A'}</Text>
          </View>
          <View style={{flexDirection: 'row'}}>
            <Text style={{fontWeight: 'bold'}}>Status : </Text>
            <Text>{item.status}</Text>
          </View>
          <View style={{flexDirection: 'row'}}>
            <Text style={{fontWeight: 'bold'}}>Court : </Text>
            <Text>{item.court}</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

function CaseSearch(props) {
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState('');

  const [data, setData] = useState([]);
  const onChangeHandler = text => {
    setSearch(text);
  };
  const onSearchHandler = () => {
    setLoading(true);
    props
      .getSearch(search)
      .then(data => {
        setLoading(false);
        console.log(data);
        setData(data.payload.data.results);
      })
      .catch(err => {
        console.log(err);
        setLoading(false);

        Alert.alert('something went wrong');
      });
  };

  return (
    <View style={{flex: 1, padding: 20}}>
      {loading ? (
        <ActivityIndicator size="large" style={{flex: 1}} />
      ) : data.length > 0 ? (
        <FlatList
          style={{marginBottom: 50}}
          data={data}
          renderItem={fprops => <RenderItems {...fprops} {...props} />}
          keyExtractor={item => item.uuid}
        />
      ) : (
        <View style={{flex: 1}}>
          <View>
            <TextInput
              placeholder=" search"
              mode="outlined"
              value={search}
              onChangeText={onChangeHandler}></TextInput>
          </View>
          <View
            style={{
              marginTop: 30,
              width: Dimensions.get('window').width / 2,
              alignSelf: 'center',
            }}>
            <CustomButton
              icon="search-web"
              mode="contained"
              click={onSearchHandler}
              title="SUBMIT"></CustomButton>
          </View>
        </View>
      )}
    </View>
  );
}
const mapDispatchToProps = dispatch => {
  return {
    getSearch: q => dispatch(courtListenerSearch(q)),
  };
};

export default connect(null, mapDispatchToProps)(CaseSearch);
