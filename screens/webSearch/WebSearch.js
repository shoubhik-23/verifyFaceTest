/* eslint-disable react/self-closing-comp */
/* eslint-disable react-native/no-inline-styles */
import React, {useEffect, useState} from 'react';
import {
  Alert,
  Dimensions,
  FlatList,
  Image,
  Linking,
  Text,
  View,
} from 'react-native';
import {ActivityIndicator, Button, TextInput} from 'react-native-paper';
import {connect} from 'react-redux';
import {contextWeb_News, contextWeb_Web} from '../../store/actions';
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
          height: 80,
          width: 80,
          borderRadius: 10,
          overflow: 'hidden',
          marginRight: 15,
          marginLeft: 1,
        }}>
        <Image
          style={{height: '100%', width: '100%'}}
          source={{uri: item.image.url}}></Image>
      </View>
      <View
        style={{
          flexDirection: 'row',
          flex: 1,
        }}>
        <Text
          style={{fontSize: 15, flex: 1}}
          onPress={() => Linking.openURL(item.url)}>
          {item.title}
        </Text>
      </View>
    </View>
  );
};

function WebSearch(props) {
  const [loading, setLoading] = useState(false);
  const [inputValue, setInputValue] = useState('');

  const [data, setData] = useState([]);
  const onChangeHandler = text => {
    setInputValue(text);
  };

  const newsSearchHandler = () => {
    setLoading(true);
    props
      .callAPI(inputValue)
      .then(data => {
        setLoading(false);
        data && setData([...data.payload.data.value]);
      })
      .catch(err => {
        setLoading(false);
        Alert.alert('Something wrong happened . Please try after sometime');
        console.log(err);
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
          renderItem={RenderItems}
          keyExtractor={item => item.id}
        />
      ) : (
        <View>
          <View>
            <TextInput
              placeholder="search for image"
              mode="outlined"
              onChangeText={onChangeHandler}
              value={inputValue}></TextInput>
          </View>
          <View
            style={{
              marginTop: 30,
              width: Dimensions.get('window').width / 2,
              alignSelf: 'center',
            }}>
            <Button
              icon="search-web"
              mode="contained"
              onPress={newsSearchHandler}>
              Search
            </Button>
          </View>
        </View>
      )}
    </View>
  );
}
const mapDispatchToProps = dispatch => {
  return {
    callAPI: q => dispatch(contextWeb_Web(q)),
  };
};
export default connect(null, mapDispatchToProps)(WebSearch);
