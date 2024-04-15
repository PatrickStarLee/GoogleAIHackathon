import {
  View,
  StyleSheet,
  TextInput,
  Text,
  Pressable,
} from "react-native";
import React, { useState } from "react";
import { db } from "../Firebase/config";
import { doc, setDoc } from "firebase/firestore";

const AddData = () => {
  const [username, setName] = useState("");
  const [email, setEmail] = useState("");

  //submit data
  const create = () => {
    setDoc(doc(db, "users", "LA"), {
      username: username,
      email: email,
    })
      .then(() => {
        console.log("data submitted");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <View style={{ flex: 1, justifyContent: "center" }}>
      <TextInput
        value={username}
        onChangeText={(username) => {
          setName(username);
        }}
        placeholder="Username"
        style={styles.textBoxes}
      ></TextInput>
      <TextInput
        value={email}
        onChangeText={(email) => {
          setEmail(email);
        }}
        placeholder="email"
        style={styles.textBoxes}
      ></TextInput>

      <Pressable onPress={create}>
        <Text>Submit!</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  textBoxes: {
    width: "90%",
    fontSize: 18,
    padding: 12,
    borderColor: "gray",
    borderWidth: 0.2,
    borderRadius: 10,
  },
});

export { AddData };
