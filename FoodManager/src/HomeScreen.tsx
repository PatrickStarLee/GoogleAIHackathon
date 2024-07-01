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
} from "react-native";
import React, { useState } from "react";
import { SearchBar, ListItem } from "react-native-elements";
import { Ionicons } from "@expo/vector-icons";
import Icon from "react-native-vector-icons/FontAwesome";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { useNavigation } from "@react-navigation/native";
import { InventoryPage } from "./InventoryPage";
import { ReceiptImageUpload } from "./ReceiptImageUpload";
import { CreateAndEditRecipes } from "./CreateAndEditRecipes";
import { CompareRecipes } from "./CompareRecipes";
import { FindRecipesPage } from "./FindRecipesPage";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "../Firebase/config";
import { UserContext } from "./contexts/UserContext";
// import auth from "@react-native-firebase/auth";
// import { GoogleSignin } from "@react-native-google-signin/google-signin";

const HomeScreen = ({ navigation }) => {
  const [userData, setUserData] = useState(null);

  const handleGoogle = async (e) => {
    console.log("entering google auth");
    const provider = await new GoogleAuthProvider();
    const user_credentials = await signInWithPopup(auth, provider);
    setUserData(user_credentials.user.email);
    console.log(userData)
    console.log("XOXO", user_credentials.user.email);
    console.log("test");
  };

  return (
    <UserContext.Provider value={userData || "0"}>
      <View style={styles.middle}>
        <Text> Home Screen </Text>
        <View style={styles.button}>
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
        </View>
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
    </UserContext.Provider>
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
