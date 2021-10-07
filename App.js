/* eslint-disable react/self-closing-comp */
// To see all the requests in the chrome Dev tools in the network tab.

import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Dashboard from './screens/dashboard/Dashboard';
import WebSearchDashboard from './screens/webSearch/WebSearchDashboard';
import Trending from './screens/webSearch/trending/Trending';
import ImageSearch from './screens/webSearch/trending/ImageSearch';
import ZenVideo from './screens/zenserp/ZenVideo';
import ZenserpDashboard from './screens/zenserp/ZenserpDashboard';
import CriminalCheck from './screens/criminalCheck/CriminalCheck';
import Tineye from './screens/tineye/Tineye';
import webImageSearch from './screens/webSearch/WebImageSearch';
import {jailBase} from './store/actions';
import ZenYoutube from './screens/zenserp/ZenYoutube';
import ZenImageSearch from './screens/zenserp/ZenImageSearch';

import JailBaseDashboard from './screens/jailBase/JailBaseDashboard';
import JailRecent from './screens/jailBase/JailRecent';
import TheNewsDashboard from './screens/theNews/TheNewsDashboard';
import TopStories from './screens/theNews/TopStories';
import AllNews from './screens/theNews/AllNews';
import CourtListenerDash from './screens/courtListener/CourtListenerDash';
import Docket from './screens/courtListener/Docket';
import OriginatingCourt from './screens/courtListener/OriginatingCourt';
import TimeTags from './screens/timeTags/TimeTags';
import {DEV_BACKEND_URL} from '@env';
import ZenserpMap from './screens/zenserp/ZenserpMap';
import ZenserpNews from './screens/zenserp/ZenserpNews';
import Audio from './screens/courtListener/Audio';
import CaseSearch from './screens/courtListener/CaseSearch';
import WebNewsSearch from './screens/webSearch/WebNewsSearch';
import WebSearch from './screens/webSearch/WebSearch';
// import QueueComponent from './test/Queue';
const Stacks = createNativeStackNavigator();

function App() {
  const variable = DEV_BACKEND_URL;
  console.log(variable);
  return (
    <NavigationContainer>
      <Stacks.Navigator>
        <Stacks.Screen name="Dashboard" component={Dashboard}></Stacks.Screen>
        <Stacks.Screen name="WebSearch" component={WebSearch}></Stacks.Screen>
        <Stacks.Screen
          name="WebSearchDash"
          component={WebSearchDashboard}></Stacks.Screen>
        <Stacks.Screen name="Trending" component={Trending}></Stacks.Screen>
        <Stacks.Screen
          name="WebNewsSearch"
          component={WebNewsSearch}></Stacks.Screen>
        <Stacks.Screen
          name="JailBaseDash"
          component={JailBaseDashboard}></Stacks.Screen>
        <Stacks.Screen name="JailRecent" component={JailRecent}></Stacks.Screen>
        <Stacks.Screen name="TopStories" component={TopStories}></Stacks.Screen>
        <Stacks.Screen name="All" component={AllNews}></Stacks.Screen>
        <Stacks.Screen name="TimeTagsApi" component={TimeTags}></Stacks.Screen>

        <Stacks.Screen
          name="CourtListener"
          component={CourtListenerDash}></Stacks.Screen>
        <Stacks.Screen
          name="OriginatingCourt"
          component={OriginatingCourt}></Stacks.Screen>
        <Stacks.Screen name="Dockets" component={Docket}></Stacks.Screen>
        <Stacks.Screen name="Audio" component={Audio}></Stacks.Screen>
        <Stacks.Screen name="CaseSearch" component={CaseSearch}></Stacks.Screen>

        <Stacks.Screen
          name="TheNews"
          component={TheNewsDashboard}></Stacks.Screen>

        <Stacks.Screen
          name="WebImage"
          component={webImageSearch}></Stacks.Screen>

        <Stacks.Screen
          name="ImageSearch"
          component={ImageSearch}></Stacks.Screen>
        <Stacks.Screen
          name="ZenserpDash"
          component={ZenserpDashboard}></Stacks.Screen>
        <Stacks.Screen
          name="ZenserpImageSearch"
          component={ZenImageSearch}></Stacks.Screen>
        <Stacks.Screen name="MapSearch" component={ZenserpMap}></Stacks.Screen>
        <Stacks.Screen
          name="NewsSearch"
          component={ZenserpNews}></Stacks.Screen>

        <Stacks.Screen
          name="YouTubeSearch"
          component={ZenYoutube}></Stacks.Screen>
        {/* <Stacks.Screen name="queue" component={QueueComponent}></Stacks.Screen> */}

        <Stacks.Screen name="ZenserpVideo" component={ZenVideo}></Stacks.Screen>
        <Stacks.Screen
          name="CriminalCheck"
          component={CriminalCheck}></Stacks.Screen>
        <Stacks.Screen name="TineEye" component={Tineye}></Stacks.Screen>
      </Stacks.Navigator>
    </NavigationContainer>
  );
}

export default App;
