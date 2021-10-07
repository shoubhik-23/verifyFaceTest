// import React, {Component} from 'react';
// import {Platform, StyleSheet, Text, View, Button} from 'react-native';

// import queueFactory from 'react-native-queue';

// export default class AdvancedQueue extends Component {
//   constructor(props) {
//     super(props);

//     this.state = {
//       queue: null,
//     };

//     this.init();
//   }

//   async init() {
//     const queue = await queueFactory();

//     //
//     // Standard Job Example
//     // Nothing fancy about this job.
//     //
//     queue.addWorker('standard-example', async (id, payload) => {
//       console.log('standard-example job ' + id + ' executed.');
//     });

//     //
//     // Recursive Job Example
//     // This job creates itself over and over.
//     //
//     let recursionCounter = 1;
//     queue.addWorker('recursive-example', async (id, payload) => {
//       console.log('recursive-example job ' + id + ' started');
//       console.log(recursionCounter, 'recursionCounter');

//       recursionCounter++;

//       await new Promise(resolve => {
//         setTimeout(() => {
//           console.log('recursive-example ' + id + ' has completed!');

//           // Keep creating these jobs until counter reaches 3.
//           if (recursionCounter <= 3) {
//             queue.createJob('recursive-example');
//           }

//           resolve();
//         }, 1000);
//       });
//     });

//     //
//     // Job Chaining Example
//     // When job completes, it creates a new job to handle the next step
//     // of your process. Breaking large jobs up into smaller jobs and then
//     // chaining them together will allow you to handle large tasks in
//     // OS background tasks, that are limited to 30 seconds of
//     // execution every 15 minutes on iOS and Android.
//     //
//     queue.addWorker('start-job-chain', async (id, payload) => {
//       console.log('start-job-chain job ' + id + ' started');
//       console.log('step: ' + payload.step);

//       await new Promise(resolve => {
//         setTimeout(() => {
//           console.log('start-job-chain ' + id + ' has completed!');

//           // Create job for next step in chain
//           queue.createJob('job-chain-2nd-step', {
//             callerJobName: 'start-job-chain',
//             step: payload.step + 1,
//           });

//           resolve();
//         }, 1000);
//       });
//     });

//     queue.addWorker('job-chain-2nd-step', async (id, payload) => {
//       console.log('job-chain-2nd-step job ' + id + ' started');
//       console.log('step: ' + payload.step);

//       await new Promise(resolve => {
//         setTimeout(() => {
//           console.log('job-chain-2nd-step ' + id + ' has completed!');

//           // Create job for last step in chain
//           queue.createJob('job-chain-final-step', {
//             callerJobName: 'job-chain-2nd-step',
//             step: payload.step + 1,
//           });

//           resolve();
//         }, 1000);
//       });
//     });

//     queue.addWorker('job-chain-final-step', async (id, payload) => {
//       console.log('job-chain-final-step job ' + id + ' started');
//       console.log('step: ' + payload.step);

//       await new Promise(resolve => {
//         setTimeout(() => {
//           console.log('job-chain-final-step ' + id + ' has completed!');
//           console.log('Job chain is now completed!');

//           resolve();
//         }, 1000);
//       });
//     });

//     // Start queue to process any jobs that hadn't finished when app was last closed.
//     queue.start();

//     // Attach initialized queue to state.
//     this.setState({
//       queue,
//     });
//   }

//   makeJob(jobName, payload = {}) {
//     this.state.queue.createJob(jobName, payload);
//   }

//   render() {
//     return (
//       <View style={styles.container}>
//         <Text style={styles.welcome}>Welcome to React Native!</Text>
//         {this.state.queue && (
//           <Button
//             title={'Press For Standard Example'}
//             onPress={() => {
//               this.makeJob('standard-example');
//             }}
//           />
//         )}
//         {this.state.queue && (
//           <Button
//             title={'Press For Recursive Example'}
//             onPress={() => {
//               this.makeJob('recursive-example');
//             }}
//           />
//         )}
//         {this.state.queue && (
//           <Button
//             title={'Press For Job Chain Example'}
//             onPress={() => {
//               this.makeJob('start-job-chain', {step: 1});
//             }}
//           />
//         )}
//       </View>
//     );
//   }
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: '#F5FCFF',
//   },
//   welcome: {
//     fontSize: 20,
//     textAlign: 'center',
//     margin: 10,
//   },
// });
