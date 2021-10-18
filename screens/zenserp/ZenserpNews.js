/* eslint-disable handle-callback-err */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react/self-closing-comp */
import React, {useState} from 'react';
import {
  Alert,
  Dimensions,
  FlatList,
  Linking,
  ScrollView,
  Text,
  View,
} from 'react-native';
import {ActivityIndicator, Button, TextInput} from 'react-native-paper';
import {connect} from 'react-redux';
import Translate from '../../components/helper/Translate';
import HorizontalList from '../../components/lists/HorizontalList';
import {zenserp} from '../../store/actions';

function ZenserpNews(props) {
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(false);
  const [renderData, setRenderData] = useState([]);
  const [showRaw, setShowRaw] = useState(false);
  const onChangeHandler = text => {
    setSearch(text);
  };
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
          setRenderData(data.payload.data.news_results);
          setShowRaw(false);
        } else if (type === 'raw') {
          setRenderData(data.payload.data.news_results);

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
          data={renderData}
          renderItem={({item, index}) => (
            <HorizontalList
              title={item.title}
              image_url={item.thumbnail}
              url={item.link}
            />
          )}
        />
      ) : (
        <ScrollView style={{flex: 1}}>
          <View>
            <TextInput
              placeholder="news search"
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
                    marginTop: 40,
                    padding: 10,
                    borderWidth: 1,
                    borderRadius: 10,
                  }}>
                  {<Translate obj={el} />}
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
    fetchData: q => dispatch(zenserp(q, 'nws', 'google.co.in')),
  };
};

export default connect(null, mapDispatchToProps)(ZenserpNews);
