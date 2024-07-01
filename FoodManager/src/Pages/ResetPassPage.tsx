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

  const ResetPassPage = () => {
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [isFormValid, setIsAddFormValid] = useState(false);
    const [errors, setErrors] = useState<{ [key: string]: string }>({});


    useEffect(() => {
      let newErrors: { [key: string]: string } = {};
  
      const emailRegex = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      const passwordRegex = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/;
  
      if(!password.match(passwordRegex))
      {
        newErrors.password = "Invalid password. It must contain at least one lower case letter, one upper case letter, one special character and a number and be at least 8 characters long!";
      }
  
      if(password !== confirmPassword)
      {
        newErrors.confirmPassword = "Passwords do not match";
      }
  
      setErrors(newErrors);
      setIsAddFormValid(Object.keys(newErrors).length === 0);
    }, [password, confirmPassword]);

    const handleResetPassPress = () => {
        // Handle login logic here
      if(isFormValid)
      {
        //do something
      }

      console.log("Login pressed", { password, confirmPassword });
    };
    
      return (
        <View style={styles.container}>
          <Text style={styles.title}>Login</Text>
          <TextInput
            style={styles.input}
            placeholder="Password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          />
          {errors.password && (
                <Text style={{ color: "red" }}>{errors.password}</Text>
            )}
          <TextInput
            style={styles.input}
            placeholder="Confirm Password"
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            secureTextEntry
          />
          {errors.confirmPassword && (
                <Text style={{ color: "red" }}>{errors.confirmPassword}</Text>
            )}
          <ButtonPage title="Login" onPress={handleResetPassPress} />
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

  export {ResetPassPage};