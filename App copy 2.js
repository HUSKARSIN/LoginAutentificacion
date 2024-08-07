import React from "react";
import { Image,Text,StyleSheet,View,ScrollView,TouchableOpacity,TextInput,Button, Alert } from "react-native";
import {BlurView} from 'expo-blur';

import { getAuth,createUserWithEmailAndPassword,signInWithEmailAndPassword } from "firebase/auth";
import { initializeApp } from "firebase/app";
import {firebaseConfig} from './firebase-config';

import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useNavigation } from "@react-navigation/native";

const uri = 'https://ak.picdn.net/shutterstock/videos/1060308725/thumb/1.jpg'
const profilePicture = 'https://randomuser.me/api/portraits/men/34.jpg'

function HomeScreen(){
  return(
    <View style={{flex:1,alignItems:'center',justifyContent:'center'}}>
      <Text>Home screen</Text>
    </View>
  );
}

function LoginScreen(){

  const[email,setEmail]=React.useState('')
  const[password,setPassword]=React.useState('')
  const  navigation=useNavigation();

  //funcion para firebase
  const app = initializeApp(firebaseConfig);
  const auth = getAuth(app);

  const handleCreateAccount=()=>{
    createUserWithEmailAndPassword(auth,email,password)
    .then((userCredential)=>{
      console.log('Account create!')
      const user=userCredential.user;
      console.log(user)
    })
    .cath(error=>{
      console.log(error)
      Alert.alert(error.message)
    })
  }
  const handleSignIn=()=>{
    signInWithEmailAndPassword(auth,email,password)
    ,then((userCredential)=>{
      console.log('Signed in!')
      const user=userCredential.user;
      console.log(user)
      navigation.navigate('Home');
    })
    .cath(error=>{
      console.log(error)
    })
  }
  return(
    <View style={styles.container}>
      <Image source={{uri}} style={[styles.image,StyleSheet.absoluteFill]}/>
      <View style={{width:100,height:100,backgroundColor:'purple',position:'absolute'}}></View>
      <View style={{width:100,height:100,backgroundColor:'blue',top:12,position:'absolute',transformOrigin:2}}></View>
      <View style={{width:100,height:100,backgroundColor:'red',bottom:120,position:'absolute',borderRadius:2}}></View>
      <ScrollView contentContainerStyle={{
        flex:1,
        width:'100%',
        height: '100%',
        alignItems:'center',
        justifyContent:'center',
      }}>
        <BlurView intensity={100}>
          <View style={styles.login}>
            <Image source={{uri:profilePicture}}style={styles.profilePicture}/>
            <View>
              <Text style={{fontSize:17,fontWeight:'400',color:'white'}}>E-mail</Text>
              <TextInput onChangeText={(text) => setEmail(text)} style={styles.input} placeholder="IngresarCorreo@example"/>
            </View>
            <View>
              <Text style={{fontSize:17,fontWeight:'400',color:'white'}}>Password</Text>
              <TextInput onChangeText={(text) => setPassword(text)} style={styles.input} placeholder="password" secureTextEntry={true}/>
            </View>
            <View>
              <TouchableOpacity onPress={handleSignIn} style={[styles.botton,{backgroundColor:'#00CFEB90'}]}>
              <Text style={{fontSize:17,fontWeight:'400',color:'white'}}>Login</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={handleCreateAccount} style={[styles.botton,{backgroundColor:'#6792F090'}]}>
              <Text style={{fontSize:17,fontWeight:'400',color:'white'}}>Create Account</Text>
              </TouchableOpacity>
            </View>
          </View>
        </BlurView>
      </ScrollView>
    </View>
  );
}
const Stack=createNativeStackNavigator();
export default function App(){
  return (
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Login">
          <Stack.Screen name="Login" component={LoginScreen}/>
          <Stack.Screen name="Home" component={HomeScreen}/>
        </Stack.Navigator>
      </NavigationContainer>
  );
}
const styles=StyleSheet.create({
  container:{
    flex:1,
    backgroundColor:'#fff',
    alignItems:'center',
  },
  image:{
    width:'100%',
    height:'100%',
    resizeMode:'cover'
  }
})