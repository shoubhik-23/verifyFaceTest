/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {Button} from 'react-native-paper';

function CustomButton(props) {
  return (
    <Button
      icon="search-web"
      mode="contained"
      style={{
        borderRadius: 10,
        marginVertical: 20,
        elevation: 10,
        height: 50,
        justifyContent: 'center',
      }}
      onPress={props.click}>
      {props.title}
    </Button>
  );
}

export default CustomButton;
