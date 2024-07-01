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
  import {ButtonPage} from "../Button"

  const ForgotPassPage = () => {
    const [email, setEmail] = useState("");
    const [isFormValid, setIsAddFormValid] = useState(false);
    const [errors, setErrors] = useState<{ [key: string]: string }>({});

    //may not be used
    useEffect(() => {
  
      //check for existing user's email in database, if exists, send email. If it doesn't, don't send the email
    }, [ email]);

    const handleForgotPassPress = () => {
        // Handle login logic here
        if (email === '' ) {
          Alert.alert('Error', 'password IS required');
          return;
        }

        //do firebase stuff

      console.log("Login pressed", { email });
    };
    
      return (
        <View style={styles.container}>
          <Text style={styles.title}>Forgot Password</Text>
          <TextInput
            style={styles.input}
            placeholder="Email"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
          />
          <ButtonPage title="Login" onPress={handleForgotPassPress} />
        </View>
      );
  };

  const styles = StyleSheet.create({
    modal: {
      width: "100%",
      height: "90%",
      alignItems: "center",
      justifyContent: "center",
    },
    buttonRectangle: {
      width: 200,
      height: 20,
      justifyContent: "center",
      alignItems: "center",
    },
    text: {
      fontSize: 16,
      fontWeight: "400",
      textAlign: "center",
    },
    container: {
      flexDirection: "row",
      justifyContent: "space-between",
      //alignItems: 'center',
      //padding: 10,
    },
    searchBar: {
      flex: 1,
      borderWidth: 0,
      marginRight: 10,
      paddingLeft: 10,
    },
    button: {
      flexDirection: "row",
      flex: 1,
      justifyContent: "center",
    },
    separator: {
      marginVertical: 30,
      height: 1,
      width: "80%",
    },
    input: {
      paddingTop: 10,
      borderColor: "grey",
      borderBottomWidth: 2,
    },
    pop_up_container: {
      flex: 1,
      alignItems: "center",
      justifyContent: "center",
    },
    title: {
      fontSize: 20,
      fontWeight: "bold",
    },
    closeButton2: {
      position: "absolute",
      left: 0,
      right: 0,
      top: 0,
      bottom: 0,
    },
    radioButton: {
      flexDirection: "row",
      alignItems: "center",
    },
    radioLabel: {
      marginLeft: 8,
      fontSize: 16,
      color: "#333",
    },
    closeButton: {
      alignSelf: "flex-end",
      marginRight: "2%",
      marginTop: "2%",
      backgroundColor: "#ccc",
      borderRadius: 20,
      width: "10%",
      height: "5%",
      alignItems: "center",
      justifyContent: "center",
    },
    customButton: {
      backgroundColor: "blue",
      marginTop: 15,
      paddingVertical: 15,
      borderRadius: 25,
      width: "80%",
      alignItems: "center",
    },
    customText: {
      color: "white",
      fontWeight: "700",
      fontSize: 18,
    },
    addButton: {
      flexDirection: "row",
      backgroundColor: "red",
      width: "100%",
      height: "100%",
      justifyContent: "center",
      alignItems: "center",
    },
  });

export {ForgotPassPage};