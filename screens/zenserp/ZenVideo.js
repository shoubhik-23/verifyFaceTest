/* eslint-disable handle-callback-err */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react/self-closing-comp */
import React, {useMemo, useState} from 'react';
import {Alert, Dimensions, Linking, ScrollView, Text, View} from 'react-native';
import {ActivityIndicator, Button, TextInput} from 'react-native-paper';
import {connect} from 'react-redux';
import Translate from '../../components/helper/Translate';
import {zenserp} from '../../store/actions';
const objectToJsx = obj => {
  let temp = [];
  for (let i in obj) {
    temp.push(
      <View style={{flexDirection: 'row', flexWrap: 'wrap'}}>
        <Text style={{fontWeight: 'bold', fontSize: 16}}>{i} :</Text>
        <Text>{obj[i]}</Text>
      </View>,
    );
  }
  return temp;
};

function ZenVideo(props) {
  const [search, setSearch] = useState('');
  const [data, setData] = useState([]);
  const [showRaw, setShowRaw] = useState(false);
  const [loading, setLoading] = useState(false);

  const onChangeHandler = text => {
    setSearch(text);
  };
  const onSearchHandler = () => {
    setLoading(true);
    props
      .fetchData(search)
      .then(data => {
        Linking.openURL(data.payload.data.query.url);
        setLoading(false);
      })
      .catch(err => {
        Alert.alert('Something went wrong');
        setLoading(false);
      });
  };
  const showRawDataHandler = () => {
    setLoading(true);
    props
      .fetchData(search)
      .then(data => {
        setData(data.payload.data.video_results);
        setShowRaw(true);
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
      ) : (
        <ScrollView style={{flex: 1}}>
          <View>
            <TextInput
              placeholder="video search"
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
              onPress={onSearchHandler}>
              Search
            </Button>

            <Button
              style={{marginVertical: 10}}
              icon="search-web"
              mode="contained"
              onPress={showRawDataHandler}>
              Get Raw Json Data
            </Button>
          </View>
          {showRaw ? (
            <View style={{marginTop: 20}}>
              {data.map((el, i) => (
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
    fetchData: q => dispatch(zenserp(q, 'vid', 'google.co.in')),
  };
};

export default connect(null, mapDispatchToProps)(ZenVideo);
