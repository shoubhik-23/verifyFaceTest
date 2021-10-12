/* eslint-disable react/self-closing-comp */
import React, {useState} from 'react';
import {Modal, Text, View} from 'react-native';
import {Button, TextInput} from 'react-native-paper';

function ModalComponent(props) {
  const [value, setValue] = useState('');
  return (
    <Modal
      style={{height: 100, width: 100, borderWidth: 12, borderColor: 'red'}}
      animationType="slide"
      visible={props.show}
      onRequestClose={props.close}>
      <View>
        <Text style={{fontSize: 20, fontWeight: 'bold'}}>
          Seems Like your Token is expired or you have entered invalid token.
          Please enter a new token
        </Text>
      </View>
      <View>
        <TextInput
          mode="outlined"
          value={value}
          onChangeText={text => setValue(text)}></TextInput>
      </View>
      <View>
        <Button
          mode="contained"
          onPress={() => {
            props.submit(value);
            props.close();
          }}>
          Submit
        </Button>
      </View>
    </Modal>
  );
}

export default ModalComponent;
