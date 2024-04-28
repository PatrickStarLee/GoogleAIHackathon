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
import React, { useState, useEffect } from "react";
import { SearchBar, ListItem } from 'react-native-elements';
import { Ionicons } from '@expo/vector-icons';
import Icon from 'react-native-vector-icons/FontAwesome';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Modal from "react-native-modal";
import { ButtonPage } from "./Button";
import { ModalPage } from "./Modal";
import { RadioButton } from "react-native-paper";
import DatePicker from "react-native-date-picker";
import { CustomRadioButton } from "./RadioButton";
import { DatePickerInput } from 'react-native-paper-dates';
import { SafeAreaProvider } from "react-native-safe-area-context";

const FindRecipesPage = () => {

      const [searchText, setSearchText] = useState("");
      const [isModalVisible, setModalVisible] = useState(false);
      const [expirationDate, setExpirationDate] = useState("");
      const [foodName, setFoodName] = useState("");
      const [quantity, setQuantity] = useState("");
      const [isFilterModalVisible, setIsFilterModalVisible] = useState(false);
      const [checked, setChecked] = useState('first');
      const [errorMessage, setErrorMessage] = useState("");
      const [foodErrorMessage, setFoodErrorMessage] = useState("");
      const [date, setDate] = useState(new Date());
      const [option, setOption] = useState(null);
      const [inputDate, setInputDate] = useState(new Date());
      const [errors, setErrors] = useState<{ [key: string]: string }>({});
      const [isFormValid, setIsFormValid] = useState(false); 
      const [item_id, setItem_id] = useState("");
      const [selectedItem, setSelectedItem] = useState(null);
      const [addFoodName, setAddFoodName] = useState("");
      const [addQuantity, setAddQuantity] = useState("");
      const [addInputDate, setAddInputDate] = useState(new Date());
      const [addErrors, setAddErrors] = useState<{ [key: string]: string }>({});
      const [isAddModalVisible, setAddModalVisible] = useState(false);
      const [isAddFormValid, setIsAddFormValid] = useState(false);
  
      const handlePress = (newChecked) => {
        console.log("handle press is here")
      };
  
      const toggleFilterModal = () => {
        setIsFilterModalVisible(!isFilterModalVisible);
      }
  
      const searchFunction = (searchText?: string) => {
        console.log("search function is here")
      }

      const onPressShoppingFilter = () => {

      }

      const onPressKitchenWareFilter = () => {

      }

      const onPressCookingSkillsFilter = () => {

      }
  
      return (
        
          <View style={{ flex: 1, justifyContent: "center" }}>
              <View style = {styles.container}>
                <SearchBar
                  placeholder="Type Here..."
                  onChangeText={searchFunction}
                  value={searchText}
                   onBlur={undefined} onFocus={undefined} platform={"default"} clearIcon={undefined} searchIcon={undefined} loadingProps={undefined} showLoading={false} onClear={undefined} onCancel={undefined} lightTheme={false} round={false} cancelButtonTitle={""} cancelButtonProps={undefined} showCancel={true}              />
              {/*}  <Ionicons name="filter" size={50} color="black" onPress={toggleFilterModal} containerFilter = {styles.filter} /> */}
                <View style = {styles.button}>
                  <ButtonPage title="Filter by amount of shopping needed" onPress={onPressShoppingFilter} />
                  <ButtonPage title="Filter by cooking skills" onPress={onPressCookingSkillsFilter} />
                  <ButtonPage title="Filter by KitchenWare Required" onPress={onPressKitchenWareFilter} />
                </View>
                <View style={styles.pop_up_container}>
                  <View style={styles.separator} />
            {/*}        <ModalPage isVisible={isFilterModalVisible}>
                      <ModalPage.Container>
                        <TouchableOpacity style={styles.closeButton} onPress={toggleFilterModal}>
                          <Icon name="close" size={20} color="#333" />
                        </TouchableOpacity>
                        <View style = {styles.modal}>
                          <ModalPage.Header title="Sort by the following"/>
                          <ModalPage.Body>
                            <RadioButton.Group onValueChange={handlePress} value={checked}>
                              <View style={styles.radioButton}> 
                                <RadioButton
                                    value="first"
                                    color="#007BFF"
                                /> 
                                <Text style={styles.radioLabel}> 
                                    Sort by cooking skill, from easiest to hardest
                                </Text> 
                              </View> 
                              <View style={styles.radioButton}> 
                                <RadioButton
                                    value="second"
                                    color="#007BFF"
                                /> 
                                <Text style={styles.radioLabel}> 
                                  Sort by cooking skill, from hardest to easiest
                                </Text> 
                              </View> 
                              <View style={styles.radioButton}> 
                                <RadioButton
                                    value="third"
                                    color="#007BFF"
                                /> 
                                <Text style={styles.radioLabel}> 
                                    Sort by required cooking ware quantity, ascending 
                                </Text> 
                              </View> 
                              <View style={styles.radioButton}> 
                                <RadioButton
                                    value="fourth"
                                    color="#007BFF"
                                /> 
                                <Text style={styles.radioLabel}> 
                                    Sort by required cooking ware quantity, descending 
                                </Text> 
                              </View> 
                              <View style={styles.radioButton}> 
                                <RadioButton
                                    value="fifth"
                                    color="#007BFF"
                                /> 
                                <Text style={styles.radioLabel}> 
                                    Sort by expiration date, ascending 
                                </Text> 
                              </View> 
                              <View style={styles.radioButton}> 
                                <RadioButton
                                    value="sixth"
                                    color="#007BFF"
                                /> 
                                <Text style={styles.radioLabel}> 
                                    Sort by expiration date, descending 
                                </Text> 
                              </View> 
      
                            </RadioButton.Group> 
                          </ModalPage.Body>
                        </View>
                      </ModalPage.Container>
                    </ModalPage> */}
                </View>
              </View> 

  
  
          </View>
        );
}

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
      justifyContent: 'center',
      alignItems: 'center',
    },
    text: {
      fontSize: 16,
      fontWeight: "400",
      textAlign: "center",
    },
    container: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      //alignItems: 'center',
      //padding: 10,
    },
    searchBar: {
      flex: 1,
      height: '50%',
      borderColor: 'gray',
      borderWidth: 1,
      marginRight: 10,
      paddingLeft: 10,
    },
    filter: {
      alignItems: 'center'
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
      position: 'absolute',
      left: 0,
      right: 0,
      top: 0,
      bottom: 0
    },
    radioButton: { 
      flexDirection: 'row', 
      alignItems: 'center', 
    }, 
    radioLabel: { 
      marginLeft: 8, 
      fontSize: 16, 
      color: '#333', 
    }, 
    closeButton: {
      alignSelf: "flex-end",
      marginRight: '2%',
      marginTop: '2%',
      backgroundColor: "#ccc",
      borderRadius: 20,
      width: '10%',
      height: '5%',
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
      backgroundColor: 'red',
      width: '100%',
      height: '100%',
      justifyContent: 'center',
      alignItems: 'center'
   }
  });

export {FindRecipesPage};