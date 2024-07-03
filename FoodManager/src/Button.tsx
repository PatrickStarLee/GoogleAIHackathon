import React from "react";
import { StyleSheet, Text, TouchableOpacity, View, Pressable } from "react-native";
export type ButtonProps = {
  title: string;
  onPress: () => void;
};
export const ButtonPage = ({ title, onPress }: ButtonProps) => {
  return (
    <Pressable style={styles.button} onPress={onPress}>
      <Text style={styles.text}>{title}</Text>
    </Pressable>
  );
};
const styles = StyleSheet.create({
  button: {
    backgroundColor: "blue",
    marginTop: 15,
    paddingVertical: 15,
    borderRadius: 25,
    width: "80%",
    alignItems: "center",
  },
  text: {
    color: "white",
    fontWeight: "700",
    fontSize: 18,
    margin: 10,
    textAlign: "center"
  },
});