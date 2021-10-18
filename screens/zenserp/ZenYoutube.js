/* eslint-disable handle-callback-err */
/* eslint-disable react/self-closing-comp */
/* eslint-disable react-native/no-inline-styles */
import React, {useMemo, useState} from 'react';
import {
  ActivityIndicator,
  Alert,
  Dimensions,
  FlatList,
  Linking,
  ScrollView,
  Text,
  View,
} from 'react-native';
import {TextInput} from 'react-native-paper';
import {connect} from 'react-redux';
import {zenserp} from '../../store/actions';
import HorizontalList from '../../components/lists/HorizontalList';
import CustomButton from '../../components/button/CustomButton';

function ZenYoutube(props) {
  const [search, setSearch] = useState('');
  const [renderData, setRenderData] = useState([]);
  const [showRaw, setShowRaw] = useState(false);

  const [loading, setLoading] = useState(false);
  const onChangeHandler = text => {
    setSearch(text);
  };
  let temp = [];

  const Translate = obj => {
    let temp = [];
    const values = Object.entries(obj);
    values.forEach((el, i) => {
      temp.push(
        <View
          style={{flexDirection: 'row', flexWrap: 'wrap', marginVertical: 5}}>
          <Text style={{fontWeight: 'bold', fontSize: 16}}>
            {JSON.stringify(el[0])} :
          </Text>
          <Text>{JSON.stringify(el[1])}</Text>
        </View>,
      );
    });
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
          setRenderData(data.payload.data.video_results);
          setShowRaw(false);
        } else if (type === 'raw') {
          setRenderData(data.payload.data.video_results);

          setShowRaw(true);
        } else {
          Linking.openURL(data.payload.data.query.url);
        }
        setLoading(false);
      })
      .catch(err => {
        console.log(err);
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
              url={item.url}
            />
          )}
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
            <CustomButton
              icon="search-web"
              mode="contained"
              click={() => onSubmitHandler('search')}
              title="Search Google"></CustomButton>
            <CustomButton
              icon="search-web"
              mode="contained"
              style={{marginVertical: 20}}
              click={() => onSubmitHandler('render')}
              title=" Render Here"></CustomButton>
            <CustomButton
              icon="search-web"
              mode="contained"
              title="Get Raw Json"
              click={() => onSubmitHandler('raw')}></CustomButton>
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
                  {Translate(el)}
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
    fetchData: q => dispatch(zenserp(q, 'vid', 'youtube.com')),
  };
};
export default connect(null, mapDispatchToProps)(ZenYoutube);
