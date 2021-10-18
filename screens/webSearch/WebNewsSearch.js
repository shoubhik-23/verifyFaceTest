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
import CustomButton from '../../components/button/CustomButton';
import HorizontalList from '../../components/lists/HorizontalList';
import {contextWeb_News} from '../../store/actions';

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
function WebNewsSearch(props) {
  const [loading, setLoading] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [showRaw, setShowRaw] = useState(false);

  const [data, setData] = useState([]);
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
      ) : data.length > 0 && !showRaw ? (
        <FlatList
          data={data}
          renderItem={({item, index}) => (
            <HorizontalList
              title={item.title}
              image_url={item.image.url}
              url={item.url}
            />
          )}
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
            <CustomButton
              title="Render Here"
              click={() => onSubmitHandler('render')}
            />
            <CustomButton
              title="Get Raw Json"
              click={() => onSubmitHandler('raw')}
            />
          </View>
          {showRaw
            ? data.map((el, i) => (
                <View
                  key={i}
                  style={{
                    marginTop: 40,
                    padding: 10,
                    borderWidth: 1,
                    borderRadius: 10,
                  }}>
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
    callAPI: q => dispatch(contextWeb_News(q)),
  };
};
export default connect(null, mapDispatchToProps)(WebNewsSearch);
