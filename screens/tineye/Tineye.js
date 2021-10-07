/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react/self-closing-comp */
import axios from 'axios';
import React, {useState} from 'react';
import RNPickerSelect from 'react-native-picker-select';

import {
  Alert,
  Dimensions,
  FlatList,
  Image,
  Linking,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import DocumentPicker from 'react-native-document-picker';

import {
  ActivityIndicator,
  Button,
  RadioButton,
  TextInput,
} from 'react-native-paper';
import {connect} from 'react-redux';
import {tinEyeFile, tinEyeUrl} from '../../store/actions';
var TinEye = require('tineye-api');
var apiKey = '6mm60lsCNIB,FwOWjJqA80QZHh9BMwc-ber4u=t^';
var api = new TinEye('https://api.tineye.com/rest/', apiKey);

function Tineye(props) {
  const [inputValue, setInputValue] = useState('');
  const [checked, setChecked] = React.useState('first');

  const [searchResult, setSearchResult] = useState([]);
  const [loading, setLoading] = useState(false);
  const [singleFile, setSingleFile] = useState(null);
  const ImageUploadeHandler = () => {
    DocumentPicker.pick({type: [DocumentPicker.types.images]})
      .then(res => setSingleFile(res[0]))
      .catch(err => console.log(err));
  };
  const onSubmitHandler = () => {
    setLoading(true);
    checked === 'first'
      ? props
          .postImageUrl(inputValue, 2)
          .then(data => {
            setLoading(false);
            data.payload
              ? setSearchResult([...data.payload.data.results.matches])
              : Alert.alert('Error', 'Something went wrong');
          })
          .catch(_err => {
            setLoading(false);
            Alert.alert('Error', 'Something went wrong');
          })
      : props
          .postImageFile(singleFile, 10)
          .then(data => {
            setLoading(false);
            data.payload
              ? setSearchResult([...data.payload.data.results.matches])
              : Alert.alert('Error', 'Something went wrong');
          })
          .catch(_err => {
            setLoading(false);
            Alert.alert('Error', 'Something went wrong');
          });
  };

  const onChangeHandler = text => {
    setInputValue(text);
  };

  const RenderItems = ({item}) => {
    return (
      <TouchableOpacity
        onPress={() =>
          item.domain && Linking.openURL(item.backlinks[0].backlink)
        }>
        <View
          style={{
            flex: 1,
            flexDirection: 'row',
            justifyContent: 'center',
            flexWrap: 'wrap',
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
              source={{uri: item.image_url}}
            />
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={{flex: 1}}>
      {loading ? (
        <ActivityIndicator size="large" style={{flex: 1}} />
      ) : searchResult.length > 0 ? (
        <FlatList
          style={{flex: 1}}
          numColumns={3}
          data={searchResult}
          renderItem={RenderItems}></FlatList>
      ) : (
        <View style={{flex: 1, padding: 20}}>
          <View>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <RadioButton
                value="first"
                status={checked === 'first' ? 'checked' : 'unchecked'}
                onPress={() => setChecked('first')}
              />
              <Text style={{fontSize: 18}}>Image Url</Text>
            </View>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <RadioButton
                value="second"
                status={checked === 'second' ? 'checked' : 'unchecked'}
                onPress={() => setChecked('second')}
              />
              <Text style={{fontSize: 18}}>Image File Upload</Text>
            </View>
          </View>

          {checked === 'first' ? (
            <View>
              <TextInput
                placeholder="paste image url"
                value={inputValue}
                mode="outlined"
                onChangeText={onChangeHandler}></TextInput>
            </View>
          ) : (
            <View
              style={{
                marginTop: 30,
                width: Dimensions.get('window').width / 2,
                alignSelf: 'center',
              }}>
              {singleFile != null ? (
                <View style={{marginVertical: 10}}>
                  <Text>{singleFile.name}</Text>
                </View>
              ) : null}
              <Button
                icon="cloud-upload"
                mode="contained"
                onPress={ImageUploadeHandler}>
                upload
              </Button>
            </View>
          )}
          <View
            style={{
              marginTop: 30,
              width: Dimensions.get('window').width / 2,
              alignSelf: 'center',
            }}>
            <Button
              icon="search-web"
              mode="contained"
              onPress={onSubmitHandler}>
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
    postImageUrl: (url, limit) => dispatch(tinEyeUrl(url, limit)),
    postImageFile: (file, limit) => dispatch(tinEyeFile(file, limit)),
  };
};

export default connect(null, mapDispatchToProps)(Tineye);
