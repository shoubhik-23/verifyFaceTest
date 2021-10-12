/* eslint-disable react-native/no-inline-styles */
/* eslint-disable handle-callback-err */
/* eslint-disable react/self-closing-comp */
import React, {memo, useMemo, useState} from 'react';
import {
  ActivityIndicator,
  Alert,
  Dimensions,
  ScrollView,
  Text,
  View,
} from 'react-native';
import {Button, TextInput} from 'react-native-paper';
import {connect} from 'react-redux';
import Translate from '../../components/helper/Translate';
import ModalComponent from '../../components/modal/Modal';
import {enhancedPeopleSearch, setMicrobiltToken} from '../../store/actions';

const PeopleSearchDetail = memo(props => {
  return (
    <View style={{flex: 1}}>
      <ScrollView style={{flex: 1}}>
        <View style={{flexDirection: 'row'}}>
          <Text style={{fontWeight: 'bold', fontSize: 16}}> BirthDt : </Text>
          <Text>{props.data.BirthDt}</Text>
        </View>
        <View style={{flexDirection: 'row'}}>
          <Text style={{fontWeight: 'bold', fontSize: 16}}> DeathDt : </Text>
          <Text>{props.data.DeathDt}</Text>
        </View>
        <View style={{flexDirection: 'row'}}>
          <Text style={{fontWeight: 'bold', fontSize: 16}}> Source : </Text>
          <Text>{props.data.Source}</Text>
        </View>
        <View style={{flexDirection: 'row'}}>
          <Text style={{fontWeight: 'bold', fontSize: 16}}> EffDt : </Text>
          <Text>{props.data.EffDt}</Text>
        </View>
        {<Translate obj={props.data.PersonName} />}
        <View style={{marginVertical: 10}}>
          <Text
            style={{
              fontWeight: 'bold',
              fontSize: 19,
              marginBottom: 10,
              fontStyle: 'italic',
            }}>
            TINInfo:
          </Text>
          {<Translate obj={props.data.TINInfo} />}
        </View>
        <View style={{marginVertical: 10}}>
          <Text
            style={{
              fontWeight: 'bold',
              fontSize: 19,
              marginBottom: 10,
              fontStyle: 'italic',
            }}>
            Contact Info :
          </Text>
          {props.data.ContactInfo.map((el, i) => {
            return (
              <View
                style={{
                  marginVertical: 10,
                  borderWidth: 1,
                }}>
                <Translate obj={el}></Translate>
              </View>
            );
          })}
        </View>
      </ScrollView>
    </View>
  );
});

