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
      <Text>Home screen</Text>
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
        <BlurView intensity={100}>
          <View style={styles.login}>
            <Image source={{ uri: profilePicture }} style={styles.profilePicture} />
            <View>
              <Text style={styles.label}>E-mail</Text>
              <TextInput
                onChangeText={(text) => setEmail(text)}
                style={styles.input}
                placeholder="IngresarCorreo@example"
                keyboardType="email-address"
              />
            </View>
            <View>
              <Text style={styles.label}>Password</Text>
              <TextInput
                onChangeText={(text) => setPassword(text)}
                style={styles.input}
                placeholder="password"
                secureTextEntry={true}
              />
            </View>
            <View>
              <TouchableOpacity onPress={handleSignIn} style={[styles.button, styles.buttonLogin]}>
                <Text style={styles.buttonText}>Login</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={handleCreateAccount} style={[styles.button, styles.buttonCreateAccount]}>
                <Text style={styles.buttonText}>Create Account</Text>
              </TouchableOpacity>
            </View>
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
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
    ...StyleSheet.absoluteFillObject,
  },
  overlayPurple: {
    width: 100,
    height: 100,
    backgroundColor: 'purple',
    position: 'absolute',
  },
  overlayBlue: {
    width: 100,
    height: 100,
    backgroundColor: 'blue',
    top: 12,
    position: 'absolute',
    transform: [{ rotate: '45deg' }],
  },
  overlayRed: {
    width: 100,
    height: 100,
    backgroundColor: 'red',
    bottom: 120,
    position: 'absolute',
    borderRadius: 50,
  },
  scrollContainer: {
    flex: 1,
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  login: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  profilePicture: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  label: {
    fontSize: 17,
    fontWeight: '400',
    color: 'white',
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderBottomWidth: 1,
    marginBottom: 20,
    color: 'white',
  },
  button: {
    padding: 10,
    borderRadius: 5,
    margin: 10,
  },
  buttonLogin: {
    backgroundColor: '#00CFEB90',
  },
  buttonCreateAccount: {
    backgroundColor: '#6792F090',
  },
  buttonText: {
    fontSize: 17,
    fontWeight: '400',
    color: 'white',
  },
  centeredView: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
