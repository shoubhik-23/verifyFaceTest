/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react/self-closing-comp */
import {Link} from '@react-navigation/native';
import React, {useState} from 'react';
import {
  Alert,
  Dimensions,
  FlatList,
  Image,
  Linking,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {ActivityIndicator, Button, TextInput} from 'react-native-paper';
import {connect} from 'react-redux';
import CustomButton from '../../components/button/CustomButton';
import {jailBase} from '../../store/actions';
const objectToJsx = object => {
  let temp = [];
  for (let i in object) {
    temp.push(
      <View
        key={Math.random()}
        style={{flexDirection: 'row', flexWrap: 'wrap', marginVertical: 5}}>
        <Text style={{fontWeight: 'bold', fontSize: 16}}> {i} : </Text>
        <Text>{object[i]}</Text>
      </View>,
    );
  }
  return temp;
};

function JailRecent(props) {
  const [inputValue, setInputValue] = useState('');
  const [data, setData] = useState([]);
  const [jailInfo, setJailInfo] = useState('');
  const [loading, setLoading] = useState(false);
  const onChangeHandler = text => {
    setInputValue(text);
  };
  const onSubmitHandler = () => {
    setLoading(true);
    props
      .getJailRecent(inputValue)
      .then(data => {
        setLoading(false);
        setJailInfo(data.payload.data.jail);

        let temp = data.payload.data.records.map((el, i) => {
          return {
            ...el,
            show: false,
          };
        });
        setData([...temp]);
      })
      .catch(_err => {
        setLoading(false);
        Alert.alert('Error', 'Something went wrong');
      });
  };
  const RenderItems = ({item, index}) => {
    return (
      <TouchableOpacity
        onPress={() => {
          let temp = [...data];
          temp[index].show = !temp[index].show;
          setData(temp);
        }}>
        <View
          style={{
            margin: 10,

            borderRadius: 10,
            backgroundColor: '#fff2e6',
            elevation: 8,
            padding: 10,
            marginVertical: 15,
          }}>
          <View
            style={{
              flexDirection: 'row',
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
                source={{uri: item.mugshot}}></Image>
            </View>
            <View
              style={{
                flexDirection: 'row',
                flex: 1,
              }}>
              <Text style={{fontSize: 15, flex: 1}}>{item.name}</Text>
            </View>
          </View>

          {item.show ? (
            <View>
              <View style={{flexDirection: 'row'}}>
                <Text style={{fontWeight: 'bold'}}>Book Date : </Text>
                <Text>{item.book_date_formatted}</Text>
              </View>
              <View style={{flexDirection: 'row'}}>
                <Text style={{fontWeight: 'bold'}}>id : </Text>
                <Text>{item.id}</Text>
              </View>
              <Text style={{fontWeight: 'bold'}}>Charges:</Text>
              {item.charges.map((el, id) => (
                <Text key={id}>* {el}</Text>
              ))}
              <View
                style={{
                  marginTop: 30,
                  width: Dimensions.get('window').width / 3,
                  alignSelf: 'center',
                }}>
                <Button
                  icon="more"
                  mode="contained"
                  onPress={() => Linking.openURL(item.more_info_url)}>
                  More Info
                </Button>
              </View>
            </View>
          ) : null}
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={{flex: 1, padding: 20}}>
      {loading ? (
        <ActivityIndicator size="large" style={{flex: 1}} />
      ) : data.length > 0 ? (
        <View>
          <View>
            <Text style={{fontWeight: 'bold'}}>Jail Information: </Text>
          </View>
          <View>{objectToJsx(jailInfo)}</View>

          <FlatList
            style={{marginBottom: 50}}
            data={data}
            renderItem={RenderItems}
            keyExtractor={item => item.id}
          />
        </View>
      ) : (
        <View style={{flex: 1}}>
          <View>
            <TextInput
              mode="outlined"
              placeholder="Enter jail source id"
              value={inputValue}
              onChangeText={onChangeHandler}></TextInput>
          </View>
          <View>
            <Text style={{marginVertical: 10, fontSize: 18}}>
              The id of a specific organization to search (use 'al-myso' for
              test). Full list
              <Text
                onPress={() =>
                  Linking.openURL('https://www.jailbase.com/api/#sources_list')
                }
                style={{color: 'blue', fontSize: 18}}>
                &nbsp; here
              </Text>
            </Text>
          </View>

          <View
            style={{
              marginTop: 30,
              width: Dimensions.get('window').width / 2,
              alignSelf: 'center',
            }}>
            <CustomButton click={onSubmitHandler} title="Search" />
          </View>
        </View>
      )}
    </View>
  );
}
const mapDispatchToProps = dispatch => {
  return {
    getJailRecent: id => dispatch(jailBase(id)),
  };
};

export default connect(null, mapDispatchToProps)(JailRecent);
