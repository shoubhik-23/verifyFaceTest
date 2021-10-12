/* eslint-disable handle-callback-err */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react/self-closing-comp */
import React, {useState} from 'react';
import {
  ActivityIndicator,
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
import {Button, TextInput} from 'react-native-paper';
import {connect} from 'react-redux';
import {zenserp} from '../../store/actions';
const RenderItems = ({item}) => {
  return (
    <TouchableOpacity onPress={() => item.domain && Linking.openURL(item.url)}>
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
            source={{uri: item.thumbnail}}
          />
        </View>
      </View>
    </TouchableOpacity>
  );
};

function ZenImageSearch(props) {
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(false);
  const [renderData, setRenderData] = useState([]);
  const [showRaw, setShowRaw] = useState(false);
  let temp = [];
  const clearJSX = obj => {
    objectToJSX(obj);
    return (temp = []);
  };
  const objectToJSX = obj => {
    for (let i in obj) {
      if (typeof obj[i] === 'object') {
        objectToJSX(obj[i]);
      } else {
        temp.push(
          <View style={{flexDirection: 'row', flexWrap: 'wrap'}}>
            <Text style={{fontWeight: 'bold', fontSize: 16}}>{i} :</Text>
            <Text>{obj[i]}</Text>
          </View>,
        );
      }
    }
    return temp;
  };

  const onChangeHandler = text => {
    setSearch(text);
  };
  const onSubmitHandler = type => {
    setLoading(true);
    props
      .fetchData(search)
      .then(data => {
        if (data.type === 'GET_DATA_FAIL') {
          setLoading(false);
          if (data.error.response.data.error) {
            return Alert.alert(`${data.error.response.data.error}`);
          }
        }
        if (type === 'render') {
          setRenderData(data.payload.data.image_results);
          setShowRaw(false);
        } else if (type === 'raw') {
          setRenderData(data.payload.data.image_results);

          setShowRaw(true);
        } else {
          Linking.openURL(data.payload.data.query.url);
        }
        setLoading(false);
      })
      .catch(err => {
        Alert.alert('Something went wrong');
        setLoading(false);
      });
  };
  return (
    <View style={{flex: 1, padding: 20}}>
      {loading ? (
        <ActivityIndicator size="large" style={{flex: 1}} />
      ) : renderData.length > 0 && !showRaw ? (
        <FlatList
          style={{flex: 1}}
          numColumns={3}
          data={renderData}
          renderItem={RenderItems}
        />
      ) : (
        <ScrollView style={{flex: 1}}>
          <View>
            <TextInput
              placeholder="Search "
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
            <Button
              icon="search-web"
              mode="contained"
              onPress={() => onSubmitHandler('search')}>
              Search Google
            </Button>
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
          {showRaw ? (
            <View style={{marginTop: 20}}>
              {renderData.map((el, i) => (
                <View
                  key={i}
                  style={{
                    borderWidth: 1,
                    marginVertical: 30,
                    flexWrap: 'wrap',
                  }}>
                  {clearJSX(el)}
                </View>
              ))}
            </View>
          ) : null}
        </ScrollView>
      )}
    </View>
  );
}
const mapDispatchToProps = dispatch => {
  return {
    fetchData: q => dispatch(zenserp(q, 'isch', 'google.co.in')),
  };
};
export default connect(null, mapDispatchToProps)(ZenImageSearch);
