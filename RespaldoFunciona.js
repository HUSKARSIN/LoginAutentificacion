import React from "react";
import { Image, Text, StyleSheet, View, ScrollView, TouchableOpacity, TextInput, Alert } from "react-native";
import { BlurView } from 'expo-blur';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useNavigation } from "@react-navigation/native";
import { auth } from './firebaseConfig'; // Importa auth desde firebaseConfig

const uri = 'https://ak.picdn.net/shutterstock/videos/1060308725/thumb/1.jpg';
const profilePicture = 'https://randomuser.me/api/portraits/men/34.jpg';

function HomeScreen() {
  return (
    <View style={styles.centeredView}>
      <Text style={styles.homeText}>Welcome to the Home Screen!</Text>
    </View>
  );
}

function LoginScreen() {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const navigation = useNavigation();

  const handleCreateAccount = () => {
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        console.log('Account created!');
        const user = userCredential.user;
        console.log(user);
      })
      .catch(error => {
        console.log(error);
        Alert.alert(error.message);
      });
  };

  const handleSignIn = () => {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        console.log('Signed in!');
        const user = userCredential.user;
        console.log(user);
        navigation.navigate('Home');
      })
      .catch(error => {
        console.log(error);
        Alert.alert(error.message);
      });
  };

  return (
    <View style={styles.container}>
      <Image source={{ uri }} style={styles.image} />
      <View style={styles.overlayPurple} />
      <View style={styles.overlayBlue} />
      <View style={styles.overlayRed} />
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <BlurView intensity={100} style={styles.blurView}>
          <View style={styles.login}>
            <Image source={{ uri: profilePicture }} style={styles.profilePicture} />
            <Text style={styles.title}>Login</Text>
            <View style={styles.inputContainer}>
              <Text style={styles.label}>E-mail</Text>
              <TextInput
                onChangeText={(text) => setEmail(text)}
                style={styles.input}
                placeholder="example@example.com"
                placeholderTextColor="#aaa"
                keyboardType="email-address"
              />
            </View>
            <View style={styles.inputContainer}>
              <Text style={styles.label}>Password</Text>
              <TextInput
                onChangeText={(text) => setPassword(text)}
                style={styles.input}
                placeholder="********"
                placeholderTextColor="#aaa"
                secureTextEntry={true}
              />
            </View>
            <TouchableOpacity onPress={handleSignIn} style={[styles.button, styles.buttonLogin]}>
              <Text style={styles.buttonText}>Login</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={handleCreateAccount} style={[styles.button, styles.buttonCreateAccount]}>
              <Text style={styles.buttonText}>Create Account</Text>
            </TouchableOpacity>
          </View>
        </BlurView>
      </ScrollView>
    </View>
  );
}

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Home" component={HomeScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
    ...StyleSheet.absoluteFillObject,
  },
  overlayPurple: {
    width: 120,
    height: 120,
    backgroundColor: 'rgba(128,0,128,0.5)', // Semi-transparent purple
    position: 'absolute',
    top: -10,
    left: -10,
    borderRadius: 60,
  },
  overlayBlue: {
    width: 120,
    height: 120,
    backgroundColor: 'rgba(0,0,255,0.5)', // Semi-transparent blue
    position: 'absolute',
    bottom: -10,
    right: -10,
    borderRadius: 60,
  },
  overlayRed: {
    width: 120,
    height: 120,
    backgroundColor: 'rgba(255,0,0,0.5)', // Semi-transparent red
    position: 'absolute',
    top: 70,
    left: '50%',
    transform: [{ translateX: -60 }],
    borderRadius: 60,
  },
  scrollContainer: {
    flexGrow: 1,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  blurView: {
    borderRadius: 15,
    padding: 20,
    alignItems: 'center',
    width: '80%',
    backgroundColor: 'rgba(255,255,255,0.8)',
  },
  login: {
    width: '100%',
    alignItems: 'center',
  },
  profilePicture: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginVertical: 10,
  },
  inputContainer: {
    width: '100%',
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    color: '#333',
    marginBottom: 5,
  },
  input: {
    height: 40,
    borderColor: '#ddd',
    borderBottomWidth: 1,
    paddingHorizontal: 10,
    fontSize: 16,
  },
  button: {
    width: '100%',
    padding: 15,
    borderRadius: 5,
    marginVertical: 10,
  },
  buttonLogin: {
    backgroundColor: '#00CFEB',
  },
  buttonCreateAccount: {
    backgroundColor: '#6792F0',
  },
  buttonText: {
    fontSize: 18,
    fontWeight: '600',
    color: 'white',
    textAlign: 'center',
  },
  centeredView: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  homeText: {
    fontSize: 24,
    fontWeight: 'bold',
  },
});
