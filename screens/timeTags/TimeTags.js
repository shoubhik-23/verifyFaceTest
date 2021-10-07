/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react/self-closing-comp */
import React, {useState} from 'react';
import {ActivityIndicator, Alert, Dimensions, Text, View} from 'react-native';
import {Button, TextInput} from 'react-native-paper';
import {connect} from 'react-redux';
import {timeTags} from '../../store/actions';

function TimeTags(props) {
  const [inputValue, setInputValue] = useState('');
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const onChangeHandler = text => {
    setInputValue(text);
  };
  const onSubmitHandler = () => {
    setLoading(true);
    props
      .getTimeTags(inputValue)
      .then(data => {
        console.log(data);
        setLoading(false);
        data.payload.data[1].length > 0
          ? setData([...data.payload.data[1]])
          : Alert.alert('no matching Tags found');
      })
      .catch(err => {
        setLoading(false);
        console.log(err);
        Alert.alert('alert');
      });
  };
  return (
    <View style={{flex: 1, padding: 20}}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'baseline',
          justifyContent: 'space-between',
        }}>
        <TextInput
          mode="outlined"
          style={{flex: 0.9}}
          placeholder="Enter Keyword"
          value={inputValue}
          onChangeText={onChangeHandler}></TextInput>
        <View
          style={{
            marginTop: 30,

            alignSelf: 'center',
          }}>
          <Button icon="search-web" mode="contained" onPress={onSubmitHandler}>
            Search
          </Button>
        </View>
      </View>
      <View>
        {data.length > 0 ? (
          data.map((el, i) => (
            <Text style={{fontSize: 15, margin: 10}}>* {el}</Text>
          ))
        ) : loading ? (
          <ActivityIndicator size="large" style={{flex: 1}} />
        ) : null}
      </View>
    </View>
  );
}
export const mapDispatchToProps = dispatch => {
  return {
    getTimeTags: q => dispatch(timeTags(q)),
  };
};
export default connect(null, mapDispatchToProps)(TimeTags);
