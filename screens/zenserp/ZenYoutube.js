import React, {useState} from 'react';
import {
  ActivityIndicator,
  Alert,
  Dimensions,
  Linking,
  View,
} from 'react-native';
import {Button, TextInput} from 'react-native-paper';
import {connect} from 'react-redux';
import {zenserp} from '../../store/actions';

function ZenYoutube(props) {
  const [search, setSearch] = useState('');
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
  return (
    <View style={{flex: 1, padding: 20}}>
      {loading ? (
        <ActivityIndicator size="large" style={{flex: 1}} />
      ) : (
        <View style={{flex: 1}}>
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
              onPress={onSearchHandler}>
              SUBMIT
            </Button>
          </View>
        </View>
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
