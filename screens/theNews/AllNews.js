/* eslint-disable react/self-closing-comp */
/* eslint-disable react-native/no-inline-styles */
import React, {useEffect, useState} from 'react';
import {
  Alert,
  Dimensions,
  FlatList,
  Image,
  Linking,
  ScrollView,
  Text,
  View,
} from 'react-native';
import {ActivityIndicator} from 'react-native-paper';
import {connect} from 'react-redux';
import CustomButton from '../../components/button/CustomButton';
import {theNewsApi_All} from '../../store/actions';
const RenderItems = ({item}) => {
  return (
    <View
      style={{
        margin: 10,
        flexDirection: 'row',

        borderRadius: 10,
        backgroundColor: '#fff2e6',
        elevation: 8,
        padding: 10,
        marginVertical: 15,
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
          style={{height: '100%', width: '100%', backgroundColor: 'grey'}}
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
const Translate = obj => {
  let temp = [];
  const values = Object.entries(obj);
  values.forEach((el, i) => {
    temp.push(
      <View style={{flexDirection: 'row', flexWrap: 'wrap', marginVertical: 5}}>
        <Text style={{fontWeight: 'bold', fontSize: 16}}>
          {JSON.stringify(el[0])} :
        </Text>
        <Text>{JSON.stringify(el[1])}</Text>
      </View>,
    );
  });
  return temp;
};
function AllNews(props) {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [showRaw, setShowRaw] = useState(false);
  const onSubmitHandler = type => {
    setLoading(true);
    type === 'raw' ? setShowRaw(true) : setShowRaw(false);
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
  };

  return (
    <View style={{flex: 1, padding: 20}}>
      {loading ? (
        <ActivityIndicator size="large" style={{flex: 1}} />
      ) : data.length > 0 && !showRaw ? (
        <FlatList
          style={{marginBottom: 50}}
          data={data}
          renderItem={RenderItems}
          keyExtractor={item => item.uuid}
        />
      ) : (
        <ScrollView style={{flex: 1}}>
          <View
            style={{
              marginTop: 30,
              width: Dimensions.get('window').width / 2,
              alignSelf: 'center',
            }}>
            <CustomButton
              icon="search-web"
              mode="contained"
              style={{marginVertical: 20}}
              click={() => onSubmitHandler('render')}
              title="Render Here"></CustomButton>
            <CustomButton
              icon="search-web"
              mode="contained"
              click={() => onSubmitHandler('raw')}
              title="Get Raw Json"></CustomButton>
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
    getAllNews: () => dispatch(theNewsApi_All()),
  };
};
export default connect(null, mapDispatchToProps)(AllNews);
