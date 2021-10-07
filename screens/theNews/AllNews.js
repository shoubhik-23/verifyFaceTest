import React, {useEffect, useState} from 'react';
import {Alert, FlatList, Image, Linking, Text, View} from 'react-native';
import {ActivityIndicator} from 'react-native-paper';
import {connect} from 'react-redux';
import {theNewsApi_All} from '../../store/actions';
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
          source={{uri: item.image_url}}></Image>
      </View>
      <View
        style={{
          flexDirection: 'row',
          flex: 1,
        }}>
        <Text
          style={{fontSize: 15, flex: 1}}
          onPress={() => Linking.openURL(item.url)}>
          {item.title}
        </Text>
      </View>
    </View>
  );
};

function AllNews(props) {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  useEffect(() => {
    props
      .getAllNews()
      .then(data => {
        setData(data.payload.data.data);
        setLoading(false);
      })
      .catch(err => {
        console.log(err);
        setLoading(false);

        Alert.alert('something went wrong');
      });
  }, []);
  return (
    <View style={{flex: 1}}>
      {loading ? (
        <ActivityIndicator size="large" style={{flex: 1}} />
      ) : (
        <FlatList
          style={{marginBottom: 50}}
          data={data}
          renderItem={RenderItems}
          keyExtractor={item => item.uuid}
        />
      )}
    </View>
  );
}

const mapDispatchToProps = dispatch => {
  return {
    getAllNews: () => dispatch(theNewsApi_All()),
  };
};
export default connect(null, mapDispatchToProps)(AllNews);
