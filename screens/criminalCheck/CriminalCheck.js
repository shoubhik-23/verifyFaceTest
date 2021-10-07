/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react/self-closing-comp */
import React, {useState} from 'react';
import {
  Alert,
  Dimensions,
  FlatList,
  Image,
  Linking,
  Text,
  View,
} from 'react-native';
import {ActivityIndicator, Button, TextInput} from 'react-native-paper';
import {connect} from 'react-redux';
import {completeCriminalCheck} from '../../store/actions';
import RNPickerSelect from 'react-native-picker-select';

function CriminalCheck(props) {
  const [firstName, setFirstName] = useState('');
  const [selectedValue, setSelectedValue] = useState(0);
  const [lastName, setLastName] = useState('');
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const firstNameChangeHandler = text => {
    setFirstName(text);
  };
  const lastNameChangeHandler = text => {
    setLastName(text);
  };
  const onSearchHandler = () => {
    setLoading(true);
    props
      .fetchData(firstName, lastName, selectedValue)
      .then(data => {
        console.log(data);
        data.payload.data.person.length > 0
          ? setData(data.payload.data.person)
          : Alert.alert('no records found');

        setLoading(false);
      })
      .catch(err => {
        setLoading(false);
        Alert.alert('Something went wrong');
      });
  };
  const Dropdown = () => {
    return (
      <RNPickerSelect
        value={selectedValue}
        onValueChange={value => setSelectedValue(value)}
        items={[
          {label: 'All Database', value: 0},
          {label: '2020 New Arrest', value: 1},
          {label: '2017-2021 Arrest/Warrant Scrap', value: 2},
          {label: 'All Arrest/Warrant', value: 3},
          {label: 'All Criminal Records', value: 7},
        ]}></RNPickerSelect>
    );
  };
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
            source={{uri: item.image}}></Image>
        </View>
        <View
          style={{
            flexDirection: 'row',
            flex: 1,
          }}>
          <Text style={{fontSize: 15, flex: 1}} onPress={() => {}}>
            {item.name}
          </Text>
        </View>
      </View>
    );
  };

  return (
    <View style={{flex: 1, padding: 20}}>
      {loading ? (
        <ActivityIndicator size="large" style={{flex: 1}} />
      ) : data.length > 0 ? (
        <FlatList
          style={{marginBottom: 50}}
          data={data}
          renderItem={RenderItems}
          keyExtractor={item => item.id}
        />
      ) : (
        <View>
          <View>
            <TextInput
              value={firstName}
              mode="outlined"
              onChangeText={firstNameChangeHandler}
              placeholder="First Name"></TextInput>
          </View>
          <View>
            <TextInput
              value={lastName}
              mode="outlined"
              onChangeText={lastNameChangeHandler}
              placeholder="Last Name"></TextInput>
          </View>
          <View>
            <Dropdown />
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
          </View>
        </View>
      )}
    </View>
  );
}
const mapDispatchToProps = dispatch => {
  return {
    fetchData: (firstName, lastName, database) =>
      dispatch(completeCriminalCheck(firstName, lastName, database)),
  };
};
export default connect(null, mapDispatchToProps)(CriminalCheck);
