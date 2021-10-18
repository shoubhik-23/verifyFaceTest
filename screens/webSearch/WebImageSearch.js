/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react/self-closing-comp */
import React, {useState} from 'react';
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
import {ActivityIndicator, Button, TextInput} from 'react-native-paper';
import {connect} from 'react-redux';
import CustomButton from '../../components/button/CustomButton';
import {contextWeb_ImageSearch} from '../../store/actions';
const Translate = obj => {
  let temp = [];
  const values = Object.entries(obj);
  values.forEach((el, i) => {
    temp.push(
      <View
        style={{
          flexDirection: 'row',
          flexWrap: 'wrap',
          marginVertical: 5,
        }}>
        <Text style={{fontWeight: 'bold', fontSize: 16}}>
          {JSON.stringify(el[0])} :
        </Text>
        <Text>{JSON.stringify(el[1])}</Text>
      </View>,
    );
  });
  return temp;
};
const RenderItems = ({item}) => {
  return (
    <TouchableOpacity onPress={() => Linking.openURL(item.webpageUrl)}>
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
            borderColor: 'white',
            elevation: 8,
          }}>
          <Image
            style={{width: '100%', height: '100%', borderRadius: 20}}
            source={{uri: item.thumbnail}}
          />
        </View>
      </View>
    </TouchableOpacity>
  );
};
function WebImageSearch(props) {
  const [inputValue, setInputValue] = useState('');
  const [loading, setLoading] = useState(false);
  const [showRaw, setShowRaw] = useState(false);

  const [data, setData] = useState([]);
  const onChangeHandler = text => {
    setInputValue(text);
  };

  const onSubmitHandler = type => {
    setLoading(true);
    type === 'raw' ? setShowRaw(true) : setShowRaw(false);

    props
      .fetchData(inputValue)
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
          style={{flex: 1, flexWrap: 'wrap'}}
          numColumns={3}
          data={data}
          renderItem={RenderItems}></FlatList>
      ) : (
        <ScrollView style={{flex: 1}}>
          <View>
            <TextInput
              placeholder="search image"
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
    fetchData: input => dispatch(contextWeb_ImageSearch(input)),
  };
};

export default connect(null, mapDispatchToProps)(WebImageSearch);
