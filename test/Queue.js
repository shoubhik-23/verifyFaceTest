import queueFactory from 'react-native-queue';
import React from 'react';
import {Alert, Text, View} from 'react-native';
import {Button} from 'react-native-paper';
const queuefunction = async () => {
  const queue = await queueFactory();
  queue.addWorker('example-job', async (id, payload) => {
    console.log('EXECUTING "example-job" with id: ' + id);
    console.log(payload, 'payload');

    await new Promise(resolve => {
      setTimeout(() => {
        console.log('"example-job" has completed!');
        Alert.alert('completed now');
        resolve();
      }, 5000);
    });
  });
  queue.createJob(
    'example-job',
    {
      emailAddress: 'foo@bar.com',
      randomData: {
        random: 'object',
        of: 'arbitrary data',
      },
    },
    {},
    false,
  );
  queue.createJob(
    'example-job',
    {
      emailAddress: 'example@gmail.com',
      randomData: {
        random: 'object',
        of: 'arbitrary data',
      },
    },
    {
      timeout: 5000, // This job will timeout in 1000 ms and be marked failed (since worker takes 5000 ms to complete).
    },
    false,
  );
  queue.createJob('example-job', {
    emailAddress: 'another@gmail.com',
    randomData: {
      random: 'object',
      of: 'arbitrary data',
    },
  });
  console.log('The above jobs are processing in the background of app now.');
};

function QueueComponent() {
  const buttonClick = () => {
    queuefunction()
      .then(data => console.log(data))
      .catch(err => console.log(err));
  };

  return (
    <View>
      <Button onPress={buttonClick}>Test Queue Example</Button>
    </View>
  );
}

export default QueueComponent;
