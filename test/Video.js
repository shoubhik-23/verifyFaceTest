import React from 'react';
import {View} from 'react-native';
import {Button} from 'react-native-paper';

function Video() {
  const onSubmit = () => {
    let form = new FormData();
    form.append('_parts', 'sdf');
    fetch()
      .then(data => data.json())
      .then(res => console.log(res))
      .catch(err => console.log(400, err));
  };
  return (
    <View>
      <Button onPress={onSubmit}>Check</Button>
    </View>
  );
}

export default Video;
