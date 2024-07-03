import {
    View,
    StyleSheet,
    TextInput,
    Text,
    Pressable,
    TouchableOpacity,
    Image,
    Button,
    FlatList,
    Alert,
  } from "react-native";
import React, { useState, useEffect, useContext } from "react";
import { SearchBar } from "react-native-elements";
import { Ionicons } from "@expo/vector-icons";
import Icon from "react-native-vector-icons/FontAwesome";
import {ButtonPage} from "../Button";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "../../Firebase/config";
import { UserContext } from "../contexts/UserContext";
import { useNavigation } from '@react-navigation/native'; 
import { HomeScreen } from "../HomeScreen";

  const LoginPage = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isFormValid, setIsAddFormValid] = useState(false);
    const [errors, setErrors] = useState<{ [key: string]: string }>({});
    const navigation = useNavigation();

    const [userData, setUserData] = useState(null);
    const user_context = useContext(UserContext)
    const handleGoogle = async (e) => {
      const provider = await new GoogleAuthProvider();
      const user_credentials = await signInWithPopup(auth, provider); //check if this is null
      console.log(user_credentials);
      if(user_credentials && user_credentials.user)
      {
        user_context.setActiveUser(user_credentials.user);
        navigation.navigate('HomeScreen');
      }   
    };



    //may not be used

    //login page is the very first screen with two options to sign in, google auth and manual login
    //then it goes to home screen

    useEffect(() => {

    }, [email, password]);

    const handleLoginPress = () => {
        // Handle login logic here
      if (email === '' || password === '') {
          Alert.alert('Error', 'Email and password are required');
          return;
      }

      //do firebase stuff

      console.log("Login pressed", { email, password });
    };
    
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Login</Text>
  
        <TextInput
          style={styles.textInput}
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
        />
  
        <TextInput
          style={styles.textInput}
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />
  
        <ButtonPage title="Login" onPress={handleLoginPress} />
  
        <View style={styles.buttonContainer}>
          <Pressable
            style={styles.googleButton}
            onPress={handleGoogle}
          >
            <Text style={styles.googleButtonText}>Google Sign In</Text>
          </Pressable>
        </View>
      </View>
    );
  };

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      padding: 20,
    },
    title: {
      fontSize: 24,
      fontWeight: 'bold',
      marginBottom: 20,
    },
    textInput: {
      width: '100%',
      padding: 10,
      borderColor: 'grey',
      borderBottomWidth: 2,
      marginBottom: 20,
    },
    buttonContainer: {
      width: '100%',
      alignItems: 'center',
    },
    googleButton: {
      backgroundColor: 'red',
      padding: 10,
      alignItems: 'center',
      borderRadius: 5,
    },
    googleButtonText: {
      color: 'white',
      fontWeight: 'bold',
    },
  });

  export {LoginPage};

