import {
  View,
  StyleSheet,
  Text,
  Pressable,
} from "react-native";
import React, { useContext, useState } from "react";
//import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
//import { auth } from "../Firebase/config";
//import { UserContext } from "./contexts/UserContext";
// import auth from "@react-native-firebase/auth";
// import { GoogleSignin } from "@react-native-google-signin/google-signin";

const HomeScreen = ({ navigation }) => {
  // const [userData, setUserData] = useState(null);
  // const user_context = useContext(UserContext)
  // const handleGoogle = async (e) => {
  //   const provider = await new GoogleAuthProvider();
  //   const user_credentials = await signInWithPopup(auth, provider);
  //   console.log(user_credentials);
  //   user_context.setActiveUser(user_credentials.user);
  // };

  return (
      <View style={styles.middle}>
        <Text> Home Screen </Text>
        {/* <View style={styles.button}>
          <Pressable
            style={{
              backgroundColor: "red",
              padding: 10,
              alignItems: "center",
            }}
            onPress={handleGoogle}
          >
            <Text style={{ color: "white" }}>Google Sign In</Text>
          </Pressable>
        </View> */}
        <View style={styles.button}>
          <Pressable
            style={{
              backgroundColor: "blue",
              padding: 10,
              alignItems: "center",
            }}
            onPress={() => navigation.navigate("CreateAndEditRecipes")}
          >
            <Text style={{ color: "white" }}>Create and Edit Recipes</Text>
          </Pressable>
        </View>
        <View style={styles.button}>
          <Pressable
            style={{
              backgroundColor: "green",
              padding: 10,
              alignItems: "center",
            }}
            onPress={() => navigation.navigate("CompareRecipes")}
          >
            <Text style={{ color: "white" }}>Compare Recipes</Text>
          </Pressable>
        </View>
        <View style={styles.button}></View>
        <Pressable
          style={{
            backgroundColor: "black",
            padding: 10,
            alignItems: "center",
          }}
          onPress={() => navigation.navigate("FindRecipesPage")}
        >
          <Text style={{ color: "white" }}>Find Recipes</Text>
        </Pressable>
      </View>
  );
};

const styles = StyleSheet.create({
  middle: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 10,
  },
  button: {
    borderRadius: 50,
    margin: 10,
  },
});

export { HomeScreen };