function PeopleSearch(props) {
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const [data, setData] = useState(undefined);
  const [personalInfo, setPersonalInfo] = useState({
    firstName: 'YVONNE',
    lastName: 'GELINAS',
  });
  const [contactInfo, setContactInfo] = useState({
    StreetNum: '48',
    StreetName: 'ALLENSTOWN RD',
    City: 'ALLENSTOWN',
    StateProv: 'NH',
    PostalCode: '03275',
  });
  const closeModal = () => {
    setShowModal(false);
  };
  const newTokenGenHandler = token => {
    props.setToken(token);
  };
  const onChangeContactInfoInputHandler = (q, text) => {
    switch (q) {
      case 'StreetName':
        return setContactInfo({...contactInfo, StreetName: text});
      case 'StreetNum':
        return setContactInfo({...contactInfo, StreetNum: text});
      case 'City':
        return setContactInfo({...contactInfo, City: text});
      case 'StateProv':
        return setContactInfo({...contactInfo, StateProv: text});
      case 'PostalCode':
        return setContactInfo({...contactInfo, PostalCode: text});
    }
  };
  const onChangePersonalInfoInputHandler = (q, text) => {
    q === 'first'
      ? setPersonalInfo({...personalInfo, firstName: text})
      : setPersonalInfo({...personalInfo, lastName: text});
  };
  const onSeachHandler = () => {
    let data = {
      PersonInfo: {
        PersonName: {
          FirstName: personalInfo.firstName,
          LastName: personalInfo.lastName,
        },
        ContactInfo: [
          {
            PostAddr: {
              StreetNum: contactInfo.StreetNum,
              StreetName: contactInfo.StreetName,
              City: contactInfo.City,
              StateProv: contactInfo.StateProv,
              PostalCode: contactInfo.PostalCode,
            },
          },
        ],
      },
    };
    setLoading(true);
    props
      .enhancedPeopleSearch(data, props.token)
      .then(data => {
        setLoading(false);
        console.log(data);
        if (data.type === 'GET_DATA_FAIL') {
          if (data.error.status === 0) {
            return Alert.alert('Network Error Occured');
          } else if (
            data.error.response.data.fault.faultstring ===
              'Access Token expired' ||
            'Invalid access token'
          ) {
            return setShowModal(true);
          } else {
            return Alert.alert('Internal Unknown error');
          }
        }
        data.payload.data.Subject
          ? setData(data.payload.data.Subject[0])
          : (setData(undefined), Alert.alert('not found'));
      })
      .catch(err => {
        setLoading(false);
        console.log(err);
      });
  };
  return (
    <View style={{flex: 1, padding: 20}}>
      <ScrollView style={{flex: 1}}>
        {loading ? (
          <ActivityIndicator size="large" style={{flex: 1}} />
        ) : !data ? (
          <View style={{flex: 1}}>
            <View style={{marginVertical: 10}}>
              <Text>First Name</Text>
              <TextInput
                mode="outlined"
                onChangeText={t => onChangePersonalInfoInputHandler('first', t)}
                value={personalInfo.firstName}
                placeholder="First Name"></TextInput>
            </View>
            <View style={{marginVertical: 10}}>
              <Text>Last Name</Text>
              <TextInput
                mode="outlined"
                onChangeText={t => onChangePersonalInfoInputHandler('last', t)}
                value={personalInfo.lastName}
                placeholder="Last Name"></TextInput>
            </View>
            <View style={{marginVertical: 10}}>
              <Text>Street Name</Text>
              <TextInput
                mode="outlined"
                onChangeText={t =>
                  onChangeContactInfoInputHandler('StreetName', t)
                }
                value={contactInfo.StreetName}
                placeholder="Street Name"></TextInput>
            </View>
            <View style={{marginVertical: 10}}>
              <Text>Street Number</Text>
              <TextInput
                mode="outlined"
                onChangeText={t =>
                  onChangeContactInfoInputHandler('StreeNum', t)
                }
                value={contactInfo.StreetNum}
                placeholder="Street Number"></TextInput>
            </View>
            <View style={{marginVertical: 10}}>
              <Text>City</Text>
              <TextInput
                mode="outlined"
                onChangeText={t => onChangeContactInfoInputHandler('City', t)}
                value={contactInfo.City}
                placeholder="City"></TextInput>
            </View>
            <View style={{marginVertical: 10}}>
              <Text>State Prov</Text>
              <TextInput
                mode="outlined"
                onChangeText={t =>
                  onChangeContactInfoInputHandler('StateProv', t)
                }
                value={contactInfo.StateProv}
                placeholder="StateProv"></TextInput>
            </View>
            <View style={{marginVertical: 10}}>
              <Text>Postal code</Text>
              <TextInput
                mode="outlined"
                onChangeText={t =>
                  onChangeContactInfoInputHandler('PostalCode', t)
                }
                value={contactInfo.PostalCode}
                placeholder="PostalCode "></TextInput>
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
                onPress={onSeachHandler}>
                Search
              </Button>
            </View>
          </View>
        ) : (
          <PeopleSearchDetail data={data.PersonInfo} />
        )}
      </ScrollView>

      <ModalComponent
        show={showModal}
        close={closeModal}
        submit={newTokenGenHandler}
      />
    </View>
  );
}
const mapStatesToProps = state => {
  return {
    token: state.token,
  };
};
const mapDispatchToProps = dispatch => {
  return {
    enhancedPeopleSearch: (data, token) =>
      dispatch(enhancedPeopleSearch(data, token)),
    setToken: token => dispatch(setMicrobiltToken(token)),
  };
};

export default connect(mapStatesToProps, mapDispatchToProps)(PeopleSearch);
