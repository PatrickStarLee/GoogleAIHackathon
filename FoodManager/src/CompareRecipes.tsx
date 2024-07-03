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
    Dimensions,
  } from "react-native";
  import React, { useState, useEffect } from "react";
  import { SearchBar, ListItem } from "react-native-elements";
  import { Ionicons } from "@expo/vector-icons";
  import Icon from "react-native-vector-icons/FontAwesome";
  import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
  import Modal from "react-native-modal";
  import { ButtonPage } from "./Button";
  import { ModalPage } from "./Modal";
  import { RadioButton } from "react-native-paper";
  import DatePicker from "react-native-date-picker";
  import { CustomRadioButton } from "./RadioButton";
  import { DatePickerInput } from "react-native-paper-dates";
  import { SafeAreaProvider } from "react-native-safe-area-context";
  import { color } from "react-native-elements/dist/helpers";

  const CompareRecipes= () => {
    return(
        <View>

        </View>
    );
}

export {CompareRecipes};