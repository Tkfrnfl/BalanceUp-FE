/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

 import React from 'react';
 import type {Node} from 'react';
 import {
   SafeAreaView,
   ScrollView,
   StatusBar,
   StyleSheet,
   Text,
   useColorScheme,
   View,
   Platform,
   Alert,
 } from 'react-native';
 
 import {
   Colors,
   DebugInstructions,
   Header,
   LearnMoreLinks,
   ReloadInstructions,
 } from 'react-native/Libraries/NewAppScreen';
 import {Button} from 'react-native';
 import {NaverLogin, getProfile} from '@react-native-seoul/naver-login';
 
 /* $FlowFixMe[missing-local-annot] The type annotation(s) required by Flow's
  * LTI update could not be added via codemod */
 // const {connectToDevTools} = require('react-devtools-core');
 // const wsInstance = connectToDevTools({
 //   host: 'localhost',
 //   port: 8097,
 //   /* This does NOT work */
 //   // websocket: (global as any).WebSocket,
 //   resolveRNStyle: null,
 //   isAppActive: () => true,
 // });
 // console.log('[app.ts] Got wsInstance:', wsInstance);
 // console.log("[app.ts] wsInstance's onopen was:", wsInstance.onopen);
 
 const Section = ({children, title}): Node => {
   const isDarkMode = useColorScheme() === 'dark';
   return (
     <View style={styles.sectionContainer}>
       <Text
         style={[
           styles.sectionTitle,
           {
             color: isDarkMode ? Colors.white : Colors.black,
           },
         ]}>
         {title}
       </Text>
       <Text
         style={[
           styles.sectionDescription,
           {
             color: isDarkMode ? Colors.light : Colors.dark,
           },
         ]}>
         {children}
       </Text>
     </View>
   );
 };
 const androidKeys = {
   kConsumerKey: 'emLJacIpqC1VGarFjLHx',
   kConsumerSecret: 'z_Q_8LbpiI',
   kServiceAppName: 'keyum',
 };
 
 const initials = androidKeys;
 
 const App: () => Node = () => {
   const isDarkMode = useColorScheme() === 'dark';
   const backgroundStyle = {
     backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
   };
   const [naverToken, setNaverToken] = React.useState(null);
 
   const naverLogin = props => {
     return new Promise((resolve, reject) => {
       console.log('test');
       NaverLogin.login(props, (err, token) => {
         console.log(`\n\n  Token is fetched  :: ${token} \n\n`);
         setNaverToken(token);
         if (err) {
           console.log(err);
           reject(err);
           return;
         }
         resolve(token);
       });
     });
   };
   const naverLogout = () => {
     NaverLogin.logout();
     setNaverToken('');
   };
 
   const getUserProfile = async () => {
     const profileResult = await getProfile(naverToken.accessToken);
     if (profileResult.resultcode === '024') {
       Alert.alert('로그인 실패', profileResult.message);
       return;
     }
     console.log('profileResult', profileResult);
   };
   return (
     <SafeAreaView style={backgroundStyle}>
       <StatusBar
         barStyle={isDarkMode ? 'light-content' : 'dark-content'}
         backgroundColor={backgroundStyle.backgroundColor}
       />
       <ScrollView
         contentInsetAdjustmentBehavior="automatic"
         style={backgroundStyle}>
         <Header />
         <View
           style={{
             backgroundColor: isDarkMode ? Colors.black : Colors.white,
           }}>
           <Section title="Step One">
             <Button
               title="네이버 로그인"
               onPress={() => naverLogin(initials)}
             />
             {!!naverToken && (
               <Button title="로그아웃하기" onPress={naverLogout} />
             )}
 
             {!!naverToken && (
               <Button title="회원정보 가져오기" onPress={getUserProfile} />
             )}
           </Section>
           <Section title="See Your Changes">
             <ReloadInstructions />
           </Section>
           <Section title="Debug">
             <DebugInstructions />
           </Section>
           <Section title="Learn More">
             Read the docs to discover what to do next:
           </Section>
           <LearnMoreLinks />
         </View>
       </ScrollView>
     </SafeAreaView>
   );
 };
 
 const styles = StyleSheet.create({
   sectionContainer: {
     marginTop: 32,
     paddingHorizontal: 24,
   },
   sectionTitle: {
     fontSize: 24,
     fontWeight: '600',
   },
   sectionDescription: {
     marginTop: 8,
     fontSize: 18,
     fontWeight: '400',
   },
   highlight: {
     fontWeight: '700',
   },
 });
 
 export default App;