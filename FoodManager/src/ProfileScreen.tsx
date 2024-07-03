import {
    View,
    StyleSheet,
    TextInput,
    Text,
    Pressable,
    TouchableOpacity,
    Image,
    Button,
    FlatList
  } from "react-native";
  import React, { useContext, useState, useEffect } from "react";
  import { SearchBar, ListItem } from 'react-native-elements';
  import { Ionicons } from '@expo/vector-icons';
  import Icon from 'react-native-vector-icons/FontAwesome';
  import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { UserContext } from "./contexts/UserContext";

const ProfileScreen = () => {

  const user = useContext(UserContext);
  const [fullName, setFullName] = useState('');
  const [user_email, setUserEmail] = useState("");

  useEffect(() => {
    if (user && user.activeUser) {
      console.log("is there an active user here?");
      console.log(user);
      console.log(user.activeUser);
      setFullName(user.activeUser.displayName);
      setUserEmail(user.activeUser.email);
    }
  }, [user]);
  
  /*
  if(user === null && user.activeUser === null)
  {
    console.log("are we in the if statement where user is null or does not exist?");
    console.log(user);
    console.log(user.activeUser);
      return (
        <View style={styles.container}>
          <Text style={styles.text}>No user is logged in</Text>
        </View>
      )
  }*/

    return (
      <View style={styles.container}>
      <View style={styles.header}></View>
      <Image
        style={styles.avatar}
        source={{ uri: 'https://bootdey.com/img/Content/avatar/avatar6.png' }}
      />
      <View style={styles.body}>
        <View style={styles.bodyContent}>
          <Text style={styles.nameStyle}>Full Name: {fullName}</Text>
          <Text style={styles.info}>Email: {user_email}</Text>

        </View>
      </View>
    </View>
    );
  };

  const styles = StyleSheet.create({
    header: {
      backgroundColor: '#00BFFF',
      height: 200,
    },
    avatar: {
      width: 130,
      height: 130,
      borderRadius: 63,
      borderWidth: 4,
      borderColor: 'white',
      marginBottom: 10,
      alignSelf: 'center',
      position: 'absolute',
      marginTop: 130,
    },
    name: {
      fontSize: 22,
      color: '#FFFFFF',
      fontWeight: '600',
    },
    body: {
      marginTop: 40,
    },
    bodyContent: {
      flex: 1,
      alignItems: 'center',
      padding: 30,
    },
    nameStyle: {
      fontSize: 28,
      color: '#696969',
      fontWeight: '600',
    },
    info: {
      fontSize: 16,
      color: '#00BFFF',
      marginTop: 10,
    },
    description: {
      fontSize: 16,
      color: '#696969',
      marginTop: 10,
      textAlign: 'center',
    },
    buttonContainer: {
      marginTop: 10,
      height: 45,
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      marginBottom: 20,
      width: 250,
      borderRadius: 30,
      backgroundColor: '#00BFFF',
    },
    container: {
      flexDirection: "row",
      justifyContent: "space-between",
      //alignItems: 'center',
      //padding: 10,
    },
    text: {
      fontSize: 18,
      marginBottom: 10,
    },
  });

  export {ProfileScreen};