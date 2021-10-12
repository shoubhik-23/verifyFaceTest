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
  ScrollView,
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
function Tineye(props) {
  const [inputValue, setInputValue] = useState('');
  const [checked, setChecked] = React.useState('first');
  const [showRaw, setShowRaw] = useState(false);
  const [rawJson, setRawJson] = useState();

  const [searchResult, setSearchResult] = useState([]);
  const [loading, setLoading] = useState(false);
  const [singleFile, setSingleFile] = useState(null);
  const ImageUploadeHandler = () => {
    DocumentPicker.pick({type: [DocumentPicker.types.images]})
      .then(res => setSingleFile(res[0]))
      .catch(err => console.log(err));
  };
  const onSubmitHandler = type => {
    console.log(type);
    type === 'raw' ? setShowRaw(true) : setShowRaw(false);
    setLoading(true);
    checked === 'first'
      ? props
          .postImageUrl(inputValue, 10)
          .then(data => {
            console.log(data);
            setRawJson(data.payload.data.results.matches);
            setLoading(false);
            data.payload
              ? setSearchResult([...data.payload.data.results.matches])
              : Alert.alert('Error', 'Something went wrong');
          })
          .catch(_err => {
            console.log(_err);
            setLoading(false);
            Alert.alert('Error', 'Something went wrong');
          })
      : props
          .postImageFile(singleFile, 10)
          .then(data => {
            setRawJson(data.payload.data.results.matches);

            setLoading(false);
            data.payload.data.results.matches.length > 0
              ? setSearchResult([...data.payload.data.results.matches])
              : Alert.alert('Error', 'No Records found');
          })
          .catch(_err => {
            console.log(10, _err);
            setLoading(false);
            Alert.alert('Error', 'Soething went wrong');
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
              width: 100,
              height: 100,
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
      ) : searchResult.length > 0 && !showRaw ? (
        <FlatList
          style={{flex: 1}}
          numColumns={3}
          data={searchResult}
          renderItem={RenderItems}></FlatList>
      ) : (
        <ScrollView style={{flex: 1, padding: 20}}>
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
              onPress={() => onSubmitHandler('search')}>
              Search
            </Button>
            <Button
              style={{marginVertical: 10}}
              icon="search-web"
              mode="contained"
              onPress={() => onSubmitHandler('raw')}>
              Get Raw Json Data
            </Button>
          </View>
          {showRaw
            ? searchResult.map((el, i) => (
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
    postImageUrl: (url, limit) => dispatch(tinEyeUrl(url, limit)),
    postImageFile: (file, limit) => dispatch(tinEyeFile(file, limit)),
  };
};

export default connect(null, mapDispatchToProps)(Tineye);
