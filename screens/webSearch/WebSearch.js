/* eslint-disable react/self-closing-comp */
/* eslint-disable react-native/no-inline-styles */
import React, {useEffect, useState} from 'react';
import {
  Alert,
  Dimensions,
  FlatList,
  Image,
  Linking,
  ScrollView,
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
const Translate = obj => {
  let temp = [];
  const values = Object.entries(obj);
  values.forEach((el, i) => {
    temp.push(
      <View style={{flexDirection: 'row', flexWrap: 'wrap', marginVertical: 5}}>
        <Text style={{fontWeight: 'bold', fontSize: 16}}>
          {JSON.stringify(el[0])} :
        </Text>
        <Text>{JSON.stringify(el[1])}</Text>
      </View>,
    );
  });
  return temp;
};
function WebSearch(props) {
  const [loading, setLoading] = useState(false);
  const [inputValue, setInputValue] = useState('');

  const [data, setData] = useState([]);
  const [showRaw, setShowRaw] = useState(false);

  const onChangeHandler = text => {
    setInputValue(text);
  };

  const onSubmitHandler = type => {
    setLoading(true);
    type === 'raw' ? setShowRaw(true) : setShowRaw(false);

    props
      .callAPI(inputValue)
      .then(data => {
        console.log(data);
        setData(data.payload.data.value);
        setLoading(false);
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
      ) : (data.length > 0) & !showRaw ? (
        <FlatList
          style={{marginBottom: 50}}
          data={data}
          renderItem={RenderItems}
          keyExtractor={item => item.id}
        />
      ) : (
        <ScrollView style={{flex: 1}}>
          <View>
            <TextInput
              placeholder="search news"
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
              style={{marginVertical: 20}}
              onPress={() => onSubmitHandler('render')}>
              Render Here
            </Button>
            <Button
              icon="search-web"
              mode="contained"
              onPress={() => onSubmitHandler('raw')}>
              Get Raw Json
            </Button>
          </View>
          {showRaw
            ? data.map((el, i) => (
                <View
                  key={i}
                  style={{marginTop: 40, padding: 10, borderWidth: 2}}>
                  {Translate(el)}
                </View>
              ))
            : null}
        </ScrollView>
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
