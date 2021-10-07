/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react/self-closing-comp */
import React, {useState} from 'react';
import {
  Alert,
  Dimensions,
  FlatList,
  Image,
  Linking,
  TouchableOpacity,
  View,
} from 'react-native';
import {ActivityIndicator, Button, TextInput} from 'react-native-paper';
import {connect} from 'react-redux';
import {contextWeb_ImageSearch} from '../../store/actions';

function WebImageSearch(props) {
  const [inputValue, setInputValue] = useState('');
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const onChangeHandler = text => {
    setInputValue(text);
  };
  const imageSearchHandler = () => {
    setLoading(true);
    props
      .fetchData(inputValue)
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
  const RenderItems = ({item}) => {
    return (
      <TouchableOpacity onPress={() => Linking.openURL(item.webpageUrl)}>
        <View
          style={{
            flex: 1,
            flexDirection: 'row',
            justifyContent: 'center',
          }}>
          <View
            style={{
              width: 120,
              height: 120,
              borderRadius: 20,
              margin: 10,
              overflow: 'hidden',
            }}>
            <Image
              style={{width: '100%', height: '100%'}}
              source={{uri: item.thumbnail}}
            />
          </View>
        </View>
      </TouchableOpacity>
    );
  };
  return (
    <View style={{flex: 1, padding: 20}}>
      {loading ? (
        <ActivityIndicator size="large" style={{flex: 1}} />
      ) : data.length > 0 ? (
        <FlatList
          style={{flex: 1}}
          numColumns={3}
          data={data}
          renderItem={RenderItems}></FlatList>
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
              onPress={imageSearchHandler}>
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
    fetchData: input => dispatch(contextWeb_ImageSearch(input)),
  };
};

export default connect(null, mapDispatchToProps)(WebImageSearch);
